'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SECRETORKEY = exports.PORT = exports.MONGODB_URI = void 0;

var _dotenv = require("dotenv");

if (process.env.NODE_ENV !== 'producction') (0, _dotenv.config)();
var PORT = process.env.PORT;
exports.PORT = PORT;
var MONGODB_URI = process.env.MONGODB_URI;
exports.MONGODB_URI = MONGODB_URI;
var SECRETORKEY = process.env.SECRETORKEY;
exports.SECRETORKEY = SECRETORKEY;