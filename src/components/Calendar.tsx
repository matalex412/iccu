import { format } from "date-fns"
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore"
import moment from "moment"
import React, { type FC, useEffect, useMemo, useState } from "react"
import { Calendar, type Event, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useMediaQuery } from "react-responsive"

import { db } from "../firebase/client"
import "../styles/calendar.css"
import CustomEvent from "./CustomEvent"
import Modal from "./Modal"

const localizer = momentLocalizer(moment)

type CustomEvent = {
  title: string
  timing: string
  location?: string
  description?: string
}

const MyCalendar: FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [event, setEvent] = useState<CustomEvent | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

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

  const handleSelectEvent = async (event: Event) => {
    // fetch event from db based on resource id
    const eventRef = doc(db, "events", event.resource)
    const eventDoc = await getDoc(eventRef)
    const eventData = eventDoc.data()

    if (eventData) {
      const start = eventData.start?.toDate()
      const end = eventData.end?.toDate()

      const timing = getTimingString(start, end)
      setEvent({
        title: eventData.title,
        location: eventData.location,
        description: eventData.description,
        timing,
      })
      openModal()
    }
  }

  const getTimingString = (start: Date, end: Date) => {
    if (!start || !end) {
      return ""
    }

    // if the event starts and ends on the same day
    if (
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate()
    ) {
      const startString = format(start, "h:mm a")
      const endString = format(end, "h:mm a")
      const dateString = format(start, "MMMM do, yyyy")
      return `${dateString} at ${startString} - ${endString}`
    }

    // if the event spans multiple days
    const startString = format(start, "MMMM do, yyyy h:mm a")
    const endString = format(end, "MMMM do, yyyy h:mm a")
    return `${startString} - ${endString}`
  }

  var min = new Date()
  min.setHours(7)
  min.setMinutes(0)

  var max = new Date()
  max.setHours(22)
  max.setMinutes(0)

  return (
    <>
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
        onSelectEvent={handleSelectEvent}
      />
      <Modal title={event?.title?.toString() ?? ""} closeModal={closeModal} isOpen={isOpen}>
        {event && (
          <div className="text-leaf-600 text-lg flex flex-col gap-3">
            <div>
              <h2 className="semibold text-leaf-800 text-xl">When?</h2>
              <p>{event.timing}</p>
            </div>

            {event.location && (
              <div>
                <h2 className="semibold text-leaf-800 text-xl">Where?</h2>
                <p>{event.location}</p>
              </div>
            )}

            {event.description && (
              <div>
                <h2 className="semibold text-leaf-800 text-xl">Description</h2>
                <p>{event.description}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}

export default MyCalendar
