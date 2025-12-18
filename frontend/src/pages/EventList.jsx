import { useEffect, useState } from "react";
import {
  getAllEvents,
  deleteEvent,
  editEvent,
  joinEvent,
  leaveEvent,
} from "../api/eventApi";
import EventCard from "./EventCard";
import "./EventList.module.css";
const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents();
        console.log("Fetched events:", res.data);
        setEvents(res.data);
      } catch (err) {
        console.log("Error fetching events", err);
        setError("Failed to load events");
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (deleteId) => {
    try {
      await deleteEvent(deleteId);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== deleteId)
      );
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to delete event");
    }
  };

  const handleUpdateEvent = async (updatedEventData) => {
    try {
      const data = await editEvent(editingEvent._id, updatedEventData);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === editingEvent._id ? data.data : event
        )
      );
      setEditingEvent(null);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to update event");
    }
  };

  const handleJoinEvent = async (eventId) => {
    try {
      const res = await joinEvent(eventId);

      if (res?.data?.event) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? res.data.event : event
          )
        );
        setError(null);
      } else if (res?.event) {
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event._id === eventId ? res.event : event))
        );
        setError(null);
      }
    } catch (err) {
      console.log("Join error:", err);
      setError(err.response?.data?.message || "Failed to join event");
    }
  };

  const handleLeaveEvent = async (eventId) => {
    try {
      const res = await leaveEvent(eventId);

      if (res?.data?.event) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? res.data.event : event
          )
        );
        setError(null);
      } else if (res?.event) {
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event._id === eventId ? res.event : event))
        );
        setError(null);
      }
    } catch (err) {
      console.log("Leave error:", err);
      setError(err.response?.data?.message || "Failed to leave event");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Events</h2>

      {error && <div className="errorMessage">{error}</div>}

      {events.length > 0 ? (
        <div className="eventGrid">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={handleDeleteEvent}
              onEdit={() => setEditingEvent(event)}
              onUpdate={handleUpdateEvent}
              onJoin={handleJoinEvent}
              onLeave={handleLeaveEvent}
              isEditing={editingEvent?._id === event._id}
            />
          ))}
        </div>
      ) : (
        <div className="noEvents">No events available</div>
      )}
    </div>
  );
};

export default EventList;
