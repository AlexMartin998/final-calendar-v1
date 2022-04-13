'use strict';

import { response } from 'express';
import { CalendarEvent } from '../models';

export const getCalendarEvents = async (req, res = response) => {
  const [calendarEvents, total] = await Promise.all([
    CalendarEvent.find().populate('user', 'name'),
    CalendarEvent.countDocuments(),
  ]);

  res.status(200).json({
    ok: true,
    total,
    events: calendarEvents,
  });
};

export const createCalendarEvent = async (req, res = response) => {
  try {
    const { title, note, start, end } = req.body;

    const calendarEvent = new CalendarEvent({
      title,
      note,
      start,
      end,
      user: req.authenticatedUser._id,
    });

    await calendarEvent.save();

    res.status(201).json({
      ok: true,
      calendar_event: calendarEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Talk to admin!' });
  }
};

export const updateCalendarEvent = async (req, res = response) => {
  try {
    const { id: eventID } = req.params;
    const { title, note, start, end } = req.body;

    const calendarEvent = await CalendarEvent.findById(eventID);
    if (calendarEvent.user.toString() !== req.authenticatedUser.id)
      return res.status(401).json({ ok: false, msg: 'Unauthorized!' });

    const newEvent = {
      title,
      note,
      start,
      end,
      user: req.authenticatedUser.id,
    };

    const updatedEven = await CalendarEvent.findByIdAndUpdate(
      eventID,
      newEvent,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      event: updatedEven,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Something went wrong!' });
  }
};

export const deleteCalendarEvent = async (req, res = response) => {
  try {
    const { id } = req.params;

    const calendarEvent = await CalendarEvent.findById(id);
    if (calendarEvent.user.toString() !== req.authenticatedUser.id)
      return res.status(401).json({ ok: false, msg: 'Unauthorized!' });

    await CalendarEvent.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Something went wrong!' });
  }
};
