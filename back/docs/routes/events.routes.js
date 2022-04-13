"use strict";
'use stricti';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _middlewares = require("../middlewares");

var _controllers = require("../controllers");

var _helpers = require("../helpers");

var router = (0, _express.Router)(); // Middleware para todas las rutas:

router.use(_middlewares.validateJwt);
router.route('/').get(_controllers.getCalendarEvents).post([(0, _expressValidator.check)('title', 'Title is required!').not().isEmpty(), (0, _expressValidator.check)('start', 'Initial date is required!').custom(_helpers.isDate), (0, _expressValidator.check)('end', 'Finish date is required!').custom(_helpers.isDate), _middlewares.validateFields], _controllers.createCalendarEvent);
router.route('/:id').put([(0, _expressValidator.check)('id', 'Invalid MongoDB ID!').isMongoId(), (0, _expressValidator.check)('id').custom(function (id) {
  return (0, _helpers.doesItExist)(id, 'event');
}), _middlewares.validateFields], _controllers.updateCalendarEvent)["delete"]([(0, _expressValidator.check)('id', 'Invalid MongoDB ID!').isMongoId(), (0, _expressValidator.check)('id').custom(function (id) {
  return (0, _helpers.doesItExist)(id, 'event');
}), _middlewares.validateFields], _controllers.deleteCalendarEvent);
var _default = router;
exports["default"] = _default;