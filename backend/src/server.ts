// src/server.ts

import cors from "cors"
import express, { NextFunction, Request, Response } from 'express';
import { connectDB } from './config/db';
import {ROLE, users} from "./data"
import projectRouter from "./routes/project.route";
import { authUser,authRole } from './middleware/basicAuth';
import { ENV_VARS } from './config/envVars';

import cookieParser from "cookie-parser";

import authRoutes from "../src/routes/auth.route";
import searchRoutes from"../src/routes/search.route"
 interface User{
  id: number;
  name: string;
  role: string;
}

interface UserRequest extends Request{
  user?:User
}
const port = ENV_VARS.PORT||3000;



const app = express();
app.use(cors({
	origin: 'http://localhost:5173', 
	
	credentials: true, // Allow cookies to be sent and received
  }))
// Middleware to parse cookies
app.use(cookieParser());
app.use(express.json());
/////////////////////////////////////////////////////////////

// app.use(getUser)
// app.use("/projects",projectRouter)

// app.get('/', (req: Request, res: Response) => {
//   res.send('Home Page TypeScript in the backend!');
// });

// app.get('/admin',authUser,authRole(ROLE.ADMIN),   (req:Request,res:Response)=>{
//   res.send("Admin PAge")
// })

// app.get('/dashboard',(req:Request,res:Response)=>{
//   res.send("dashboard PAge")
// })



// function getUser(req:UserRequest,res:Response,next:NextFunction){

//   const userId=req.body.userId
// if(userId)
//   req.user=users.find((user)=>user.id===userId)//user details as in interface UserRequest

// //This version works because it's using the implicit return of an arrow function. When you omit curly braces {} in an arrow function, the expression immediately following the arrow (=>) is automatically returned.
//   next()

// }

/////////////////////////////////////////////////////

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/search/",searchRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});
