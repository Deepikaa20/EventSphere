import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Attendees() {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/attendee");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        setAttendees(data);

      } catch (err) {
        console.log(err);
        setAttendees([]);
      }
    };

    fetch();
  }, []);

  return (
    <Layout>
      <h1>Attendees</h1>

      {attendees.length === 0 ? (
        <p>No attendees yet</p>
      ) : (
        attendees.map(a => (
          <div key={a._id}>
            <p>{a.name}</p>
            <p>{a.email}</p>
            <p>Event: {a.eventId?.title || "N/A"}</p>
          </div>
        ))
      )}
    </Layout>
  );
}

export default Attendees;