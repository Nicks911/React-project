/* eslint-env node */
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import couponsRouter from "./routes/coupons.js";
import bookingsRouter from "./routes/bookings.js";
import transactionsRouter from "./routes/transactions.js";
import servicesRouter from "./routes/services.js";
import {
  runBookingReminderScan,
  startBookingReminderJob,
} from "./jobs/bookingReminderJob.js";

// Load env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// Middlewares
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/coupons", couponsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/services", servicesRouter);

// Health route
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Connect DB and start server
const start = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    await connectDB(uri);
    console.log("MongoDB connected");

    startBookingReminderJob();
    // Fire once on startup so newly deployed instances process pending reminders
    runBookingReminderScan().catch((error) =>
      console.error("Initial booking reminder scan failed", error)
    );

    app.listen(PORT, () =>
      console.log(`Server listening on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
};

start();
