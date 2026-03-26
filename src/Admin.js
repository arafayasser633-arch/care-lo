import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [cars, setCars] = useState([]);

  // جلب السيارات
  const fetchCars = async () => {
    const snapshot = await getDocs(collection(db, "cars"));
    setCars(snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // إضافة سيارة
  const addCar = async () => {
    await addDoc(collection(db, "cars"), {
      name,
      price: Number(price),
      image,
      available: true
    });

    setName("");
    setPrice("");
    setImage("");

    fetchCars();
  };

  // حذف سيارة
  const deleteCar = async (id) => {
    await deleteDoc(doc(db, "cars", id));
    fetchCars();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>👑 Admin Panel</h2>

      {/* إضافة سيارة */}
      <div>
        <input placeholder="اسم السيارة" onChange={(e) => setName(e.target.value)} />
        <input placeholder="السعر" onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="رابط الصورة" onChange={(e) => setImage(e.target.value)} />

        <button onClick={addCar}>➕ إضافة سيارة</button>
      </div>

      <hr />

      {/* عرض السيارات */}
      {cars.map((car) => (
        <div key={car.id} style={{ margin: 10 }}>
          <h3>{car.name}</h3>
          <p>{car.price} ريال</p>

          <button onClick={() => deleteCar(car.id)}>
            ❌ حذف
          </button>
        </div>
      ))}
    </div>
  );
}