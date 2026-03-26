import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const user = auth.currentUser;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        background: "#111",
        color: "#fff"
      }}
    >
      {/* 🚗 Logo */}
      <Link to="/cars" style={{ color: "#fff", textDecoration: "none" }}>
        <h2 style={{ margin: 0 }}>🚗 Carlo</h2>
      </Link>

      {/* 🔗 Links */}
      <div style={{ display: "flex", gap: 10 }}>
        <Link to="/cars" style={linkStyle}>Cars</Link>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
      </div>

      {/* 👤 User */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {user ? (
          <>
            <img
              src={user.photoURL}
              alt={user.displayName}
              style={{ width: 35, height: 35, borderRadius: "50%" }}
            />

            <button
              onClick={() => signOut(auth)}
              style={{
                padding: "6px 10px",
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <span>Guest</span>
        )}
      </div>
    </div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  padding: "6px 10px",
  border: "1px solid #333",
  borderRadius: 6
};