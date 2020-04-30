const logger = require('./logger');

// basic input validation to ensure all required inputs are received
// Inputs: req and res objects from Express and an array of all required Inputs
// Output: 400 status and message of first failing case, otherwise none

function validationHandler(requiredInput, req, res, next) {
  requiredInput.forEach((val) => {
    if (!req.body[val]) {
      logger.error(`400 error, path: ${req.path} - ${val} is required`);
      return res.status(400).send(`Invalid data`);
    }
  });
}

module.exports = validationHandler;

// consider creating getIDValidator
// pulls params instead of body, if one or more is not present, send 404 item not found
