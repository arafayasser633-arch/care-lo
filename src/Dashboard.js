import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📦 جلب كل الحجوزات
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const snapshot = await getDocs(collection(db, "bookings"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // 👤 حجوزات المستخدم الحالي فقط
  const userBookings = bookings.filter(
    (b) => b.userId === auth.currentUser?.uid
  );

  if (loading) {
    return (
      <h3 style={{ textAlign: "center", marginTop: 50 }}>
        ⏳ جاري تحميل البيانات...
      </h3>
    );
  }

  return (
    <div>

      {/* 🔙 Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>📊 Dashboard</h2>

        {/* 🔙 زر الرجوع */}
        <Link to="/cars" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "8px 12px",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            ⬅ Back to Cars
          </button>
        </Link>
      </div>

      {/* 👤 User Info */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        <img
          src={auth.currentUser?.photoURL}
          alt={auth.currentUser?.displayName}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
          }}
        />

        <h3>{auth.currentUser?.displayName}</h3>
        <p style={{ color: "gray" }}>{auth.currentUser?.email}</p>
      </div>

      {/* 📋 Bookings */}
      <h3>📋 My Bookings</h3>

      {userBookings.length === 0 ? (
        <p style={{ color: "gray" }}>لا يوجد حجوزات بعد 🚗</p>
      ) : (
        userBookings.map((b) => (
          <div
            key={b.id}
            style={{
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
              background: "#fff",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>🚗 {b.carName}</strong>
              <p>📅 {b.date}</p>
              <p>💰 {b.price} SAR</p>
            </div>
          </div>
        ))
      )}

    </div>
  );
}