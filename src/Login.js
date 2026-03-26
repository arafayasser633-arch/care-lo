import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const login = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <div
        style={{
          background: "#fff",
          padding: 40,
          borderRadius: 20,
          maxWidth: 400,
          margin: "auto",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >
        <h2>🔐 Login</h2>
        <p>Sign in to book cars</p>

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: 12,
            background: "#4285F4",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer"
          }}
        >
          🔵 Continue with Google
        </button>
      </div>
    </div>
  );
}