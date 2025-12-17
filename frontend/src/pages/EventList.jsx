import { useEffect, useState } from "react";
import { getAllEvents } from "../api/eventApi";
import EventCard from "./EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents();
        setEvents(res.data);
      } catch (err) {
        console.log("Error fetching events", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>

      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default Events;
