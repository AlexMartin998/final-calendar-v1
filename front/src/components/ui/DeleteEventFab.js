import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/calendarEvents';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(eventStartDelete());
  };

  return (
    <button
      className="btn btn-danger py-3 px-5 fab-danger"
      onClick={handleClick}
    >
      <i className="fas fa-trash"></i>
      <span> Delete</span>
    </button>
  );
};
