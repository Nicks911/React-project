/* eslint-env node */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Service from "../models/Service.js";
import Settings from "../models/Settings.js";
import bcrypt from "bcryptjs";

dotenv.config();

const run = async () => {
  const uri = process.env.MONGODB_URI;
  await connectDB(uri);

  console.log("Seeding database...");

  // Clear minimal sets (non-destructive warning)
  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Service.deleteMany({}),
    Settings.deleteMany({}),
  ]);

  const adminPassword = await bcrypt.hash("Admin@123", 10);
  await User.create({
    fullName: "Admin",
    email: "admin@example.com",
    phone: "0800000000",
    passwordHash: adminPassword,
    role: "admin",
  });

  const categories = await Category.insertMany([
    { name: "Haircut", description: "Layanan potong rambut" },
    { name: "Creambath", description: "Perawatan rambut" },
    { name: "Coloring", description: "Warna rambut" },
    { name: "Styling", description: "Penataan rambut" },
  ]);

  const [haircut, creambath] = categories;

  await Service.insertMany([
    {
      name: "Classic Haircut",
      category: haircut._id,
      description: "Potong rambut klasik",
      priceMin: 50000,
      priceMax: 80000,
      durationMinutes: 45,
      benefits: ["Tampilan rapi", "Nyaman"],
      featured: true,
    },
    {
      name: "Premium Creambath",
      category: creambath._id,
      description: "Creambath premium untuk kesehatan rambut",
      priceMin: 90000,
      priceMax: 150000,
      durationMinutes: 60,
      benefits: ["Nutrisi rambut", "Relaksasi"],
      featured: true,
    },
  ]);

  const stylistPassword = await bcrypt.hash("Stylist@123", 10);
  await User.create({
    fullName: "Sari Stylist",
    email: "sari@example.com",
    phone: "081200000001",
    passwordHash: stylistPassword,
    role: "admin",
    staffProfile: {
      bio: "Senior stylist dengan pengalaman 8 tahun",
      skills: ["Haircut", "Coloring"],
      specialties: ["Bob cut", "Layered"],
      availability: [
        { dayOfWeek: 1, start: "09:00", end: "17:00" },
        { dayOfWeek: 3, start: "09:00", end: "17:00" },
        { dayOfWeek: 5, start: "09:00", end: "17:00" },
      ],
      commissionRate: 10,
    },
  });

  await Settings.create({
    general: {
      businessName: "Flower Beauty Salon",
      address: "Jl. Mawar No. 1, Jakarta",
      phone: "+62-812-0000-0000",
      email: "contact@flowerbeauty.com",
      social: { instagram: "flowerbeauty", facebook: "flowerbeauty" },
      hours: [
        { day: "Senin-Jumat", open: "09:00", close: "18:00" },
        { day: "Sabtu-Minggu", open: "10:00", close: "17:00" },
      ],
      statistics: { yearsExperience: 20, happyCustomers: 10000 },
    },
    booking: {
      dpType: "percent",
      dpAmount: 20,
      leadTimeDays: 1,
      cancellationPolicy: "Pembatalan H-1, DP hangus",
      slotDurationMinutes: 30,
    },
    payment: {
      gateways: [
        { name: "OVO", active: true },
        { name: "GoPay", active: true },
        { name: "CreditCard", active: false },
      ],
      activeMethods: ["e-wallet", "bank-transfer"],
    },
    notifications: {
      templates: {
        email: {
          reminder: "Jangan lupa appointment Anda besok!",
          confirmation: "Booking Anda telah dikonfirmasi.",
        },
        whatsapp: {
          reminder: "Reminder booking H-1",
          confirmation: "Konfirmasi booking",
        },
      },
      reminderScheduleDays: [7, 1],
    },
    appearance: {
      themeColor: "#E91E63",
      logoUrl: "",
      faviconUrl: "",
      seo: {
        title: "Flower Beauty Salon",
        description: "Salon profesional",
        keywords: ["salon", "kecantikan"],
      },
    },
  });

  console.log("Seeding completed. Admin login: admin@example.com / Admin@123");
  await mongoose.connection.close();
};

run().catch(async (e) => {
  console.error(e);
  await mongoose.connection.close();
  process.exit(1);
});
