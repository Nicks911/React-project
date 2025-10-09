import "dotenv/config";
import dayjs from "dayjs";
import { connectDB } from "../src/config/db.js";
import User from "../src/models/User.js";
import Service from "../src/models/Service.js";
import Booking from "../src/models/Booking.js";

const TEST_USER_EMAIL = "reminder.test@example.com";
const TEST_SERVICE_SLUG = "reminder-test-service";
const TEST_ADMIN_NOTES = "Reminder test booking";

const ensureUser = async () => {
  let user = await User.findOne({ email: TEST_USER_EMAIL });
  if (!user) {
    user = await User.create({
      fullName: "Reminder Test User",
      email: TEST_USER_EMAIL,
      phone: "+628123000111",
      passwordHash:
        "$2a$10$z0Y8iK0Cq9WJYpGQjFzOteS6YVOZ7xP3iY80mB6xG7ZkQG6f7pKzK", // "reminder123"
      role: "customer",
      status: "active",
    });
  }
  return user;
};

const ensureService = async () => {
  let service = await Service.findOne({ slug: TEST_SERVICE_SLUG });
  if (!service) {
    service = await Service.create({
      name: "Reminder Test Service",
      slug: TEST_SERVICE_SLUG,
      priceMin: 100000,
      priceMax: 150000,
      durationMinutes: 60,
      benefits: ["Personalized styling", "Complimentary refreshments"],
      featured: false,
      active: true,
    });
  }
  return service;
};

const main = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set in the environment");
  }

  await connectDB(mongoUri);

  const user = await ensureUser();
  const service = await ensureService();

  const start = dayjs()
    .add(3, "day")
    .hour(10)
    .minute(0)
    .second(0)
    .millisecond(0);
  const end = start.add(service.durationMinutes || 60, "minute");

  const bookingPayload = {
    user: user._id,
    services: [
      {
        service: service._id,
        name: service.name,
        price: service.priceMin,
        durationMinutes: service.durationMinutes,
      },
    ],
    startTime: start.toDate(),
    endTime: end.toDate(),
    status: "confirmed",
    slot: {
      date: start.format("YYYY-MM-DD"),
    },
    payment: {
      method: "cash",
      dpAmount: 0,
      totalAmount: service.priceMin,
      status: "paid",
    },
    adminNotes: TEST_ADMIN_NOTES,
    reminders: {
      threeDay: {},
    },
  };

  const existing = await Booking.findOne({ adminNotes: TEST_ADMIN_NOTES });
  let booking;
  if (existing) {
    Object.assign(existing, bookingPayload);
    existing.reminders = { threeDay: {} };
    booking = await existing.save();
  } else {
    booking = await Booking.create(bookingPayload);
  }

  console.info(
    "Created/updated reminder test booking",
    booking._id.toString(),
    booking.startTime
  );

  process.exit(0);
};

main().catch((error) => {
  console.error("Failed to prepare reminder test data", error);
  process.exit(1);
});
