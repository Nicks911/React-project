# Flower Beauty Salon - Backend (Express + Mongoose)

This backend provides MongoDB data models and a minimal Express server to support the salon app.

## Prerequisites

- Node.js 18+
- MongoDB local (or Docker) or MongoDB Atlas

## Setup

1. Copy env file:
   - Duplicate `.env.example` to `.env` and update values.
2. Install dependencies:
   - From the `server` folder run `npm install`.
3. Run MongoDB:
   - Local MongoDB or use Docker: `docker compose up -d`.
4. Seed initial data:
   - `npm run seed`
5. Start dev server:
   - `npm run dev`

Server defaults to http://localhost:4000 and exposes `/health`.

## WhatsApp Booking Reminders

Automated WhatsApp reminders are sent 3 days before a confirmed booking.

Configure the following environment variables in your `.env` file to enable the integration:

- `TWILIO_ACCOUNT_SID` – Twilio account SID with WhatsApp access.
- `TWILIO_AUTH_TOKEN` – Twilio auth token.
- `TWILIO_WHATSAPP_FROM` – WhatsApp-enabled Twilio number (e.g. `whatsapp:+14155238886`).
- `WHATSAPP_TEST_MODE` – Set to `true` to log messages locally without calling Twilio.
- `BOOKING_REMINDER_CRON` – (Optional) Cron expression for the daily reminder job. Defaults to `0 9 * * *` (09:00 daily).
- `BOOKING_REMINDER_TZ` – (Optional) Timezone identifier for the cron job. Defaults to `Asia/Jakarta`.

After the server boots and connects to MongoDB it schedules the reminder job and immediately scans for bookings occurring exactly three days ahead. Bookings without a WhatsApp-capable number are skipped and logged for follow-up.

## Models

Implemented with Mongoose:

- User, Staff, Category, Service, Booking, Transaction, Review, BlogPost, GalleryItem, Coupon, Settings, Notification

You can add routes/controllers as needed. This project focuses on data modeling per the provided requirements.
