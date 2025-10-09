import express from "express";
import { isValidObjectId } from "mongoose";
import Service from "../models/Service.js";
import Category from "../models/Category.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";
import {
  buildCategoryPayload,
  buildServicePayload,
  buildServicesResponse,
  buildServiceStats,
} from "../utils/serializers.js";

const router = express.Router();

const normalizeBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const lowered = value.toLowerCase();
    if (["true", "1", "yes"].includes(lowered)) return true;
    if (["false", "0", "no"].includes(lowered)) return false;
  }
  return undefined;
};

const parseNumber = (value) => {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const parseBenefits = (benefits) => {
  if (!benefits) return [];
  if (Array.isArray(benefits)) {
    return benefits
      .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
      .filter((entry) => entry.length > 0);
  }
  if (typeof benefits === "string") {
    return benefits
      .split(",")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);
  }
  return [];
};

const ensureCategoryExists = async (categoryId) => {
  if (!categoryId) return null;
  if (!isValidObjectId(categoryId)) {
    const error = new Error("Invalid category id");
    error.status = 400;
    throw error;
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    const error = new Error("Category not found");
    error.status = 404;
    throw error;
  }
  return category;
};

const buildFilter = ({ search, categoryId, status, featured }) => {
  const filter = {};

  if (search) {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [{ name: regex }, { description: regex }];
  }

  if (categoryId && isValidObjectId(categoryId)) {
    filter.category = categoryId;
  }

  if (status === "active") {
    filter.active = true;
  } else if (status === "inactive") {
    filter.active = false;
  }

  if (featured !== undefined) {
    const parsed = normalizeBoolean(featured);
    if (parsed !== undefined) {
      filter.featured = parsed;
    }
  }

  return filter;
};

const handleServiceError = (res, error, fallbackMessage) => {
  const status = error?.status || 500;
  const message = error?.message || fallbackMessage;
  if (status >= 500) {
    console.error(fallbackMessage, error);
  }
  res.status(status).json({ message });
};

router.use(authenticate);
router.use(authorizeRoles("admin"));

router.get("/", async (req, res) => {
  try {
    const { search, categoryId, status, featured } = req.query;
    const filter = buildFilter({ search, categoryId, status, featured });

    const services = await Service.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    const categories = await Category.find({}).sort({ name: 1 });

    res.json({
      services: buildServicesResponse(services),
      stats: buildServiceStats(services),
      categories: categories.map((category) => buildCategoryPayload(category)),
    });
  } catch (error) {
    handleServiceError(res, error, "Failed to fetch services");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid service id" });
    }

    const service = await Service.findById(id).populate(
      "category",
      "name slug"
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ service: buildServicePayload(service) });
  } catch (error) {
    handleServiceError(res, error, "Failed to fetch service");
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      categoryId,
      description,
      priceMin,
      priceMax,
      durationMinutes,
      benefits,
      featured,
      active,
    } = req.body || {};

    if (!name) {
      return res.status(400).json({ message: "Service name is required" });
    }

    const minPrice = parseNumber(priceMin);
    const maxPrice = parseNumber(priceMax);
    const duration = parseNumber(durationMinutes);

    if (minPrice === undefined || maxPrice === undefined) {
      return res
        .status(400)
        .json({ message: "priceMin and priceMax must be valid numbers" });
    }

    if (minPrice < 0 || maxPrice < 0) {
      return res.status(400).json({ message: "Price must be positive" });
    }

    if (maxPrice < minPrice) {
      return res
        .status(400)
        .json({
          message: "priceMax must be greater than or equal to priceMin",
        });
    }

    if (duration === undefined || duration <= 0) {
      return res
        .status(400)
        .json({ message: "durationMinutes must be a positive number" });
    }

    let category;
    if (categoryId) {
      category = await ensureCategoryExists(categoryId);
    }

    const created = await Service.create({
      name,
      category: category?._id ?? categoryId ?? undefined,
      description: description?.trim?.() || undefined,
      priceMin: minPrice,
      priceMax: maxPrice,
      durationMinutes: duration,
      benefits: parseBenefits(benefits),
      featured: normalizeBoolean(featured) ?? false,
      active: normalizeBoolean(active) ?? true,
    });

    await created.populate("category", "name slug");

    res.status(201).json({ service: buildServicePayload(created) });
  } catch (error) {
    handleServiceError(res, error, "Failed to create service");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid service id" });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const {
      name,
      categoryId,
      description,
      priceMin,
      priceMax,
      durationMinutes,
      benefits,
      featured,
      active,
    } = req.body || {};

    if (name) {
      service.name = name;
    }

    if (categoryId !== undefined) {
      if (!categoryId) {
        service.category = undefined;
      } else {
        const category = await ensureCategoryExists(categoryId);
        service.category = category._id;
      }
    }

    if (description !== undefined) {
      service.description = description?.trim?.() || undefined;
    }

    if (priceMin !== undefined || priceMax !== undefined) {
      const minPrice = parseNumber(priceMin ?? service.priceMin);
      const maxPrice = parseNumber(priceMax ?? service.priceMax);

      if (minPrice === undefined || maxPrice === undefined) {
        return res
          .status(400)
          .json({ message: "priceMin and priceMax must be valid numbers" });
      }

      if (minPrice < 0 || maxPrice < 0) {
        return res.status(400).json({ message: "Price must be positive" });
      }

      if (maxPrice < minPrice) {
        return res
          .status(400)
          .json({
            message: "priceMax must be greater than or equal to priceMin",
          });
      }

      service.priceMin = minPrice;
      service.priceMax = maxPrice;
    }

    if (durationMinutes !== undefined) {
      const duration = parseNumber(durationMinutes);
      if (duration === undefined || duration <= 0) {
        return res
          .status(400)
          .json({ message: "durationMinutes must be a positive number" });
      }
      service.durationMinutes = duration;
    }

    if (benefits !== undefined) {
      service.benefits = parseBenefits(benefits);
    }

    if (featured !== undefined) {
      const parsed = normalizeBoolean(featured);
      if (parsed !== undefined) {
        service.featured = parsed;
      }
    }

    if (active !== undefined) {
      const parsed = normalizeBoolean(active);
      if (parsed !== undefined) {
        service.active = parsed;
      }
    }

    await service.save();
    await service.populate("category", "name slug");

    res.json({ service: buildServicePayload(service) });
  } catch (error) {
    handleServiceError(res, error, "Failed to update service");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid service id" });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.deleteOne();

    res.json({ message: "Service deleted" });
  } catch (error) {
    handleServiceError(res, error, "Failed to delete service");
  }
});

export default router;
