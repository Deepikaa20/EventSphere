import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Budget() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/budget");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        setBudgets(data);

      } catch (err) {
        console.log(err);
        setBudgets([]);
      }
    };

    fetch();
  }, []);

  // 🔥 GROUP BY EVENT
  const grouped = {};
  budgets.forEach(b => {
    const event = b.eventId?.title || "Unknown";

    if (!grouped[event]) grouped[event] = 0;
    grouped[event] += Number(b.amount);
  });

  return (
    <Layout>
      <h1>Budget Overview</h1>

      {budgets.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        Object.entries(grouped).map(([event, amount]) => (
          <div key={event}>
            <h3>{event}</h3>
            <p>₹{amount}</p>
          </div>
        ))
      )}

      <h2 style={{ marginTop: "20px" }}>
        Total ₹{budgets.reduce((s, b) => s + Number(b.amount), 0)}
      </h2>
    </Layout>
  );
}

export default Budget;