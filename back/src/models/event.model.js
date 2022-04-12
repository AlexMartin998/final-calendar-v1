'use strict';

import { Schema, model } from 'mongoose';

const CalendarEventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    note: {
      type: String,
    },
    start: {
      type: Date,
      required: [true, 'Initial date is required!'],
    },
    end: {
      type: Date,
      required: [true, 'Finish date is required!'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CalendarEventSchema.methods.toJSON = function () {
  const calendarEvent = this.toObject();
  calendarEvent.id = this._id;

  delete calendarEvent._id;

  return calendarEvent;
};

export default model('Event', CalendarEventSchema);
