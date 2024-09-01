import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendar.css";

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/client";

const localizer = momentLocalizer(moment);

export default function MyCalendar() {
  const [events, setEvents] = useState<any[]>([])

  const getEvents = () => {
    const unsubscribe = onSnapshot(query(collection(db, "events")), (querySnapshot) => {
      const events:any[] = [];
      querySnapshot.forEach((doc) => {
        try {
          events.push({
            title: doc.data().title,
            start: doc.data().date?.toDate(),
            end: doc.data().date?.toDate(),
            allDay: false,
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
    />
  );
}
