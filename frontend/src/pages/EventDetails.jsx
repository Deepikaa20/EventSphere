import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");

  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");

  const [budgetTitle, setBudgetTitle] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      const eventRes = await API.get(`/event/${id}`);
      const attendeeRes = await API.get(`/attendee/${id}`);
      const budgetRes = await API.get(`/budget/${id}`);
      const venueRes = await API.get(`/venue`);

      setEvent(eventRes.data || null);

      setAttendees(Array.isArray(attendeeRes.data) ? attendeeRes.data : []);

      setBudgets(Array.isArray(budgetRes.data) ? budgetRes.data : []);

      setVenues(Array.isArray(venueRes.data) ? venueRes.data : []);

    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
  fetchData();
}, [id]);

  // 🔥 ASSIGN VENUE
  const assignVenue = async () => {
    if (!selectedVenue) {
      return alert("Please select a venue");
    }

    try {
      await API.put(`/event/${id}/venue`, {
        venueId: selectedVenue
      });

      setSelectedVenue("");
      fetchData();

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 ADD ATTENDEE
  const addAttendee = async () => {
    if (!attendeeName || !attendeeEmail) {
      return alert("Enter name and email");
    }

    try {
      await API.post("/attendee", {
        name: attendeeName,
        email: attendeeEmail,
        eventId: id
      });

      setAttendeeName("");
      setAttendeeEmail("");
      fetchData();

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE ATTENDEE
  const deleteAttendee = async (attendeeId) => {
    try {
      await API.delete(`/attendee/${attendeeId}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 ADD BUDGET
  const addBudget = async () => {
    if (!budgetTitle || !budgetAmount) {
      return alert("Fill all fields");
    }

    try {
      await API.post(`/budget/${id}`, {
        title: budgetTitle,
        amount: Number(budgetAmount)
      });

      setBudgetTitle("");
      setBudgetAmount("");
      fetchData();

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE BUDGET
  const deleteBudget = async (budgetId) => {
    try {
      await API.delete(`/budget/${budgetId}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f6f9",
      display: "flex",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "900px",
        background: "white",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
      }}>

        {/* HEADER */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}>
          <h2>{event.title}</h2>

          <button onClick={() => navigate("/dashboard")} style={btnDark}>
            ⬅ Back
          </button>
        </div>

        <p style={{ color: "#666" }}>{event.description}</p>

        {/* VENUE */}
        <div style={card}>
          <h3>🏢 Venue</h3>

          <div style={row}>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              style={input}
            >
              <option value="">Select Venue</option>
              {venues.map(v => (
                <option key={v._id} value={v._id}>
                  {v.name}
                </option>
              ))}
            </select>

            <button style={btnBlue} onClick={assignVenue}>
              Assign
            </button>
          </div>

          <p><b>Current:</b> {event.venue?.name || "Not assigned"}</p>
        </div>

        {/* ATTENDEES */}
        <div style={card}>
          <h3>👥 Attendees</h3>

          <div style={row}>
            <input
              placeholder="Name"
              value={attendeeName}
              onChange={(e) => setAttendeeName(e.target.value)}
              style={input}
            />
            <input
              placeholder="Email"
              value={attendeeEmail}
              onChange={(e) => setAttendeeEmail(e.target.value)}
              style={input}
            />
            <button style={btnBlue} onClick={addAttendee}>Add</button>
          </div>

          {attendees.map(a => (
            <div key={a._id} style={listItem}>
              {a.name} - {a.email}
              <button style={btnRed} onClick={() => deleteAttendee(a._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* BUDGET */}
        <div style={card}>
          <h3>💰 Budget</h3>

          <div style={row}>
            <input
              placeholder="Title"
              value={budgetTitle}
              onChange={(e) => setBudgetTitle(e.target.value)}
              style={input}
            />
            <input
              placeholder="Amount"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              style={input}
            />
            <button style={btnBlue} onClick={addBudget}>Add</button>
          </div>

          {budgets.map(b => (
            <div key={b._id} style={listItem}>
              {b.title} - ₹{b.amount}
              <button style={btnRed} onClick={() => deleteBudget(b._id)}>
                Delete
              </button>
            </div>
          ))}

          <h3 style={{ marginTop: "10px" }}>
            Total: ₹{budgets.reduce((sum, b) => sum + Number(b.amount), 0)}
          </h3>
        </div>

        <button
  onClick={async () => {
    if (!window.confirm("Delete this event?")) return;

    await API.delete(`/events/${id}`);
    navigate("/dashboard");
  }}
  style={{
    background: "red",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    marginLeft: "10px"
  }}
>
  Delete Event
</button>

      </div>
    </div>
  );
}

/* STYLES (same but slightly improved) */

const card = {
  marginTop: "25px",
  padding: "20px",
  borderRadius: "10px",
  background: "#fafafa",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};

const row = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px"
};

const input = {
  flex: 1,
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const listItem = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "8px",
  padding: "6px 0",
  borderBottom: "1px solid #eee"
};

const btnBlue = {
  background: "#007bff",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px"
};

const btnRed = {
  background: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px"
};

const btnDark = {
  background: "#333",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px"
};

export default EventDetails;