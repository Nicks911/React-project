import cron from "node-cron";
import dayjs from "dayjs";
import Booking from "../models/Booking.js";
import {
  formatCustomerWhatsApp,
  isWhatsAppConfigured,
  sendWhatsAppMessage,
} from "../services/whatsappService.js";

const REMINDER_CRON = process.env.BOOKING_REMINDER_CRON || "0 9 * * *";
const REMINDER_TIMEZONE = process.env.BOOKING_REMINDER_TZ || "Asia/Jakarta";
const REMINDER_STATUS_ALLOWLIST = ["confirmed", "in-progress"];

const formatServiceList = (services) => {
  if (!Array.isArray(services) || services.length === 0) {
    return "your upcoming appointment";
  }
  if (services.length === 1) {
    return services[0].name || "your service";
  }
  const names = services.map((service) => service?.name).filter(Boolean);
  if (names.length === 0) {
    return "your upcoming appointment";
  }
  if (names.length === 1) {
    return names[0];
  }
  const last = names.pop();
  return `${names.join(", ")}, and ${last}`;
};

const buildReminderMessage = (booking) => {
  const customerName = booking?.user?.fullName || "there";
  const start = dayjs(booking.startTime);
  const formattedDate = start.format("dddd, DD MMM YYYY");
  const formattedTime = start.format("HH:mm");
  const services = formatServiceList(booking.services);

  return (
    `Halo ${customerName}! Ini pengingat bahwa ${services} ` +
    `dijadwalkan pada ${formattedDate} pukul ${formattedTime}. ` +
    "Jika Anda perlu melakukan perubahan, hubungi kami segera. Sampai jumpa!"
  );
};

export const runBookingReminderScan = async () => {
  if (!isWhatsAppConfigured()) {
    console.warn("WhatsApp reminder skipped: credentials not configured");
    return { ran: false, reason: "unconfigured" };
  }

  const now = dayjs();
  const targetStart = now.add(3, "day").startOf("day");
  const targetEnd = targetStart.endOf("day");

  const query = {
    status: { $in: REMINDER_STATUS_ALLOWLIST },
    startTime: {
      $gte: targetStart.toDate(),
      $lte: targetEnd.toDate(),
    },
    $or: [
      { "reminders.threeDay.sentAt": { $exists: false } },
      { "reminders.threeDay.sentAt": null },
    ],
  };

  const bookings = await Booking.find(query)
    .populate("user", "fullName phone whatsapp email")
    .lean();

  if (bookings.length === 0) {
    return { ran: true, processed: 0 };
  }

  let processed = 0;
  const failures = [];

  for (const booking of bookings) {
    const to = formatCustomerWhatsApp(booking.user);
    if (!to) {
      failures.push({
        bookingId: booking._id,
        reason: "missing_whatsapp_number",
      });
      continue;
    }

    try {
      const message = await sendWhatsAppMessage({
        to,
        body: buildReminderMessage(booking),
      });

      await Booking.updateOne(
        { _id: booking._id },
        {
          $set: {
            "reminders.threeDay.sentAt": new Date(),
            "reminders.threeDay.messageSid": message?.sid ?? null,
          },
        }
      );

      processed += 1;
    } catch (error) {
      console.error("Failed to send booking reminder", {
        bookingId: booking._id,
        error: error.message,
      });
      failures.push({
        bookingId: booking._id,
        reason: error.message,
      });
    }
  }

  return { ran: true, processed, failures };
};

let cronJob;

export const startBookingReminderJob = () => {
  if (cronJob) {
    return cronJob;
  }

  cronJob = cron.schedule(
    REMINDER_CRON,
    () => {
      runBookingReminderScan().catch((error) => {
        console.error("Booking reminder job failed", error);
      });
    },
    {
      timezone: REMINDER_TIMEZONE,
    }
  );

  console.info(
    `Booking reminder job scheduled with cron "${REMINDER_CRON}" (${REMINDER_TIMEZONE})`
  );

  return cronJob;
};

export const stopBookingReminderJob = () => {
  if (cronJob) {
    cronJob.stop();
    cronJob = null;
  }
};
