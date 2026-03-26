const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 Stripe Secret Key من .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 💳 إنشاء جلسة الدفع
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { car } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "sar",
            product_data: {
              name: car.name,
              images: [car.image],
            },
            unit_amount: car.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🚀 تشغيل السيرفر
app.listen(4242, () => {
  console.log("🚀 Server running on http://localhost:4242");
});