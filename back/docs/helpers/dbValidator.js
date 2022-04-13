'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAlreadyRegistered = exports.doesItExist = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

var isAlreadyRegistered = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(query, collection) {
    var model, checkInCollection;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            checkInCollection = function checkInCollection() {
              if (model) throw new Error("The ".concat(collection).concat(query.includes('@') ? "'s email" : ' name', " is already registered!"));
            };

            _context.t0 = collection;
            _context.next = _context.t0 === 'user' ? 4 : 8;
            break;

          case 4:
            _context.next = 6;
            return _models.User.findOne({
              email: query
            });

          case 6:
            model = _context.sent;
            return _context.abrupt("return", checkInCollection());

          case 8:
            return _context.abrupt("break", 9);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isAlreadyRegistered(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.isAlreadyRegistered = isAlreadyRegistered;

var doesItExist = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, collection) {
    var model, checkInCollection;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            checkInCollection = function checkInCollection() {
              if (!model) throw new Error("".concat(collection, " ID: '").concat(id, "' doesn't exist! - in Db"));
            }; // Search by ID


            _context2.t0 = collection;
            _context2.next = _context2.t0 === 'user' ? 4 : _context2.t0 === 'event' ? 8 : 12;
            break;

          case 4:
            _context2.next = 6;
            return _models.User.findById(id);

          case 6:
            model = _context2.sent;
            return _context2.abrupt("return", checkInCollection());

          case 8:
            _context2.next = 10;
            return _models.CalendarEvent.findById(id);

          case 10:
            model = _context2.sent;
            return _context2.abrupt("return", checkInCollection());

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function doesItExist(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.doesItExist = doesItExist;