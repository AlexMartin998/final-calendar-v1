"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDate = void 0;

var _moment = _interopRequireDefault(require("moment"));

var isDate = function isDate(value) {
  // false indica a express-validator q hay un error
  if (!value) return false;
  var date = (0, _moment["default"])(value);
  if (!date.isValid()) return false;
  return true;
};

exports.isDate = isDate;