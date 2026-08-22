const express = require("express");
const router = express.Router();
const Venue = require("../models/venue");

// ✅ ADD
router.post("/", async (req, res) => {
  try {
    const venue = new Venue(req.body);
    const saved =await venue.save();
    res.json(saved);
  } catch (err) {
    console.log("POST error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await Venue.find();
    res.json(data);
  } catch (err) {
    console.log("GET error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE
router.delete("/:id", async (req, res) => {
  await Venue.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;