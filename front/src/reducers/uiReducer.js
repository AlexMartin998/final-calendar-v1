import { types } from '../types/types';

const initialState = {
  isModalOpen: false,
};

export const uiReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.uiOpenModal:
      return {
        ...state,
        isModalOpen: true,
      };

    case types.uiCloseModal:
      return {
        ...state,
        isModalOpen: false,
      };

    default:
      return state;
  }
};
