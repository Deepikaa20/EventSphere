import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";

// ADD THESE
import Events from "./pages/Events";
import Venues from "./pages/Venues";
import Budget from "./pages/Budget";
import Attendees from "./pages/Attendees";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />

        {/* 🔥 ADD THESE ROUTES */}
        <Route path="/events" element={<Events />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/attendees" element={<Attendees />} />
      </Routes>
    </Router>
  );
}

export default App;