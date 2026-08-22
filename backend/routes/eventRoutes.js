const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createEvent,
  getEvents,
  getEventById,
  assignVenue,
  deleteEvent
} = require("../controllers/eventController");

router.post("/", auth, createEvent);
router.get("/", auth, getEvents);
router.get("/:id", auth, getEventById);
router.put("/:id/venue", auth, assignVenue); // ✅ works now
router.delete("/:id", deleteEvent);
module.exports = router;