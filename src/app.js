require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); // logging middleware
const cors = require('cors'); // allows cross-origin resource sharing
const helmet = require('helmet'); // hides sensitive data
const errorHandler = require('./misc/errorHandler');
const { NODE_ENV } = require('./config');

const validationHandler = require('./misc/validationHandler'); // basic validation middleware
const validateBearerToken = require('./misc/validateBearerToken');

//===================//
// Initial setup     //
//===================//

const app = express();
const morganOutput = NODE_ENV === 'production' ? 'tiny' : 'common';

//===================//
// Middleware        //
//===================//

app.use(morgan(morganOutput));
app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(validateBearerToken);

//===================//
// Routes            //
//===================//

app.get('/', (req, res) => {
  res.send('Hello there');
});

app.post('/user', (req, res) => {
  const requiredInput = ['username', 'password', 'favoriteClub'];
  validationHandler(req, res, requiredInput);
  res.send('all validation passed');
})

//===================//
// Error Handling    //
//===================//

// Catch-all 404 handler
app.use((req, res, next) => {
  const err = new Error('Path not found');
  err.status = 404;
  next(err);
});
app.use(errorHandler);

module.exports = app;
