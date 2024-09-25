import express, { Request, Response, NextFunction } from "express";
import { protectRoute } from "../middleware/protectRoute";
import { IUser } from "../models/model.user";
import {User} from"../models/model.user"
import { canEditProject ,canViewProject} from "../permissions/permit";

const router = express.Router();


interface AuthenticatedRequest extends Request {
    user?: IUser;
    body: {
      userId?: string; // Assuming the projectId comes from the request body
     
    };
  }

// this route is for users
router.use("/", protectRoute, authViewusers, fetchUsers);

function authViewusers(req:AuthenticatedRequest,res:Response,next:NextFunction){

    const { userId } = req.body;

    if (!req.user  || !canViewProject(req.user, userId)) {
        res.status(401).json({ message: " search route says viewing Not Allowed" });
        return; // Early return to prevent further execution
      }
    
      next();
}

async function fetchUsers(req:Request,res:Response,next:NextFunction):Promise<Response>{
    try {
       //* since the user is_verified as admin we can fetch all users
       const users=await User.find().select('-password');
      

       if (!users) {
        return res.status(404).json({ success: false, message: "Users not found." });
      }
      return res.status(200).json({
        success: true,
        message: "List of users",
        users,
      });
    } catch (error) {
        console.error("Error in users route controller:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

export default router;