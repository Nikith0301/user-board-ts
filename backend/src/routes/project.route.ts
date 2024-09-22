import express,{Request,Response,NextFunction } from "express";
import {projects} from "../data";
import { authUser } from "../middleware/basicAuth";
import { canDeleteProject,canViewProject,filteredProjects } from "../permissions/projectAuth";

interface User{
    id:number,
    name:string,
    role:string
}

interface Project{
    id:number,
    name:string,
    userId:number
}

interface ProjectRequest extends Request{
    project?:Project
}

interface UserRequest extends Request{
    user?:User
}

interface AuthenticatedRequest extends Request {
    user?: User;
    project?: Project;
  }

const router = express.Router();

router.get("/",authUser,(req:UserRequest,res:Response)=>{
    // const projectId=parseInt(req.params.projectId);
    // console.log("slash says",projectId)
    // res.json(projects)

res.json(filteredProjects(req.user,projects))

})

router.get("/:projectId", findProject,authUser,authGetProject, (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
    res.json(req.project)
})

router.delete("/:projectId", findProject,authUser,authDeleteProject, (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
    res.json(req.project)
})


export function authGetProject(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    if (!req.user || !req.project || !canViewProject(req.user, req.project)) {
      res.status(401);
      res.send('Not Allowed');
      return; // Ensure early return after response
    }
  
    next();
  }

  export function authDeleteProject(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    if (!req.user || !req.project || !canDeleteProject(req.user, req.project)) {
      res.status(401);
      res.send('Not Allowed');
      return; // Ensure early return after response
    }
  
    next();
  }

function findProject(req:ProjectRequest,res:Response,next:NextFunction){

    const projectId=parseInt(req.params.projectId);
   
    console.log(projectId)
    req.project=projects.find((project)=>{return project.id===projectId}) // this project parameter is same as in interface ProjectRequest
    //In this version, you've added curly braces {}, which means the arrow function no longer has an implicit return. When you use curly braces, you need to explicitly return a value.
   
    if(!req.project){
        res.status(404).send('Project not found');
        return;
    }
    next()
}
export default router;