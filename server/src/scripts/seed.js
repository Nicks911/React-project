/* eslint-env node */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Service from "../models/Service.js";
import Coupon from "../models/Coupon.js";
import GalleryItem from "../models/GalleryItem.js";
import Booking from "../models/Booking.js";
import Transaction from "../models/Transaction.js";
import Review from "../models/Review.js";
import Notification from "../models/Notification.js";
import BlogPost from "../models/BlogPost.js";
import Settings from "../models/Settings.js";
import bcrypt from "bcryptjs";

dotenv.config();

const addDays = (date, days) =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

const toSlotDate = (date) => date.toISOString().split("T")[0];

const run = async () => {
  const uri = process.env.MONGODB_URI;
  await connectDB(uri);

  console.log("Seeding database...");

  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Service.deleteMany({}),
    Coupon.deleteMany({}),
    GalleryItem.deleteMany({}),
    Booking.deleteMany({}),
    Transaction.deleteMany({}),
    Review.deleteMany({}),
    Notification.deleteMany({}),
    BlogPost.deleteMany({}),
    Settings.deleteMany({}),
  ]);

  const [adminPassword, stylistPassword, customerPassword] = await Promise.all([
    bcrypt.hash("Admin@123", 10),
    bcrypt.hash("Stylist@123", 10),
    bcrypt.hash("Customer@123", 10),
  ]);

  const users = await User.insertMany(
    [
      {
        fullName: "Admin",
        email: "admin@example.com",
        phone: "0800000000",
        passwordHash: adminPassword,
        role: "admin",
      },
      {
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
      },
      {
        fullName: "Andi Pratama",
        email: "andi@example.com",
        phone: "081200000002",
        passwordHash: customerPassword,
        loyaltyPoints: 120,
      },
      {
        fullName: "Bella Sari",
        email: "bella@example.com",
        phone: "081200000003",
        passwordHash: customerPassword,
        loyaltyPoints: 80,
      },
      {
        fullName: "Carla Putri",
        email: "carla@example.com",
        phone: "081200000004",
        passwordHash: customerPassword,
        loyaltyPoints: 95,
      },
      {
        fullName: "Dimas Rangga",
        email: "dimas@example.com",
        phone: "081200000005",
        passwordHash: customerPassword,
        loyaltyPoints: 40,
      },
      {
        fullName: "Eka Lestari",
        email: "eka@example.com",
        phone: "081200000006",
        passwordHash: customerPassword,
        loyaltyPoints: 65,
      },
    ],
    { ordered: true }
  );

  const [
    ,
    stylistUser,
    customerAndi,
    customerBella,
    customerCarla,
    customerDimas,
    customerEka,
  ] = users;

  const categories = await Category.insertMany(
    [
      { name: "Haircut", description: "Layanan potong rambut" },
      { name: "Coloring", description: "Pilihan warna dan highlight rambut" },
      { name: "Treatment", description: "Perawatan rambut dan kulit" },
      { name: "Styling", description: "Penataan rambut profesional" },
      { name: "Makeup", description: "Layanan makeup untuk berbagai acara" },
    ],
    { ordered: true }
  );

  const categoryByName = Object.fromEntries(
    categories.map((category) => [category.name, category])
  );

  const services = await Service.insertMany(
    [
      {
        name: "Classic Haircut",
        category: categoryByName.Haircut._id,
        description: "Potong rambut klasik untuk tampilan rapi",
        priceMin: 50000,
        priceMax: 80000,
        durationMinutes: 45,
        benefits: ["Tampilan rapi", "Perawatan ujung rambut"],
        featured: true,
      },
      {
        name: "Luxury Coloring",
        category: categoryByName.Coloring._id,
        description: "Warna rambut premium dengan teknik balayage",
        priceMin: 250000,
        priceMax: 450000,
        durationMinutes: 120,
        benefits: ["Warna tahan lama", "Rambut tetap sehat"],
        featured: true,
      },
      {
        name: "Rejuvenating Facial",
        category: categoryByName.Treatment._id,
        description: "Perawatan wajah untuk kulit bercahaya",
        priceMin: 180000,
        priceMax: 250000,
        durationMinutes: 75,
        benefits: ["Kulit halus", "Relaksasi"],
      },
      {
        name: "Elegant Updo Styling",
        category: categoryByName.Styling._id,
        description: "Tatanan rambut updo elegan untuk acara spesial",
        priceMin: 200000,
        priceMax: 320000,
        durationMinutes: 90,
        benefits: ["Tahan lama", "Sesuai bentuk wajah"],
      },
      {
        name: "Evening Makeup Glam",
        category: categoryByName.Makeup._id,
        description: "Makeup glamor untuk malam hari",
        priceMin: 220000,
        priceMax: 350000,
        durationMinutes: 95,
        benefits: ["Makeup tahan lama", "Highlight fitur terbaik"],
      },
    ],
    { ordered: true }
  );

  const serviceByName = Object.fromEntries(
    services.map((service) => [service.name, service])
  );

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

  const now = new Date();

  await Coupon.insertMany(
    [
      {
        code: "WELCOME20",
        description: "Diskon 20% untuk pelanggan baru",
        discountType: "percent",
        amount: 20,
        minSpend: 150000,
        startDate: addDays(now, -7),
        endDate: addDays(now, 60),
        usageLimit: 200,
        categoryIds: [categoryByName.Haircut._id],
        isActive: true,
      },
      {
        code: "GLOWUP50",
        description: "Potongan Rp50.000 untuk perawatan wajah",
        discountType: "fixed",
        amount: 50000,
        minSpend: 200000,
        startDate: addDays(now, -3),
        endDate: addDays(now, 45),
        usageLimit: 150,
        serviceIds: [serviceByName["Rejuvenating Facial"]._id],
        isActive: true,
      },
      {
        code: "COLORPOP15",
        description: "Diskon 15% khusus layanan coloring",
        discountType: "percent",
        amount: 15,
        minSpend: 250000,
        startDate: now,
        endDate: addDays(now, 90),
        usageLimit: 120,
        categoryIds: [categoryByName.Coloring._id],
      },
      {
        code: "STYLE25K",
        description: "Diskon Rp25.000 untuk styling updo",
        discountType: "fixed",
        amount: 25000,
        minSpend: 150000,
        startDate: addDays(now, -14),
        endDate: addDays(now, 30),
        usageLimit: 180,
        serviceIds: [serviceByName["Elegant Updo Styling"]._id],
      },
      {
        code: "MAKEUP10",
        description: "Diskon 10% untuk paket makeup malam",
        discountType: "percent",
        amount: 10,
        minSpend: 200000,
        startDate: addDays(now, -1),
        endDate: addDays(now, 75),
        usageLimit: 90,
        serviceIds: [serviceByName["Evening Makeup Glam"]._id],
      },
    ],
    { ordered: true }
  );

  await GalleryItem.insertMany(
    [
      {
        imageUrl:
          "https://res.cloudinary.com/demo/image/upload/v1700000000/salon/haircut1.jpg",
        caption: "Transformasi potong rambut klasik",
        categories: ["Haircut"],
        type: "single",
      },
      {
        imageUrl:
          "https://res.cloudinary.com/demo/image/upload/v1700000000/salon/coloring1.jpg",
        caption: "Teknik balayage honey brown",
        categories: ["Coloring"],
        type: "single",
      },
      {
        caption: "Makeover styling sebelum & sesudah",
        categories: ["Styling"],
        type: "before-after",
        beforeUrl:
          "https://res.cloudinary.com/demo/image/upload/v1700000000/salon/before-styling.jpg",
        afterUrl:
          "https://res.cloudinary.com/demo/image/upload/v1700000000/salon/after-styling.jpg",
      },
      {
        imageUrl:
          "https://res.cloudinary.com/demo/image/upload/v1700000000/salon/makeup1.jpg",
        caption: "Makeup glamor untuk pesta malam",
        categories: ["Makeup"],
      },
      {
        imageUrl:
          "https://res.cloudinary.com/demo/image/upload/v1700000000/salon/facial1.jpg",
        caption: "Perawatan facial untuk kulit sehat",
        categories: ["Treatment"],
      },
    ],
    { ordered: true }
  );

  const buildBooking = ({
    customer,
    servicesSelected,
    offsetDays,
    hour,
    minute = 0,
    status = "pending",
    paymentStatus = "pending",
    paymentMethod = "e-wallet",
    notes,
    adminNotes,
  }) => {
    const base = new Date();
    const startTime = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate() + offsetDays,
      hour,
      minute
    );

    let totalDuration = 0;
    const servicesPayload = servicesSelected.map(({ service, price }) => {
      totalDuration += service.durationMinutes;
      return {
        service: service._id,
        name: service.name,
        price,
        durationMinutes: service.durationMinutes,
      };
    });

    const totalAmount = servicesSelected.reduce(
      (sum, item) => sum + item.price,
      0
    );
    const endTime = new Date(startTime.getTime() + totalDuration * 60000);

    return {
      user: customer._id,
      services: servicesPayload,
      stylist: stylistUser._id,
      startTime,
      endTime,
      status,
      notes,
      adminNotes,
      slot: { date: toSlotDate(startTime) },
      payment: {
        method: paymentMethod,
        dpAmount: Math.round(totalAmount * 0.2),
        totalAmount,
        status: paymentStatus,
        invoiceNo: `INV-${startTime.getTime()}`,
        reference: `PAY-${startTime.getTime()}`,
      },
    };
  };

  const bookingSeeds = [
    buildBooking({
      customer: customerAndi,
      servicesSelected: [
        { service: serviceByName["Classic Haircut"], price: 75000 },
      ],
      offsetDays: 1,
      hour: 10,
      status: "confirmed",
      paymentStatus: "paid",
      paymentMethod: "e-wallet",
      notes: "Mohon potong tipis di sisi",
    }),
    buildBooking({
      customer: customerBella,
      servicesSelected: [
        { service: serviceByName["Luxury Coloring"], price: 425000 },
      ],
      offsetDays: 2,
      hour: 14,
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "bank-transfer",
      notes: "Ingin warna caramel highlight",
    }),
    buildBooking({
      customer: customerCarla,
      servicesSelected: [
        { service: serviceByName["Elegant Updo Styling"], price: 300000 },
        { service: serviceByName["Evening Makeup Glam"], price: 320000 },
      ],
      offsetDays: 3,
      hour: 9,
      status: "confirmed",
      paymentStatus: "paid",
      paymentMethod: "credit-card",
      notes: "Persiapan wedding reception",
      adminNotes: "Pastikan hadir 15 menit sebelum jadwal",
    }),
    buildBooking({
      customer: customerDimas,
      servicesSelected: [
        { service: serviceByName["Rejuvenating Facial"], price: 220000 },
      ],
      offsetDays: -1,
      hour: 11,
      status: "completed",
      paymentStatus: "paid",
      paymentMethod: "cash",
      notes: "Kulit agak sensitif",
    }),
    buildBooking({
      customer: customerEka,
      servicesSelected: [
        { service: serviceByName["Classic Haircut"], price: 68000 },
      ],
      offsetDays: -2,
      hour: 16,
      status: "cancelled",
      paymentStatus: "refunded",
      paymentMethod: "e-wallet",
      notes: "Jadwal bentrok, minta rebook",
      adminNotes: "DP dikembalikan penuh",
    }),
  ];

  const bookings = await Booking.insertMany(bookingSeeds, { ordered: true });

  await Transaction.insertMany(
    [
      {
        booking: bookings[0]._id,
        user: customerAndi._id,
        amount: bookingSeeds[0].payment.totalAmount,
        method: bookingSeeds[0].payment.method,
        status: "paid",
        reference: "TX-001",
        metadata: { couponCode: "WELCOME20" },
      },
      {
        booking: bookings[1]._id,
        user: customerBella._id,
        amount: bookingSeeds[1].payment.totalAmount,
        method: bookingSeeds[1].payment.method,
        status: "pending",
        reference: "TX-002",
      },
      {
        booking: bookings[2]._id,
        user: customerCarla._id,
        amount: bookingSeeds[2].payment.totalAmount,
        method: bookingSeeds[2].payment.method,
        status: "paid",
        reference: "TX-003",
        metadata: { couponCode: "MAKEUP10" },
      },
      {
        booking: bookings[3]._id,
        user: customerDimas._id,
        amount: bookingSeeds[3].payment.totalAmount,
        method: bookingSeeds[3].payment.method,
        status: "paid",
        reference: "TX-004",
      },
      {
        booking: bookings[4]._id,
        user: customerEka._id,
        amount: bookingSeeds[4].payment.totalAmount,
        method: bookingSeeds[4].payment.method,
        status: "refunded",
        reference: "TX-005",
      },
    ],
    { ordered: true }
  );

  await Review.insertMany(
    [
      {
        user: customerAndi._id,
        booking: bookings[0]._id,
        service: serviceByName["Classic Haircut"]._id,
        rating: 5,
        comment: "Stylist sangat teliti dan ramah!",
      },
      {
        user: customerBella._id,
        booking: bookings[1]._id,
        service: serviceByName["Luxury Coloring"]._id,
        rating: 4,
        comment: "Warna bagus, menunggu konfirmasi pembayaran",
      },
      {
        user: customerCarla._id,
        booking: bookings[2]._id,
        service: serviceByName["Evening Makeup Glam"]._id,
        rating: 5,
        comment: "Makeup bertahan sampai acara selesai",
      },
      {
        user: customerDimas._id,
        booking: bookings[3]._id,
        service: serviceByName["Rejuvenating Facial"]._id,
        rating: 5,
        comment: "Kulit terasa sangat segar",
      },
      {
        user: customerEka._id,
        booking: bookings[4]._id,
        service: serviceByName["Classic Haircut"]._id,
        rating: 3,
        comment: "Belum sempat datang, jadwal diundur",
        approved: false,
      },
    ],
    { ordered: true }
  );

  await Notification.insertMany(
    [
      {
        user: customerAndi._id,
        type: "reminder",
        title: "Reminder appointment haircut",
        message: "Janji temu Anda besok pukul 10:00.",
        channels: ["email", "in-app"],
        booking: bookings[0]._id,
        scheduledFor: addDays(now, 0),
        sentAt: addDays(now, -1),
      },
      {
        user: customerBella._id,
        type: "booking",
        title: "Menunggu konfirmasi pembayaran",
        message: "Silakan unggah bukti transfer untuk layanan coloring.",
        channels: ["whatsapp", "in-app"],
        booking: bookings[1]._id,
        scheduledFor: addDays(now, 1),
      },
      {
        user: customerCarla._id,
        type: "system",
        title: "Konfirmasi booking berhasil",
        message: "Tim kami siap membantu Anda pada jadwal yang dipilih.",
        channels: ["email"],
        booking: bookings[2]._id,
        sentAt: addDays(now, -1),
        readAt: addDays(now, -1),
      },
      {
        user: customerDimas._id,
        type: "promo",
        title: "Promo facial bulan ini",
        message: "Dapatkan diskon 15% untuk perawatan berikutnya!",
        channels: ["email", "whatsapp"],
        sentAt: addDays(now, 0),
      },
      {
        user: customerEka._id,
        type: "booking",
        title: "Booking dibatalkan",
        message: "Booking Anda telah dibatalkan dan DP dikembalikan.",
        channels: ["email", "in-app"],
        booking: bookings[4]._id,
        sentAt: addDays(now, -1),
        readAt: addDays(now, -1),
      },
    ],
    { ordered: true }
  );

  await BlogPost.insertMany(
    [
      {
        title: "5 Tren Warna Rambut 2024",
        excerpt: "Temukan inspirasi warna rambut terbaru untuk tampil beda.",
        content:
          "Warna rambut 2024 didominasi tone hangat seperti copper, auburn, dan sandy blonde. Pelajari tips perawatan agar warna tetap cerah.",
        category: "Coloring",
        tags: ["tren", "warna", "2024"],
        status: "published",
        publishedAt: addDays(now, -10),
        seo: {
          title: "Tren Warna Rambut 2024",
          description: "Referensi warna rambut terbaru di salon kami",
          keywords: ["warna rambut", "tren rambut"],
        },
      },
      {
        title: "Rahasia Makeup Tahan Lama",
        excerpt: "Tips dari MUA profesional kami.",
        content:
          "Gunakan skincare dasar yang sesuai kulit, aplikasikan primer, dan pilih setting spray berkualitas untuk daya tahan makeup maksimal.",
        category: "Makeup",
        tags: ["makeup", "tips"],
        status: "published",
        publishedAt: addDays(now, -7),
      },
      {
        title: "Perawatan Rambut Setelah Coloring",
        excerpt: "Langkah mudah menjaga rambut tetap sehat setelah pewarnaan.",
        content:
          "Hindari shampoo dengan sulfat, gunakan masker rambut seminggu sekali, dan minimalkan penggunaan alat panas.",
        category: "Treatment",
        tags: ["perawatan", "coloring"],
        status: "published",
        publishedAt: addDays(now, -5),
      },
      {
        title: "Inspirasi Haircut untuk Wajah Bulat",
        excerpt: "Pilihan gaya rambut untuk menonjolkan fitur terbaik Anda.",
        content:
          "Layered bob, long pixie, hingga curtain bangs bisa menjadi pilihan tepat untuk wajah bulat.",
        category: "Haircut",
        tags: ["haircut", "tips"],
        status: "published",
        publishedAt: addDays(now, -3),
      },
      {
        title: "Kenapa Facial Rutin itu Penting",
        excerpt: "Manfaat perawatan wajah yang dilakukan secara berkala.",
        content:
          "Facial membantu regenerasi kulit, membersihkan pori, dan menjaga kelembapan sehingga kulit tampak cerah.",
        category: "Treatment",
        tags: ["facial", "kecantikan"],
        status: "published",
        publishedAt: addDays(now, -1),
      },
    ],
    { ordered: true }
  );

  console.log("Seeding completed.");
  console.log("Admin login: admin@example.com / Admin@123");
  console.log("Customer login sample: andi@example.com / Customer@123");

  await mongoose.connection.close();
};

run().catch(async (e) => {
  console.error(e);
  await mongoose.connection.close();
  process.exit(1);
});
