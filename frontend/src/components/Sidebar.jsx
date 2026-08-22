import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Events", path: "/events" },
  { name: "Venues", path: "/venues" },
  { name: "Budget", path: "/budget" },
  { name: "Attendees", path: "/Attendees" },
];  

  return (
    <div
      style={{
        width: "190px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        position: "fixed",
        top: 0,
        left: isOpen || window.innerWidth > 768 ? "0" : "-220px",
        transition: "0.3s",
        zIndex: 1000,
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>EventZen</h2>

      {menu.map((item) => (
        <p
          key={item.name}
          onClick={() => {
            navigate(item.path);
            setIsOpen(false);
          }}
          style={{
            margin: "15px 0",
            cursor: "pointer",
            color: "#cbd5e1",
          }}
        >
          {item.name}
        </p>
      ))}
    </div>
  );
}

export default Sidebar;