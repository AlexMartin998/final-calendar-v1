'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

require("./db/db");

var _setup = require("./middlewares/setup.middleware");

var _routes = require("./routes");

// Initializations:
var app = (0, _express["default"])(); // Middlewares

(0, _setup.setupMiddlewares)(app); // Routes

app.use('/api/auth', _routes.authRoutes);
app.use('/api/events', _routes.calendarEventsRoutes);
var _default = app;
exports["default"] = _default;