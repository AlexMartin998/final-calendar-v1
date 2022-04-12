'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateJwt = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _express = require("express");

var _config = require("./../config");

var _models = require("./../models");

var validateJwt = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var res,
        next,
        token,
        _jwt$verify,
        uid,
        user,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = _args.length > 1 && _args[1] !== undefined ? _args[1] : _express.response;
            next = _args.length > 2 ? _args[2] : undefined;
            _context.prev = 2;
            token = req.header('x-token');

            if (token) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              msg: 'You have not sent a valid token'
            }));

          case 6:
            _jwt$verify = _jsonwebtoken["default"].verify(token, _config.SECRETORKEY), uid = _jwt$verify.uid;
            _context.next = 9;
            return _models.User.findById(uid);

          case 9:
            user = _context.sent;

            if (user) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              msg: "User doesn't exist! - in DB"
            }));

          case 12:
            user.password = null;
            req.authenticatedUser = user;
            return _context.abrupt("return", next());

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);
            res.status(401).json({
              ok: false,
              msg: 'Invalid token!'
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 17]]);
  }));

  return function validateJwt(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.validateJwt = validateJwt;