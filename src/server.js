const app = require('./app');
const { PORT, DATABASE_URL } = require('./config');

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
