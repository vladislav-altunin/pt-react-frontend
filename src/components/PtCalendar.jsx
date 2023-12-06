import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles'; // if using DnD

const localizer = dayjsLocalizer(dayjs);

const myEventsList = [
  {
    id: 0,
    title: 'All Day Event very long title',
    // allDay: false,
    start: dayjs('2023-12-06T22:00:52+0000').toDate(),
    end: dayjs('2023-12-06T22:30:52+0000').toDate(),
  },
];

export default function PtCalendar(props) {
  return (
    <div style={{ height: '50vh' }}>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        // startAccessor="start"
        // endAccessor="end"
        // style={{ height: 500 }}
      />
    </div>
  );
}
