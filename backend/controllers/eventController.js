const Event = require("../models/event");
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, dateTime, location, capacity, image } =
      req.body;
    if (
      !title ||
      !description ||
      !dateTime ||
      !location ||
      !capacity ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newEvent = new Event({
      title: title,
      description: description,
      dataTime: dateTime,
      location: location,
      capacity: capacity,
      image: image,
      createdBy: req.user.userId,
    });
    await newEvent.save();
    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};
exports.getAllEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find().populate("createdBy", "name email");
    return res.status(200).json({
      success: true,
      data: allEvents,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

exports.editEvent = async (req, res, next) => {
  try {
    const EventId = req.params.id;
    const userId = req.user.userId;

    const event = await Event.findById(EventId);
    if (event) {
      return res.status(404).json({
        success: false,
        message: "event not found",
      });
    }
    if (event.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }
    event.title = req.body.title;
    event.description = req.body.title;
    event.title = req.body.title;
    event.dataTime = req.body.dateTime;
    event.location = req.body.location;
    event.capacity = req.body.capacity;
    event.image = req.body.image;

    await event.save();
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(event);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }
    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};

exports.joinEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.userId;

    const event = await Event.findByIdAndUpdate(
      {
        _id: eventId,
        attendees: { $ne: "userId" },
        $expr: { $lt: [{ $size: "attendees" }, "$capacity"] },
      },
      { $addToset: { attendees: userId } },
      { new: true }
    );
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event is full or already joined",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully joined event",
      event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to join event",
    });
  }
};

exports.leaveEvent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const eventId = req.params.id;

    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        $pull: { attendees: userId },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Left event successfully",
      event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to leave event",
    });
  }
};
