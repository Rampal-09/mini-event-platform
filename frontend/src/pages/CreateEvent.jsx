import { useState } from "react";
import { createEvent } from "../api/eventApi";

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
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      <div>
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          id="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="description"> description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
      </div>
      <div>
        <label htmlFor="dateTime">dateTime</label>
        <input
          type="datetime-local"
          name="dateTime"
          id="dateTime"
          value={form.dateTime}
          onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
        ></input>
      </div>
      <div>
        <label htmlFor="location">location</label>
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          name="location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="capacity"></label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        ></input>
      </div>
      <div>
        <label htmlFor="image">image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEvent;
