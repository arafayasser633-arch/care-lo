import { useState } from "react";
import { db, auth } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

export default function CarDetails({ car, goBack }) {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // 🚗 الحجز
  const handleBooking = async () => {
    // 🔐 لازم تسجيل دخول
    if (!auth.currentUser?.uid) {
      alert("لازم تسجل دخول بجوجل أولاً 🔐");
      return;
    }

    // 📅 التحقق من التاريخ
    if (!date) {
      alert("من فضلك اختر تاريخ الحجز");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "bookings"), {
        carName: car.name,
        price: car.price,
        image: car.image,
        date: date,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        userEmail: auth.currentUser.email,
        createdAt: new Date()
      });

      alert("🚗 تم الحجز بنجاح!");
      setDate("");

    } catch (error) {
      alert("حدث خطأ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 650, margin: "auto" }}>

      {/* ⬅ رجوع */}
      <button
        onClick={goBack}
        style={{
          marginBottom: 15,
          padding: "8px 12px",
          border: "none",
          background: "#eee",
          borderRadius: 8,
          cursor: "pointer"
        }}
      >
        ⬅ رجوع
      </button>

      {/* 🧾 Card */}
      <div
        style={{
          borderRadius: 15,
          overflow: "hidden",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          background: "#fff"
        }}
      >
        {/* 🚗 صورة السيارة */}
        <img
          src={car.image}
          alt={car.name}
          style={{
            width: "100%",
            height: 280,
            objectFit: "cover"
          }}
        />

        <div style={{ padding: 20 }}>

          {/* اسم السيارة */}
          <h2 style={{ marginBottom: 5 }}>{car.name}</h2>

          {/* السعر */}
          <p style={{ color: "green", fontSize: 18, fontWeight: "bold" }}>
            💰 {car.price} ريال / يوم
          </p>

          {/* المستخدم */}
          {auth.currentUser && (
            <p style={{ color: "gray", fontSize: 12 }}>
              👤 {auth.currentUser.displayName}
            </p>
          )}

          {/* التاريخ */}
          <label style={{ display: "block", marginTop: 15 }}>
            📅 اختر تاريخ الحجز
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 8,
              marginBottom: 15,
              borderRadius: 8,
              border: "1px solid #ccc"
            }}
          />

          {/* زر الحجز */}
          <button
            onClick={handleBooking}
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              background: loading ? "gray" : "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 16,
              cursor: "pointer"
            }}
          >
            {loading ? "⏳ جاري الحجز..." : "🚗 تأكيد الحجز"}
          </button>

        </div>
      </div>
    </div>
  );
}