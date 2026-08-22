function Navbar({ setIsOpen }) {
  return (
    <div
      style={{
        height: "60px",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #eee",
      }}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          fontSize: "20px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      <input
        placeholder="Search events..."
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          width: "200px",
        }}
      />

      <div>👤 Admin</div>
    </div>
  );
}

export default Navbar;