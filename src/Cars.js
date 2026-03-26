const bookCar = async (car) => {
  try {
    const res = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ car }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // تحويل لصفحة الدفع Stripe
    } else {
      alert("حدث خطأ في الدفع");
    }
  } catch (error) {
    alert(error.message);
  }
};