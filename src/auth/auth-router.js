const express = require('express');
const AuthService = require('./auth-service');
const { protectedWithJWT } = require('../middleware/auth');
const xss = require('xss');

const authRouter = express.Router();
const jsonParser = express.json();

authRouter
  .route('/')
  .post(jsonParser, async (req, res, next) => {
    let { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: `username and password are required`});
    }
    username = xss(username);
    password = xss(password);

    const user = await AuthService.getUser(req.app.get('db'), username);
    if (!user) {
      return res.status(400).json({ error: `invalid username or password`});
    }

    const isValidPassword = await AuthService.validatePassword(
      req.app.get('db'),
      username,
      password
    );
    if (!isValidPassword) {
      return res.status(400).json({ error: `invalid username or password`});
    }
    return res.status(200).json({
      authToken: `${AuthService.createJWT(username, {
        id: user.id,
        username,
      })}`
    })
    .put(protectedWithJWT, (req, res) => {
      const sub = req.user.username;
      const payload = {
        id: req.user.id,
        username: req.user.username,
      }
      return res.send({ authToken: AuthService.createJWT(sub, payload) });
    })
  })

module.exports = authRouter;
