import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Events() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await API.get("/event");
    setEvents(res.data || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Layout>
      <h1>All Events</h1>

      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      ))}
    </Layout>
  );
}

export default Events;