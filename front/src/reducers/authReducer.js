import { types } from '../types/types';

const initialState = {
  checking: true, // No logueado
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case types.authStartRegister:
      return {
        ...state,
        checking: false,
      };

    case types.authChekingFinish:
      return {
        ...state,
        checking: false,
      };

    case types.authLogout:
      return {
        checking: false,
      };

    default:
      return state;
  }
};
