const app = require('./app');
const {PORT } = require('./config');

app.list(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
