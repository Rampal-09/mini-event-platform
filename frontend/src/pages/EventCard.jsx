import { useState, useEffect } from "react";

const EventCard = ({
  event,
  onDelete,
  onEdit,
  onUpdate,
  isEditing,
  onJoin,
  onLeave,
}) => {
  const { isJoined, isFull } = event;
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    capacity: "",
  });

  useEffect(() => {
    if (isEditing) {
      setForm({
        title: event.title,
        description: event.description,
        location: event.location,
        capacity: event.capacity,
      });
    }
  }, [isEditing, event]);

  const handleDelete = () => {
    onDelete(event._id);
  };

  const handleSave = () => {
    onUpdate(form);
  };

  console.log("EventCard rendering:", {
    eventId: event._id,
    isJoined,
    isFull,
  });

  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      {isEditing ? (
        <>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            style={{ display: "block", width: "100%", marginBottom: "5px" }}
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            style={{ display: "block", width: "100%", marginBottom: "5px" }}
          />
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Location"
            style={{ display: "block", width: "100%", marginBottom: "5px" }}
          />
          <input
            type="number"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            placeholder="Capacity"
            style={{ display: "block", width: "100%", marginBottom: "5px" }}
          />

          <button onClick={handleSave}>Update</button>
          <button onClick={() => onEdit(null)}>Cancel</button>
        </>
      ) : (
        <>
          <div
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${event.image}`}
              alt={event.title}
              width="200"
            />
          </div>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p> {event.location}</p>
          <p> Capacity: {event.capacity}</p>

          <div style={{ marginTop: "10px" }}>
            <button onClick={onEdit} style={{ marginRight: "5px" }}>
              Edit
            </button>
            <button onClick={handleDelete} style={{ marginRight: "5px" }}>
              Delete
            </button>

            {!isJoined && !isFull && (
              <button
                onClick={() => onJoin(event._id)}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  marginRight: "5px",
                }}
              >
                Join Event
              </button>
            )}

            {isJoined && (
              <button
                onClick={() => onLeave(event._id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginRight: "5px",
                }}
              >
                Leave Event
              </button>
            )}

            {isFull && !isJoined && (
              <p style={{ color: "red", fontWeight: "bold" }}>Event Full</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EventCard;
