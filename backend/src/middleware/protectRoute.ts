import jwt from "jsonwebtoken";
import { User } from "../models/model.user";
import { ENV_VARS } from "../config/envVars";
import { Request, Response, NextFunction } from "express";

// Define an interface for the decoded JWT token
interface JwtPayload {
  userId: string;
}

// Extend the Request type to include the user property
interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protectRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Get the token from cookies
    const token = req.cookies["user-jwt"];

    // If no token is provided
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET) as JwtPayload;

    // If the token is invalid
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    // Find the user by ID and exclude the password field
    const user = await User.findById(decoded.userId).select("-password");

    // If the user is not found
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;

    // Call the next middleware
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
