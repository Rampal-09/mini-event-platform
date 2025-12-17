const express = require("express");
const eventRoutes = express.Router();
const eventControllers = require("../controllers/eventController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

eventRoutes.post(
  "/create",
  auth,
  upload.single("image"),
  eventControllers.createEvent
);
eventRoutes.get("/all", eventControllers.getAllEvents);
eventRoutes.put("/:id/edit", auth, eventControllers.editEvent);
eventRoutes.delete("/:id/delete", auth, eventControllers.deleteEvent);
eventRoutes.post("/:id/join", auth, eventControllers.joinEvent);
eventRoutes.post("/:id/leave", auth, eventControllers.leaveEvent);

exports.eventRoutes = eventRoutes;
