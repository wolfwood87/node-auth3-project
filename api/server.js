const express = require('express')
const jwt = require('jsonwebtoken');
const configureMiddleware = require('./configure-middleware.js')

const server = express();

configureMiddleWare(server)

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;