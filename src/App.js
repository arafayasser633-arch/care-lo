import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Cars from "./Cars";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>

      <div style={{ fontFamily: "Arial", background: "#f4f6f8", minHeight: "100vh" }}>

        {/* 🧭 Navbar ثابت */}
        <Navbar />

        {/* 📄 Routes */}
        <div style={{ padding: 20 }}>

          <Routes>

            <Route path="/" element={<Cars />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;