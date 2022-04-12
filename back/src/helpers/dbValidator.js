'use strict';

import { CalendarEvent, User } from '../models';

export const isAlreadyRegistered = async (query, collection) => {
  let model;

  const checkInCollection = () => {
    if (model)
      throw new Error(
        `The ${collection}${
          query.includes('@') ? "'s email" : ' name'
        } is already registered!`
      );
  };

  switch (collection) {
    case 'user':
      model = await User.findOne({ email: query });
      return checkInCollection();

    default:
      break;
  }
};

export const doesItExist = async (id, collection) => {
  let model;

  const checkInCollection = () => {
    if (!model)
      throw new Error(`${collection} ID: '${id}' doesn't exist! - in Db`);
  };

  // Search by ID
  switch (collection) {
    case 'user':
      model = await User.findById(id);
      return checkInCollection();

    case 'event':
      model = await CalendarEvent.findById(id);
      return checkInCollection();
  }
};
