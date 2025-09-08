import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

//request interface to include user data
declare global {
  namespace Express {
    interface Request {
      user?: {
        userID: string;
        email: string;
        role: string;
      };
    }
  }
}

//auth middleware
export const authtoken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "access token required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    //verify user in database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }

    req.user = {
      userID: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(403).json({ error: "invalid or expaired token" });
  }
};

//admin verify middleware
export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ error: "auth required" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "admin access required" });
  }

  next();
};



export const requireAdmin = [authtoken, verifyAdmin];
