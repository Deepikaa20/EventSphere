const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  venue: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Venue"
}
});

module.exports =
  mongoose.models.Event ||
  mongoose.model("Event", eventSchema);