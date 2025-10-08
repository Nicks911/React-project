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

## Models

Implemented with Mongoose:

- User, Staff, Category, Service, Booking, Transaction, Review, BlogPost, GalleryItem, Coupon, Settings, Notification

You can add routes/controllers as needed. This project focuses on data modeling per the provided requirements.
