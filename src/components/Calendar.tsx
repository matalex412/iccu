import { collection, onSnapshot, query } from "firebase/firestore"
import moment from "moment"
import React, { type FC, useEffect, useMemo, useState } from "react"
import { Calendar, type Event, type ViewsProps, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useMediaQuery } from "react-responsive"

import { db } from "../firebase/client"
import "../styles/calendar.css"
import CustomEvent from "./CustomEvent"

const localizer = momentLocalizer(moment)

const MyCalendar: FC = () => {
  const [events, setEvents] = useState<Event[]>([])

  const components = useMemo(
    () => ({
      event: CustomEvent, // used by each view (Month, Day, Week)
    }),
    []
  )

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  })

  const getEvents = () => {
    const unsubscribe = onSnapshot(query(collection(db, "events")), (querySnapshot) => {
      const events: Event[] = []
      querySnapshot.forEach((doc) => {
        try {
          events.push({
            title: doc.data().title,
            start: doc.data().start?.toDate(),
            end: doc.data().end?.toDate(),
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

  var min = new Date()
  min.setHours(7)
  min.setMinutes(0)

  var max = new Date()
  max.setHours(22)
  max.setMinutes(0)

  return (
    <Calendar
      localizer={localizer}
      showMultiDayTimes
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      className="w-full"
      views={isDesktop ? ["month", "week", "day"] : ["day"]}
      defaultView={isDesktop ? "month" : "day"}
      events={events}
      components={components}
      min={min}
      max={max}
      showAllEvents
    />
  )
}

export default MyCalendar
