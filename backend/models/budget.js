const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports =
  mongoose.models.Budget ||
  mongoose.model("Budget", budgetSchema);