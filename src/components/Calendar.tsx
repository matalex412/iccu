import { collection, onSnapshot, query } from "firebase/firestore"
import moment from "moment"
import React, { type FC, useEffect, useMemo, useState } from "react"
import { Calendar, type Event, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"

import { db } from "../firebase/client"
import "../styles/calendar.css"
import CustomEvent from "./CustomEvent"

const localizer = momentLocalizer(moment)

interface MyCalendarProps {
  onSelectEvent?: (event: Event) => void
}

const MyCalendar: FC<MyCalendarProps> = ({ onSelectEvent }) => {
  const [events, setEvents] = useState<Event[]>([])

  const components = useMemo(
    () => ({
      event: CustomEvent, // used by each view (Month, Day, Week)
    }),
    []
  )

  const getEvents = () => {
    const unsubscribe = onSnapshot(query(collection(db, "events")), (querySnapshot) => {
      const events: Event[] = []
      querySnapshot.forEach((doc) => {
        try {
          events.push({
            title: doc.data().title,
            start: doc.data().date?.toDate(),
            end: doc.data().date?.toDate(),
            allDay: false,
            resource: doc.id,
          })
        } catch (error) {
          console.error(error)
        }
      })
      setEvents(events)
    })
    return unsubscribe
  }

  useEffect(() => {
    return getEvents()
  }, [])

  const isMobile = false
  const view = isMobile ? "week" : "month"
  return (
    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      className="w-full"
      views={[view]}
      defaultView={view}
      events={events}
      components={components}
    />
  )
}

export default MyCalendar
