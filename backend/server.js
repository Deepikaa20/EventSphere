
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const attendeeRoutes = require("./routes/attendeeRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const venueRoutes = require("./routes/venueRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/attendee", attendeeRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/venue", venueRoutes);

app.get("/", (req, res) => {
  res.send("EventSphere API is running!");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
