// server/src/services/auth.ts
import type { Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

const secretKey = process.env.JWT_SECRET_KEY || "";

/**
 * Apollo context function: extracts JWT from headers
 */
export const authMiddleware = (req: Request): { user?: JwtPayload } => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return {};

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, secretKey) as JwtPayload;
    return { user };
  } catch {
    return {};
  }
};

/**
 * Signs a new JWT
 */
export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id } as JwtPayload;
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};
