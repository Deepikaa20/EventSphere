const Event = require("../models/event");
const Attendee = require("../models/attendee");
const Budget = require("../models/budget");

// ✅ CREATE EVENT
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ALL EVENTS (🔥 WITH COUNTS + TOTAL BUDGET)
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("venue");

    const enrichedEvents = await Promise.all(
      events.map(async (event) => {
        const attendeeCount = await Attendee.countDocuments({
          eventId: event._id
        });

        const budgets = await Budget.find({
          eventId: event._id
        });

        const totalBudget = budgets.reduce(
          (sum, b) => sum + Number(b.amount),
          0
        );

        return {
          ...event.toObject(),
          attendeeCount,
          totalBudget
        };
      })
    );

    res.json(enrichedEvents);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET EVENT BY ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("venue");

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ASSIGN VENUE
const assignVenue = async (req, res) => {
  try {
    const { venueId } = req.body;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { venue: venueId },
      { new: true }
    ).populate("venue");

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE EVENT (🔥 WITH CLEANUP)
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // 🔥 delete related data first
    await Attendee.deleteMany({ eventId });
    await Budget.deleteMany({ eventId });

    // 🔥 delete event
    await Event.findByIdAndDelete(eventId);

    res.json({ message: "Event deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ EXPORTS
module.exports = {
  createEvent,
  getEvents,
  getEventById,
  assignVenue,
  deleteEvent
};  