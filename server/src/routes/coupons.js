import express from "express";
import { isValidObjectId } from "mongoose";
import Coupon from "../models/Coupon.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";
import {
  buildCouponPayload,
  buildCouponsResponse,
} from "../utils/serializers.js";

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("admin"));

const parseBoolean = (value) => {
  if (value === undefined) return undefined;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return undefined;
};

const normalizeCode = (code) => {
  if (code === undefined || code === null) {
    return undefined;
  }

  const normalized = code.toString().trim();
  return normalized ? normalized.toUpperCase() : undefined;
};

router.get("/", async (req, res) => {
  try {
    const { search, discountType, isActive, expired } = req.query;

    const andConditions = [];

    if (search) {
      const regex = new RegExp(search, "i");
      andConditions.push({ $or: [{ code: regex }, { description: regex }] });
    }

    if (discountType && ["percent", "fixed"].includes(discountType)) {
      andConditions.push({ discountType });
    }

    const activeFilter = parseBoolean(isActive);
    if (typeof activeFilter === "boolean") {
      andConditions.push({ isActive: activeFilter });
    }

    if (typeof expired === "string") {
      const isExpired = expired.toLowerCase() === "true";
      const now = new Date();
      if (isExpired) {
        andConditions.push({ endDate: { $lt: now } });
      } else {
        andConditions.push({
          $or: [
            { endDate: { $gte: now } },
            { endDate: { $exists: false } },
            { endDate: null },
          ],
        });
      }
    }

    const query = andConditions.length ? { $and: andConditions } : {};

    const coupons = await Coupon.find(query).sort({ createdAt: -1 });

    res.json({
      coupons: buildCouponsResponse(coupons),
      total: coupons.length,
    });
  } catch (error) {
    console.error("Failed to fetch coupons", error);
    res.status(500).json({ message: "Failed to fetch coupons" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      code,
      description,
      discountType,
      amount,
      minSpend,
      startDate,
      endDate,
      usageLimit,
      isActive,
      serviceIds,
      categoryIds,
      usedCount,
    } = req.body;

    const normalizedCode = normalizeCode(code);

    if (!normalizedCode || !discountType || amount === undefined) {
      return res.status(400).json({
        message: "Code, discount type, and amount are required",
      });
    }

    if (!["percent", "fixed"].includes(discountType)) {
      return res.status(400).json({ message: "Invalid discount type" });
    }

    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    let numericMinSpend = 0;
    if (minSpend !== undefined && minSpend !== null && minSpend !== "") {
      numericMinSpend = Number(minSpend);
      if (Number.isNaN(numericMinSpend) || numericMinSpend < 0) {
        return res
          .status(400)
          .json({ message: "Minimum spend must be a positive number" });
      }
    }

    let numericUsageLimit;
    if (usageLimit !== undefined && usageLimit !== null && usageLimit !== "") {
      numericUsageLimit = Number(usageLimit);
      if (Number.isNaN(numericUsageLimit) || numericUsageLimit < 0) {
        return res
          .status(400)
          .json({ message: "Usage limit must be a positive number" });
      }
    }

    let numericUsedCount = 0;
    if (usedCount !== undefined && usedCount !== null && usedCount !== "") {
      numericUsedCount = Number(usedCount);
      if (Number.isNaN(numericUsedCount) || numericUsedCount < 0) {
        return res
          .status(400)
          .json({ message: "Used count must be a positive number" });
      }
    }

    let parsedStartDate;
    if (startDate) {
      parsedStartDate = new Date(startDate);
      if (Number.isNaN(parsedStartDate.getTime())) {
        return res.status(400).json({ message: "Invalid start date" });
      }
    }

    let parsedEndDate;
    if (endDate) {
      parsedEndDate = new Date(endDate);
      if (Number.isNaN(parsedEndDate.getTime())) {
        return res.status(400).json({ message: "Invalid end date" });
      }
    }

    const existing = await Coupon.findOne({ code: normalizedCode });
    if (existing) {
      return res.status(409).json({ message: "Coupon code already exists" });
    }

    const coupon = await Coupon.create({
      code: normalizedCode,
      description,
      discountType,
      amount: numericAmount,
      minSpend: numericMinSpend,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      usageLimit: numericUsageLimit,
      usedCount: numericUsedCount,
      isActive: typeof isActive === "boolean" ? isActive : true,
      serviceIds: Array.isArray(serviceIds) ? serviceIds : [],
      categoryIds: Array.isArray(categoryIds) ? categoryIds : [],
    });

    res.status(201).json({ coupon: buildCouponPayload(coupon) });
  } catch (error) {
    console.error("Failed to create coupon", error);
    res.status(500).json({ message: "Failed to create coupon" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid coupon id" });
    }

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    const {
      code,
      description,
      discountType,
      amount,
      minSpend,
      startDate,
      endDate,
      usageLimit,
      isActive,
      serviceIds,
      categoryIds,
      usedCount,
    } = req.body;

    if (code) {
      const normalizedCode = normalizeCode(code);
      if (!normalizedCode) {
        return res.status(400).json({ message: "Invalid coupon code" });
      }
      if (normalizedCode !== coupon.code) {
        const exists = await Coupon.findOne({
          code: normalizedCode,
          _id: { $ne: id },
        });
        if (exists) {
          return res
            .status(409)
            .json({ message: "Coupon code already exists" });
        }
        coupon.code = normalizedCode;
      }
    }

    if (description !== undefined) {
      coupon.description = description;
    }

    if (discountType) {
      if (!["percent", "fixed"].includes(discountType)) {
        return res.status(400).json({ message: "Invalid discount type" });
      }
      coupon.discountType = discountType;
    }

    if (amount !== undefined) {
      const numericAmount = Number(amount);
      if (Number.isNaN(numericAmount) || numericAmount <= 0) {
        return res
          .status(400)
          .json({ message: "Amount must be a positive number" });
      }
      coupon.amount = numericAmount;
    }

    if (minSpend !== undefined) {
      const numericMinSpend = Number(minSpend);
      if (Number.isNaN(numericMinSpend) || numericMinSpend < 0) {
        return res
          .status(400)
          .json({ message: "Minimum spend must be a positive number" });
      }
      coupon.minSpend = numericMinSpend;
    }

    if (startDate !== undefined) {
      if (!startDate) {
        coupon.startDate = null;
      } else {
        const date = new Date(startDate);
        if (Number.isNaN(date.getTime())) {
          return res.status(400).json({ message: "Invalid start date" });
        }
        coupon.startDate = date;
      }
    }

    if (endDate !== undefined) {
      if (!endDate) {
        coupon.endDate = null;
      } else {
        const date = new Date(endDate);
        if (Number.isNaN(date.getTime())) {
          return res.status(400).json({ message: "Invalid end date" });
        }
        coupon.endDate = date;
      }
    }

    if (usageLimit !== undefined) {
      const numericUsage = Number(usageLimit);
      if (Number.isNaN(numericUsage) || numericUsage < 0) {
        return res
          .status(400)
          .json({ message: "Usage limit must be a positive number" });
      }
      coupon.usageLimit = numericUsage;
    }

    if (usedCount !== undefined) {
      const numericUsedCount = Number(usedCount);
      if (Number.isNaN(numericUsedCount) || numericUsedCount < 0) {
        return res
          .status(400)
          .json({ message: "Used count must be a positive number" });
      }
      coupon.usedCount = numericUsedCount;
    }

    if (isActive !== undefined) {
      const parsed = parseBoolean(isActive);
      if (typeof parsed === "boolean") {
        coupon.isActive = parsed;
      }
    }

    if (Array.isArray(serviceIds)) {
      coupon.serviceIds = serviceIds;
    }

    if (Array.isArray(categoryIds)) {
      coupon.categoryIds = categoryIds;
    }

    await coupon.save();

    res.json({ coupon: buildCouponPayload(coupon) });
  } catch (error) {
    console.error("Failed to update coupon", error);
    res.status(500).json({ message: "Failed to update coupon" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid coupon id" });
    }

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    await coupon.deleteOne();

    res.json({ message: "Coupon deleted" });
  } catch (error) {
    console.error("Failed to delete coupon", error);
    res.status(500).json({ message: "Failed to delete coupon" });
  }
});

export default router;
