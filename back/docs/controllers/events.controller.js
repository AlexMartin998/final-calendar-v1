'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCalendarEvent = exports.getCalendarEvents = exports.deleteCalendarEvent = exports.createCalendarEvent = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _models = require("../models");

var getCalendarEvents = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var res,
        _yield$Promise$all,
        _yield$Promise$all2,
        calendarEvents,
        total,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = _args.length > 1 && _args[1] !== undefined ? _args[1] : _express.response;
            _context.next = 3;
            return Promise.all([_models.CalendarEvent.find().populate('user', 'name'), _models.CalendarEvent.countDocuments()]);

          case 3:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
            calendarEvents = _yield$Promise$all2[0];
            total = _yield$Promise$all2[1];
            res.status(200).json({
              ok: true,
              total: total,
              events: calendarEvents
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getCalendarEvents(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getCalendarEvents = getCalendarEvents;

var createCalendarEvent = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
    var res,
        _req$body,
        title,
        note,
        start,
        end,
        calendarEvent,
        _args2 = arguments;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : _express.response;
            _context2.prev = 1;
            _req$body = req.body, title = _req$body.title, note = _req$body.note, start = _req$body.start, end = _req$body.end;
            calendarEvent = new _models.CalendarEvent({
              title: title,
              note: note,
              start: start,
              end: end,
              user: req.authenticatedUser._id
            });
            _context2.next = 6;
            return calendarEvent.save();

          case 6:
            res.status(201).json({
              ok: true,
              calendar_event: calendarEvent
            });
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.status(500).json({
              ok: false,
              msg: 'Talk to admin!'
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));

  return function createCalendarEvent(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createCalendarEvent = createCalendarEvent;

var updateCalendarEvent = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req) {
    var res,
        eventID,
        _req$body2,
        title,
        note,
        start,
        end,
        calendarEvent,
        newEvent,
        updatedEven,
        _args3 = arguments;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : _express.response;
            _context3.prev = 1;
            eventID = req.params.id;
            _req$body2 = req.body, title = _req$body2.title, note = _req$body2.note, start = _req$body2.start, end = _req$body2.end;
            _context3.next = 6;
            return _models.CalendarEvent.findById(eventID);

          case 6:
            calendarEvent = _context3.sent;

            if (!(calendarEvent.user.toString() !== req.authenticatedUser.id)) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              ok: false,
              msg: 'Unauthorized!'
            }));

          case 9:
            newEvent = {
              title: title,
              note: note,
              start: start,
              end: end,
              user: req.authenticatedUser.id
            };
            _context3.next = 12;
            return _models.CalendarEvent.findByIdAndUpdate(eventID, newEvent, {
              "new": true
            });

          case 12:
            updatedEven = _context3.sent;
            res.status(200).json({
              ok: true,
              event: updatedEven
            });
            _context3.next = 20;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            res.status(500).json({
              ok: false,
              msg: 'Something went wrong!'
            });

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 16]]);
  }));

  return function updateCalendarEvent(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateCalendarEvent = updateCalendarEvent;

var deleteCalendarEvent = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
    var res,
        id,
        calendarEvent,
        _args4 = arguments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            res = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : _express.response;
            _context4.prev = 1;
            id = req.params.id;
            _context4.next = 5;
            return _models.CalendarEvent.findById(id);

          case 5:
            calendarEvent = _context4.sent;

            if (!(calendarEvent.user.toString() !== req.authenticatedUser.id)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.status(401).json({
              ok: false,
              msg: 'Unauthorized!'
            }));

          case 8:
            _context4.next = 10;
            return _models.CalendarEvent.findByIdAndDelete(id);

          case 10:
            res.status(200).json({
              ok: true
            });
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.status(500).json({
              ok: false,
              msg: 'Something went wrong!'
            });

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 13]]);
  }));

  return function deleteCalendarEvent(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteCalendarEvent = deleteCalendarEvent;