const { API_TOKEN } = require('../config');
const logger = require('./logger');

module.exports = {
  validateBody(req, res, next, requiredInput) {
    requiredInput.forEach((val) => {
      if (!req.body[val]) {
        logger.error(`400 error on path: ${req.path} - ${val} is required`);
        return res.status(400).send(`Invalid data`);
      }
    });
    next();
  },

  validateBearerToken(req, res, next) {
    const authToken = req.get('authorization');
    if (!authToken || authToken.split(' ')[0] !== 'Bearer' || authToken.split(' ')[1] !== API_TOKEN) {
      logger.error(`401 error on path: ${req.path} - Unauthorized request`);
      return res.status(401).json({ error: `Unauthorized request`});
    }
    next();
  },

  // This function will likely need to be refined - test further
  validateParams(requiredParams, req, res) {
    requiredParams.forEach((val) => {
      if (!req.params[val]) {
        logger.error(`404 error on path: ${req.path} - ${req.params[val]} not found`);
        return res.status(404).send('Item not found');
      }
    });
  }
}
