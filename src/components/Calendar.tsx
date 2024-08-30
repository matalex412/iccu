import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendar.css";

const localizer = momentLocalizer(moment)

// const events = [
//   {
//     start: new Date(),
//     end: new Date(),
//     title: "Some title",
//     allDay: true,
//   }
// ]

export default function MyCalendar ({ events }: { events: any[] }) {  
  var date = new Date();
  date.setDate(date.getDate() - 1);

  const fakeEvents = [
    {
      start: date,
      end: date,
      title: "Sometitle",
      allDay: true,
    }
  ]

  console.log('events', events)
  console.log('fakeEvents', fakeEvents)
  
  const isMobile = false
  const view = isMobile ? 'week' : 'month'
  return (
    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      className="w-full"
      views={[view]}
      view={view}
      events={events}
    />
  )
}