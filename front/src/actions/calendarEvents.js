import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import { types } from '../types/types';

export const eventStartAddNew = event => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const resp = await fetchWithToken('events', event, 'POST');
      const body = await resp.json();
      if (!body.ok) return;

      event.id = body.calendar_event.id;
      event.user = {
        _id: uid,
        name,
      };
      dispatch(eventAddNew(event));

      console.log(event);
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = event => ({
  type: types.eventAddnew,
  payload: event,
});

export const eventSetActive = event => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventCleanActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventStartUpdate = event => {
  return async dispatch => {
    try {
      const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
      const body = await resp.json();
      if (!body.ok) return Swal.fire('Error!', body.msg, 'error');

      dispatch(eventUpdated(event));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventUpdated = event => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    try {
      const eventID = getState().calendar.activeEvent.id;

      const resp = await fetchWithToken(`events/${eventID}`, {}, 'DELETE');
      const body = await resp.json();
      if (!body.ok) return Swal.fire('Error!', body.msg, 'error');

      dispatch(eventDeleted());
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventStartLoading = () => {
  return async dispatch => {
    try {
      const resp = await fetchWithToken('events');
      const body = await resp.json();
      const events = prepareEvents(body.events);

      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = events => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventLogout = () => ({
  type: types.eventLogout,
});
