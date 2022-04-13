'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupMiddlewares = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var setupMiddlewares = function setupMiddlewares(app) {
  app.use((0, _cors["default"])());
  app.use(_express["default"].json());
  app.use(_express["default"].urlencoded({
    extended: false
  }));
  app.use(_express["default"]["static"](_path["default"].join(__dirname, './../public')));
  app.use((0, _compression["default"])()).use((0, _helmet["default"])());
  app.use((0, _morgan["default"])('dev')); // Other middlewares
};

exports.setupMiddlewares = setupMiddlewares;