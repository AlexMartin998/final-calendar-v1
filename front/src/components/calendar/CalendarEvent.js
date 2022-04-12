import React from 'react';

export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <div>
      <span style={{ fontWeight: 'bold' }}>{title}</span>
      <span>- {user.name}</span>
    </div>
  );
};
