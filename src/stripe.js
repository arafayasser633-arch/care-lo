import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51TFJzC5fYQMP9JMiRAhjhwD0XMZqf6yHvZpmso9lKbIPGzq5qat2v6KRHMXSQmPa0phvMGK1PZA9wLalTu9urGru005p0ZDEhy"
);