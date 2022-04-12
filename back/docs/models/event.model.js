'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var CalendarEventSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  note: {
    type: String
  },
  start: {
    type: Date,
    required: [true, 'Initial date is required!']
  },
  end: {
    type: Date,
    required: [true, 'Finish date is required!']
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

CalendarEventSchema.methods.toJSON = function () {
  var calendarEvent = this.toObject();
  calendarEvent.id = this._id;
  delete calendarEvent._id;
  return calendarEvent;
};

var _default = (0, _mongoose.model)('Event', CalendarEventSchema);

exports["default"] = _default;