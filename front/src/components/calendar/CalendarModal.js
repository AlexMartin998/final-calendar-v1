import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import './../../styles.css';
import { uiCloseModal } from '../../actions/ui';
import {
  eventAddNew,
  eventCleanActiveEvent,
  eventUpdated,
} from '../../actions/calendarEvents';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1h = now.clone().add(3, 'hours');

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1h.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1h.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (!activeEvent) return setFormValues(initEvent);
    setFormValues({ ...activeEvent });

    // if (activeEvent) {
    //   setFormValues({ ...activeEvent });
    // } else {
    //   setFormValues(initEvent);
    // }
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventCleanActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDateChange = e => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = e => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd))
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fecha fin debe ser mayor a la fecha de inicio!',
      });

    if (title.trim().length < 2) return setTitleValid(false);

    if (activeEvent) dispatch(eventUpdated(formValues));
    else {
      // TODO: Grabar en DB
      dispatch(
        eventAddNew({
          ...formValues,
          id:
            Math.random().toString(32).replace('.', '') + new Date().getTime(),
          user: {
            _id: Math.random().toString(32).replace('.', ''),
            name: 'Alex pro - crea la new note',
          },
        })
      );
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> {activeEvent ? 'Edit event' : 'Add new event'} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block w-100 mt-3"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
