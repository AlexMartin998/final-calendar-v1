'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "authRoutes", {
  enumerable: true,
  get: function get() {
    return _auth["default"];
  }
});
Object.defineProperty(exports, "calendarEventsRoutes", {
  enumerable: true,
  get: function get() {
    return _events["default"];
  }
});

var _auth = _interopRequireDefault(require("./auth.routes"));

var _events = _interopRequireDefault(require("./events.routes"));