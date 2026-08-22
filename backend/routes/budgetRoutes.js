const express = require("express");
const router = express.Router();
const Budget = require("../models/budget");

// ✅ ADD
router.post("/:eventId", async (req, res) => {
  try {
    const { title, amount } = req.body;

    const data = new Budget({
      eventId: req.params.eventId,
      title,
      amount: Number(amount) // 🔥 FIX
    });

    await data.save();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL
router.get("/", async (req, res) => {
  const data = await Budget.find().populate("eventId");
  res.json(data);
});

// ✅ GET BY EVENT
router.get("/:eventId", async (req, res) => {
  const data = await Budget.find({
    eventId: req.params.eventId
  });

  res.json(data);
});

// ✅ DELETE
router.delete("/:id", async (req, res) => {
  await Budget.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;