import api from "./axios";
export const createEvent = async (data) => {
  try {
    const res = await api.post("/event/create", data);
    return res.data;
  } catch (err) {
    console.log("axoisError", err);
  }
};

export const getAllEvents = async () => {
  try {
    const res = await api.get("/event/all");
    return res.data;
  } catch (err) {
    console.log("axoisError", err);
  }
};

export const editEvent = async (id, data) => {
  try {
    const res = await api.put(`/event/${id}/edit`, data);
    return res.data;
  } catch (err) {
    console.log("axiosError", err);
  }
};

export const deleteEvent = async (id) => {
  try {
    const res = await api.delete(`/event/${id}/delete`);
    return res.data;
  } catch (err) {
    console.log("axiosError", err);
  }
};

export const joinEvent = async (eventId) => {
  try {
    const res = await api.post(`/event/${eventId}/join`);
    return res.data;
  } catch (err) {
    console.log("join error", err);
  }
};

export const leaveEvent = async (eventId) => {
  try {
    const res = await api.post(`/event/${eventId}/leave`);
    return res.data;
  } catch (err) {
    console.log("leave error", err);
  }
};
