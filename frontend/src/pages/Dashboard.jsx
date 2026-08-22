import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchEvents = async () => {
    try {
      const res = await API.get("/event");
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [location]);

  const totalEvents = events.length;
  const totalAttendees = events.reduce(
    (sum, e) => sum + (e.attendeeCount || 0),
    0
  );

  return (
    <Layout>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>Dashboard</h1>

        <button
          onClick={() => navigate("/create-event")}
          style={{
            padding: "10px 16px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Create Event
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={cardStyle}>
          <h4>Total Events</h4>
          <h2>{totalEvents}</h2>
        </div>

        <div style={cardStyle}>
          <h4>Total Attendees</h4>
          <h2>{totalAttendees}</h2>
        </div>

        <div style={cardStyle}>
          <h4>This Month</h4>
          <h2>{totalEvents}</h2>
        </div>
      </div>

      {/* Events */}
      {events.length === 0 ? (
        <h2>No Events Yet</h2>
      ) : (
        <div style={gridStyle}>
          {events.map((event) => (
            <div
              key={event._id}
              onClick={() => navigate(`/event/${event._id}`)}
              style={eventCard}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <h3>{event.title}</h3>
              <p style={{ color: "#666" }}>{event.description}</p>

              <hr />

              <p>📍 {event.venue?.name || "Not assigned"}</p>
              <p>👥 {event.attendeeCount ?? 0}</p>
              <p>💰 ₹{event.totalBudget ?? 0}</p>

              <button style={openBtn}>Open Event</button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

const cardStyle = {
  flex: 1,
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px",
};

const eventCard = {
  background: "white",
  borderRadius: "14px",
  padding: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  cursor: "pointer",
  transition: "0.3s",
};

const openBtn = {
  marginTop: "10px",
  width: "100%",
  padding: "10px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "6px",
};

<div style={{
  position: "relative",
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  cursor: "pointer"
}}></div>

export default Dashboard;