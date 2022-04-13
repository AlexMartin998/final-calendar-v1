import { types } from '../types/types';
/* 

{
  id: Math.random().toString(32).replace('.', '') + new Date().getTime(),
  title: 'Cumple Jefe',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  notes: 'Comprar el pastel',
  user: {
    _id: '123',
    name: 'Alex event - Default event',
  },
},
*/

const initialState = {
  events: [],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventAddnew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null,
      };

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(event => event.id !== state.activeEvent.id),
        activeEvent: null,
      };

    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload],
        activeEvent: null,
      };

    case types.eventLogout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
