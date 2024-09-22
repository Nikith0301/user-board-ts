import { User } from "../models/model.user";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
export async function addProject(req: Request, res: Response): Promise<Response> {

  try {
    const { userId, project } = req.body;

    // Check if required fields are provided
    if (!userId || !project || !project.name) {
      return res.status(400).json({ success: false, message: "User ID and project name are required." });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const newProject = {
      id: uuidv4(), // Generate a unique ID
      ...project, // Spread the rest of the project properties
    };

    user.projects.push(newProject);

    // user.projects.push(project);

    // Save the updated user
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Project added successfully.",
      projects: user.projects,
    });

  } catch (error) {
    console.error("Error in addProject controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}


export async function searchProject(req:Request,res:Response):Promise<Response> {


    try {
        const {userId,projectId}=req.params;
console.log(userId)
      const user =await User.findById(userId);

      if(!user){
        return res.status(404).json({ success: false, message: "search cntr says User not found." })
      }

const project=user.projects.find(p=>p.id===projectId)

if (!project) {
  return res.status(404).json({ success: false, message: "Project not found." });
  }

  return res.status(200).json({
		success: true,
		project,
	  });



    } catch (error) {
      console.error("Error in searchProject controller:", error);
      return res.status(500).json({ success: false, message: "Internal server error in search cntr." });
    }
}

export async function searchAllProject(req: Request, res: Response): Promise<Response> {
  try {
    const { userId } = req.body; // Assuming userId is passed in the request body
    console.log(userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Return all projects of the user
    return res.status(200).json({
      success: true,
      projects: user.projects, // Return the array of projects
    });

  } catch (error) {
    console.error("Error in searchAllProject controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}


export async function deleteProject(req: Request, res: Response): Promise<Response> {
  try {
    const { userId, projectId } = req.params;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const projectIndex = user.projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    user.projects.splice(projectIndex, 1);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
      projects: user.projects,
    });

  } catch (error) {
    console.error("Error in deleteProject controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}
