import { User } from "../models/model.user";
import express, { Request, Response } from "express";

export async function addProject(req: Request, res: Response): Promise<Response> {

  try {
    const { userId, project } = req.body;

    // Check if required fields are provided
    if (!userId || !project) {
      return res.status(400).json({ success: false, message: "User ID and project are required." });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Add the new project to the user's projects array
    user.projects.push(project);

    // Save the updated user
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Project added successfully.",
      projects: user.projects, // Return updated projects
    });

  } catch (error) {
    console.error("Error in addProject controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}


// export async function searchProject(req,res){


//     try {
        
//     } catch (error) {
        
//     }
// }

// export async function addDelete(req,res){


//     try {
        
//     } catch (error) {
        
//     }
// }