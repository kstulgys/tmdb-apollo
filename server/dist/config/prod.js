'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();

const config = exports.config = {
  port: process.env.PORT,
  jwt: process.env.JWT_SECRET,
  jwtExp: '100d',
  dbUrl: process.env.MONGO_DB
};