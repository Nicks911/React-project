import jwt from "jsonwebtoken";
import User from "../models/User.js";

const extractTokenFromHeader = (headerValue) => {
  if (!headerValue || typeof headerValue !== "string") {
    return null;
  }

  const parts = headerValue.split(" ");
  if (parts.length !== 2) {
    return null;
  }

  const [scheme, token] = parts;
  if (/^Bearer$/i.test(scheme) && token) {
    return token;
  }

  return null;
};

export const authenticate = async (req, res, next) => {
  try {
    const headerToken = extractTokenFromHeader(req.headers.authorization);
    const token = headerToken;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret is not configured");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }

    req.auth = {
      token,
      payload: decoded,
    };
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication failed", error);
    if (error?.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired" });
    }
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export const authorizeRoles =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have access to this resource" });
    }

    return next();
  };

export default {
  authenticate,
  authorizeRoles,
};
