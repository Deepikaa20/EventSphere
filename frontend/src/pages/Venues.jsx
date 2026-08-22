import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Venues() {
  const [venues, setVenues] = useState([]);

  const [form, setForm] = useState({
    name: "",
    location: "",
    capacity: ""
  });

  const fetchVenues = async () => {
    try {
      const res = await API.get("/venue");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setVenues(data);

    } catch (err) {
      console.log(err);
      setVenues([]);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const addVenue = async () => {
    if (!form.name || !form.location || !form.capacity) {
      return alert("Fill all fields");
    }

    await API.post("/venue", form);

    setForm({ name: "", location: "", capacity: "" });
    fetchVenues();
  };

  const deleteVenue = async (id) => {
    await API.delete(`/venues/${id}`);
    fetchVenues();
  };

  return (
    <Layout>
      <h1>Venues</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />

        <button onClick={addVenue}>Add</button>
      </div>

      {venues.length === 0 ? (
        <p>No venues yet</p>
      ) : (
        venues.map(v => (
          <div key={v._id}>
            <h3>{v.name}</h3>
            <p>{v.location} | Capacity: {v.capacity}</p>
            <button onClick={() => deleteVenue(v._id)}>Delete</button>
          </div>
        ))
      )}
    </Layout>
  );
}

export default Venues;