
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const eventRoutes = require("./routes/eventRoutes");
app.use("/api/event", eventRoutes);

const attendeeRoutes = require("./routes/attendeeRoutes");
app.use("/api/attendee", attendeeRoutes);

const budgetRoutes = require("./routes/budgetRoutes");
app.use("/api/budget", budgetRoutes);

const venueRoutes = require("./routes/venueRoutes");
app.use("/api/venue", venueRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

