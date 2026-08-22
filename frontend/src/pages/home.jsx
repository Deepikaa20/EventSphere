import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f6f9"
    }}>
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        🚀 NextZen
      </h1>

      <button
        onClick={() => navigate("/login")}
        style={{
          padding: "10px 20px",
          marginBottom: "10px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
        style={{
          padding: "10px 20px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Register
      </button>
    </div>
  );
}

export default Home;