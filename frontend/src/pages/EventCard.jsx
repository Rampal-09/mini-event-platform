import { useState, useEffect } from "react";
import styles from "./EventCard.module.css";

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
    <div className={styles.card}>
      {isEditing ? (
        <>
          <div className={styles.formGroup}>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
              className={styles.textarea}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Location"
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="number"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              placeholder="Capacity"
              className={styles.input}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              onClick={handleSave}
              className={`${styles.button} ${styles.joinButton}`}
            >
              Update
            </button>
            <button
              onClick={() => onEdit(null)}
              className={`${styles.button} ${styles.deleteButton}`}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.imageContainer}>
            <img
              src={`http://localhost:5000/uploads/${event.image}`}
              alt={event.title}
              className={styles.image}
            />
          </div>
          <h3 className={styles.title}>{event.title}</h3>
          <p className={styles.description}>{event.description}</p>
          <p className={styles.info}> {event.location}</p>
          <p className={styles.info}> Capacity: {event.capacity}</p>

          <div className={styles.buttonGroup}>
            <button
              onClick={onEdit}
              className={`${styles.button} ${styles.editButton}`}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className={`${styles.button} ${styles.deleteButton}`}
            >
              Delete
            </button>

            {!isJoined && !isFull && (
              <button
                onClick={() => onJoin(event._id)}
                className={`${styles.button} ${styles.joinButton}`}
              >
                Join Event
              </button>
            )}

            {isJoined && (
              <button
                onClick={() => onLeave(event._id)}
                className={`${styles.button} ${styles.leaveButton}`}
              >
                Leave Event
              </button>
            )}

            {isFull && !isJoined && (
              <p className={styles.fullMessage}>❌ Event Full</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EventCard;
