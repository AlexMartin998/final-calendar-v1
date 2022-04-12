'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFields = void 0;

var _expressValidator = require("express-validator");

var validateFields = function validateFields(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) return res.status(400).json({
    ok: false,
    errors: errors.errors
  });
  next();
};

exports.validateFields = validateFields;