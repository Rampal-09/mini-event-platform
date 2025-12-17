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
