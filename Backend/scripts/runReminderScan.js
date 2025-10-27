import "dotenv/config";

process.env.TWILIO_ACCOUNT_SID ||= "test-account";
process.env.TWILIO_AUTH_TOKEN ||= "test-token";
process.env.TWILIO_WHATSAPP_FROM ||= "whatsapp:+14155238886";
process.env.WHATSAPP_TEST_MODE = "true";

const { connectDB } = await import("../src/config/db.js");
await import("../src/models/User.js");
await import("../src/models/Service.js");
await import("../src/models/Booking.js");
const { runBookingReminderScan } = await import(
  "../src/jobs/bookingReminderJob.js"
);

const main = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set in the environment");
  }

  await connectDB(mongoUri);

  const result = await runBookingReminderScan();
  console.info("Reminder scan result:", JSON.stringify(result, null, 2));

  process.exit(0);
};

main().catch((error) => {
  console.error("Reminder scan failed", error);
  process.exit(1);
});
