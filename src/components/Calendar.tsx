import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendar.css";

const localizer = momentLocalizer(moment)

const events = [
  {
    start: new Date(),
    end: new Date(),
    title: "Some title",
    allDay: true,
  }
]

export default function MyCalendar () {
  return (
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="w-full"
        views={['month']}
        events={events}
      />
  )
}