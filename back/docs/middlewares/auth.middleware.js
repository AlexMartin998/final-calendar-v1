'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkLoginCredentials = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

var checkLoginCredentials = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, email, password, user, matchPassword;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _models.User.findOne({
              email: email
            });

          case 3:
            user = _context.sent;
            _context.next = 6;
            return user === null || user === void 0 ? void 0 : user.comparePassword(password);

          case 6:
            matchPassword = _context.sent;

            if (!(!user || !matchPassword)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              msg: 'There was a problem logging in. Check your email and password or create an account.'
            }));

          case 9:
            return _context.abrupt("return", next());

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkLoginCredentials(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkLoginCredentials = checkLoginCredentials;