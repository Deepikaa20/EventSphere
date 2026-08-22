const express = require("express");
const router = express.Router();
const Attendee = require("../models/attendee");

// ✅ ADD
router.post("/", async (req, res) => {
  try {
    const attendee = new Attendee(req.body);
    await attendee.save();

    res.json(attendee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await Attendee.find().populate("eventId");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET BY EVENT
router.get("/:eventId", async (req, res) => {
  try {
    const data = await Attendee.find({
      eventId: req.params.eventId
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE
router.delete("/:id", async (req, res) => {
  await Attendee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;