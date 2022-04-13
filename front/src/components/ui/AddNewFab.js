import React from 'react';
import { useDispatch } from 'react-redux';

import { uiOpenModal } from '../../actions/ui';
import { eventCleanActiveEvent } from '../../actions/calendarEvents';

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleClick = e => {
    dispatch(uiOpenModal());
    dispatch(eventCleanActiveEvent());
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
