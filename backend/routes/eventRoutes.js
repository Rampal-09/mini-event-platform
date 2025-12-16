const express = require("express");
const eventRoutes = express.Router();
const eventControllers = require("../controllers/eventController");

eventRoutes.post("/create", eventControllers.createEvent);
eventRoutes.get("/all", eventControllers.getAllEvents);
eventRoutes.put("/:id/edit", eventControllers.editEvent);
eventRoutes.delete("/:id/delete", eventControllers.deleteEvent);
eventRoutes.post("/:id/join", auth, eventControllers.joinEvent);
eventRoutes.post("/:id/leave", auth, eventControllers.leaveEvent);

exports.eventRoutes = eventRoutes;
