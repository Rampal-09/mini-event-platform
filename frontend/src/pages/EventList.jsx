import { useEffect, useState } from "react";
import {
  getAllEvents,
  deleteEvent,
  editEvent,
  joinEvent,
  leaveEvent,
} from "../api/eventApi";
import EventCard from "./EventCard";

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
      console.log("Update response:", data);

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
      console.log("Join response:", res);

      // Backend returns: { data: { success: true, event: {...} } }
      // Axios wraps it again, so we get: { data: { data: { success: true, event: {...} } } }
      // OR Backend might return: { success: true, event: {...} }
      // Axios wraps it, so we get: { data: { success: true, event: {...} } }

      if (res?.data?.event) {
        // If response structure is { data: { success: true, event: {...} } }
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? res.data.event : event
          )
        );
        setError(null);
      } else if (res?.event) {
        // If response structure is { success: true, event: {...} }
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event._id === eventId ? res.event : event))
        );
        setError(null);
      }
    } catch (err) {
      console.log("Join error:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to join event";
      setError(errorMessage);
    }
  };

  const handleLeaveEvent = async (eventId) => {
    try {
      const res = await leaveEvent(eventId);
      console.log("Leave response:", res);

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
      const errorMessage =
        err.response?.data?.message || "Failed to leave event";
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>Events</h2>

      {error && (
        <div
          style={{
            color: "red",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid red",
            borderRadius: "4px",
            backgroundColor: "#ffeeee",
          }}
        >
          {error}
        </div>
      )}

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
  );
};

export default EventList;
