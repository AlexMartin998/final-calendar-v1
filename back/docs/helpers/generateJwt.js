'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createJwt = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("./../config");

var createJwt = function createJwt(uid) {
  return _jsonwebtoken["default"].sign({
    uid: uid
  }, _config.SECRETORKEY, {
    expiresIn: '24h'
  });
};

exports.createJwt = createJwt;