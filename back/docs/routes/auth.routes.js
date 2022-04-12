'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _middlewares = require("./../middlewares");

var _controllers = require("./../controllers");

var _helpers = require("../helpers");

var router = (0, _express.Router)();
router.route('/signup').post([(0, _expressValidator.check)('name', 'Name is Required!').exists(), (0, _expressValidator.check)('email', 'Invalid email').isEmail(), (0, _expressValidator.check)('password', 'Password must be longer than 6 characters.').isLength({
  min: 6
}), _middlewares.validateFields, (0, _expressValidator.check)('email').custom(function (email) {
  return (0, _helpers.isAlreadyRegistered)(email, 'user');
}), _middlewares.validateFields], _controllers.signUp);
router.route('/login').post([(0, _expressValidator.check)('email', 'Invalid email').isEmail(), (0, _expressValidator.check)('password', 'Password must be longer than 6 characters.').isLength({
  min: 6
}), _middlewares.validateFields, _middlewares.checkLoginCredentials, _middlewares.validateFields], _controllers.login);
router.route('/renew').get([_middlewares.validateJwt], _controllers.renewJwt);
var _default = router;
exports["default"] = _default;