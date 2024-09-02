import { Calendar, momentLocalizer, type Event } from "react-big-calendar";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendar.css";

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/client";

import CustomEvent from "./CustomEvent";

const localizer = momentLocalizer(moment);

export default function MyCalendar({ onSelectEvent }: { onSelectEvent?: (event: Event) => void }) {
  const [events, setEvents] = useState<Event[]>([])

  const components = useMemo(() => ({
    event: CustomEvent, // used by each view (Month, Day, Week)
  }), [])

  const getEvents = () => {
    const unsubscribe = onSnapshot(query(collection(db, "events")), (querySnapshot) => {
      const events: Event[] = [];
      querySnapshot.forEach((doc) => {
        try {
          events.push({
            title: doc.data().title,
            start: doc.data().date?.toDate(),
            end: doc.data().date?.toDate(),
            allDay: false,
            resource: doc.id,
          });
        } catch (error) {
          console.error(error);
        }
      });
      setEvents(events);
    });
    return unsubscribe
  };

  useEffect(() => {
    return getEvents();
  }, []);

  const isMobile = false;
  const view = isMobile ? "week" : "month";
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
      components={components}
    />
  );
}
