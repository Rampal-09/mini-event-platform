const Event = require("../models/event");
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, dateTime, location, capacity } = req.body;

    if (!title || !description || !dateTime || !location || !capacity) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const newEvent = new Event({
      title: title,
      description: description,
      dateTime: dateTime,
      location: location,
      capacity: capacity,
      image: req.file.filename,
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
exports.getAllEvents = async (req, res) => {
  try {
    const userId = req.user?.userId;
    console.log("Getting events for user:", userId);

    const events = await Event.find().populate("createdBy", "name email");

    const formattedEvents = events.map((event) => {
      const attendees = event.attendees.map((id) => id.toString());
      const isJoined = userId ? attendees.includes(userId) : false;
      const isFull = attendees.length >= event.capacity;

      console.log(`Event ${event._id}:`, {
        isJoined,
        isFull,
        attendeesCount: attendees.length,
      });

      return {
        ...event.toObject(),
        isJoined,
        isFull,
      };
    });

    res.status(200).json({
      success: true,
      data: formattedEvents,
    });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({
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
    if (!event) {
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
    if (req.file) {
      event.image = req.file.filename;
    }

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

    const event = await Event.findById(eventId);

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

exports.joinEvent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const eventId = req.params.id;

    console.log("Join event:", { userId, eventId });

    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        attendees: { $ne: userId },
        $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] },
      },
      { $addToSet: { attendees: userId } },
      { new: true }
    );

    if (!event) {
      console.log("Cannot join: Event is full or already joined");
      return res.status(400).json({
        success: false,
        message: "Event is full or already joined",
      });
    }

    const attendees = event.attendees.map((id) => id.toString());
    const responseData = {
      ...event.toObject(),
      isJoined: true,
      isFull: attendees.length >= event.capacity,
    };

    console.log("Join successful:", responseData);

    res.status(200).json({
      success: true,
      event: responseData,
    });
  } catch (err) {
    console.error("Error joining event:", err);
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

    console.log("Leave event:", { userId, eventId });

    const event = await Event.findByIdAndUpdate(
      eventId,
      { $pull: { attendees: userId } },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const attendees = event.attendees.map((id) => id.toString());
    const responseData = {
      ...event.toObject(),
      isJoined: false,
      isFull: attendees.length >= event.capacity,
    };

    console.log("Leave successful:", responseData);

    res.status(200).json({
      success: true,
      event: responseData,
    });
  } catch (err) {
    console.error("Error leaving event:", err);
    res.status(500).json({
      success: false,
      message: "Failed to leave event",
    });
  }
};
