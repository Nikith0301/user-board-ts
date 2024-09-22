import {Request,Response,NextFunction} from "express";


interface User{
    id: number;
    name: string;
    role: string;
}


interface AuthenticatedRequest extends Request {
    user?: User;
  }

export function authUser(req:AuthenticatedRequest,res:Response,next:NextFunction):void{
  if (req.user == null) {
    res.status(403);
    res.send('You need to sign in');
    return ;
  }

  next();
}

export function authRole(role:string){

  return (req: AuthenticatedRequest, res: Response, next: NextFunction):void=>{
    
    console.log(req.user)
    if(req.user.role!==role){
     
      res.status(401)
     res.send("Not Authorized role")
     return  

    }
    next();
  }
}