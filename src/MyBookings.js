import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, "bookings"));

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((b) => b.userId === auth.currentUser?.uid);

      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 حجوزاتي</h2>

      {bookings.length === 0 && (
        <p>لا توجد حجوزات حتى الآن</p>
      )}

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ccc",
            margin: 10,
            padding: 10,
            borderRadius: 10
          }}
        >
          <img src={b.image} alt={b.carName} width="200" />

          <h3>{b.carName}</h3>
          <p>📅 التاريخ: {b.date}</p>
          <p>💰 السعر: {b.price} ريال</p>
        </div>
      ))}
    </div>
  );
}