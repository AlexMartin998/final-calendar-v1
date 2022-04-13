'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.renewJwt = exports.login = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _models = require("./../models");

var _helpers = require("./../helpers");

var signUp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var res,
        _req$body,
        name,
        email,
        password,
        user,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = _args.length > 1 && _args[1] !== undefined ? _args[1] : _express.response;
            _context.prev = 1;
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
            user = new _models.User({
              name: name,
              email: email,
              password: password
            });
            _context.next = 6;
            return user.encryptPassword(password);

          case 6:
            user.password = _context.sent;
            _context.next = 9;
            return user.save();

          case 9:
            res.status(201).json({
              ok: true,
              msg: 'Successfully registered user!',
              user: user
            });
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).json({
              ok: false,
              msg: 'Talk to admin'
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 12]]);
  }));

  return function signUp(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
    var res,
        email,
        user,
        token,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : _express.response;
            email = req.body.email;
            _context2.next = 4;
            return _models.User.findOne({
              email: email
            });

          case 4:
            user = _context2.sent;
            // Gen JWT
            token = (0, _helpers.createJwt)(user.id);
            res.status(200).json({
              ok: true,
              msg: 'Successful login!',
              token: token,
              user: {
                uid: user.id,
                name: user.name
              }
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function login(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;

var renewJwt = function renewJwt(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
  var authenticatedUser = req.authenticatedUser;
  if (!authenticatedUser) res.status(401).json({
    ok: false,
    msg: 'Unathorized!'
  }); // Gen JWT

  var token = (0, _helpers.createJwt)(authenticatedUser.id);
  res.status(200).json({
    ok: true,
    token: token,
    user: {
      uid: authenticatedUser.id,
      name: authenticatedUser.name
    }
  });
};

exports.renewJwt = renewJwt;