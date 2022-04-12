import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import {
  eventCleanActiveEvent,
  eventSetActive,
} from '../../actions/calendarEvents';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();

  // Leer los eventos del State/Store
  const { events, activeEvent } = useSelector(state => state.calendar);

  const [lastCalendarView, setLastCalendarView] = useState(
    localStorage.getItem('lastCalendarView') || 'month'
  );

  // Open Modal
  const onDoubleClick = e => {
    dispatch(uiOpenModal());
  };

  // Set active calendar-event
  const onSelect = e => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = e => {
    setLastCalendarView(e);
    localStorage.setItem('lastCalendarView', e);
  };

  const onSelectSlot = e => {
    activeEvent && dispatch(eventCleanActiveEvent());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367cf7',
      borderRadius: '0',
      opacity: 0.8,
      displau: 'block',
      color: 'white',
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastCalendarView}
        components={{
          event: CalendarEvent,
        }}
      />

      <CalendarModal />

      <AddNewFab />

      {activeEvent && <DeleteEventFab />}
    </div>
  );
};
