import express, { Request, Response, NextFunction } from "express";
import { addProject,searchAllProject,searchProject,deleteProject } from "../controllers/search.controller";
import { protectRoute } from "../middleware/protectRoute";
import { canEditProject ,canViewProject,canDeleteProject} from "../permissions/permit";
import { IUser } from "../models/model.user";

interface AuthenticatedRequest extends Request {
  user?: IUser;
  body: {
    userId?: string; // Assuming the projectId comes from the request body
    projectId?: string;
  };
}

const router = express.Router();

// POST route for adding a project
router.post("/add", protectRoute, authAddProject, addProject);

router.get("/project/:userId/:projectId",protectRoute,authFindProject,searchProject)

router.get("/projects",protectRoute,authFindProject,searchAllProject)
// router.delete("/delete",protectRoute,authDeleteProject,deleteProject)// this is using req.body

router.delete("/delete/:userId/:projectId", protectRoute, authDeleteProject, deleteProject);//this is using params

// Middleware to authorize project editing
export function authAddProject(req: AuthenticatedRequest, res: Response, next: NextFunction): void {

  const { userId } = req.body; // Assuming projectId comes from the request body
console.log(userId)
  if (!req.user  || !canEditProject(req.user, userId)) {
    res.status(401).json({ message: " search route says Not Allowed" });
    return; // Early return to prevent further execution
  }

  next();
}


export function authFindProject(req: AuthenticatedRequest, res: Response, next: NextFunction): void {

    const { userId } = req.body; // Assuming projectId comes from the request body
  console.log(userId)
    if (!req.user  || !canViewProject(req.user, userId)) {
      res.status(401).json({ message: " search route says viewing Not Allowed" });
      return; // Early return to prevent further execution
    }
  
    next();
  }

  export function authDeleteProject(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    //const { userId, projectId } = req.body; // Assuming projectId comes from the request body
    const { userId, projectId } = req.params;
    if (!req.user || !canDeleteProject(req.user, projectId)) {
      res.status(401).json({ message: "Not allowed to delete this project." });
      return; // Early return to prevent further execution
    }
  
    next();
  }
  

export default router;
