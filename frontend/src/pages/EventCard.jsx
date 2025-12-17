const EventCard = ({ event }) => {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <img
        src={`http://localhost:5000/uploads/${event.image}`}
        alt={event.title}
        width="200"
      />

      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>
        <b>Location:</b> {event.location}
      </p>
      <p>
        <b>Date:</b> {new Date(event.dateTime).toLocaleString()}
      </p>
      <p>
        <b>Seats:</b> {event.attendees.length} / {event.capacity}
      </p>

      {/* Join / Leave will come next */}
      <button>Join Event</button>
    </div>
  );
};

export default EventCard;
