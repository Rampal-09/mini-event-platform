import { useState } from "react";
import { createEvent } from "../api/eventApi";
import styles from "./CreateEvent.module.css";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    capacity: "",
  });
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("dateTime", form.dateTime);
      formData.append("location", form.location);
      formData.append("capacity", form.capacity);
      formData.append("image", image);
      console.log("formData", formData);
      const res = await createEvent(formData);
      console.log(res);
      alert("Event created successfully!");
      setForm({
        title: "",
        description: "",
        dateTime: "",
        location: "",
        capacity: "",
      });
      setImage(null);
    } catch (err) {
      console.log("err", err);
      alert("Failed to create event");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create Event</h2>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            id="title"
            className={styles.input}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            name="description"
            placeholder="Event Description"
            id="description"
            className={styles.textarea}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dateTime" className={styles.label}>
            Date & Time
          </label>
          <input
            type="datetime-local"
            name="dateTime"
            id="dateTime"
            className={styles.input}
            value={form.dateTime}
            onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location" className={styles.label}>
            Location
          </label>
          <input
            type="text"
            placeholder="Event Location"
            id="location"
            className={styles.input}
            value={form.location}
            name="location"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="capacity" className={styles.label}>
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            placeholder="Maximum Attendees"
            className={styles.input}
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>
            Event Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className={styles.fileInput}
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
