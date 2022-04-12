'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;

var _app = _interopRequireDefault(require("./app"));

var _config = require("./config");

console.clear();

var server = _app["default"].listen(_config.PORT, function () {
  console.log('App is running at http://localhost:%d in %s mode', _config.PORT, _app["default"].get('env'));
  console.log('  Press CTRL+C to stop\n');
});

exports.server = server;