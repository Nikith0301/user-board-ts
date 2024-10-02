import { User } from "../models/model.user";
import { Project } from "../models/model.project";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken";

interface AuthenticatedRequest extends Request {
  user?: any;
}

interface SignupRequest extends Request {
  body: {
    username: string;
    password: string;
    role?: string;
  };
}

interface LoginRequest extends Request {
    body: {
      username: string;
      password: string;
      role?: string;
    };
  }

async function signup(req: SignupRequest, res: Response): Promise<Response> {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 6 characters" });
    }

    const existingUserName = await User.findOne({ name: username });

    if (existingUserName) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    // Salting and hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name: username,
      password: hashedPassword, // Use hashed password here
      role
    });

    const token=generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    return res.status(201).json({
      success: true,
      user: {
        ...newUser.toObject(), // Use `toObject()` for the Mongoose document
        password: "", // Hide password
      },
      tok:token
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function login(req:LoginRequest,res:Response):Promise<Response>{
   
    try {
        const{username,password}=req.body;

        if(!username ||!password){
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user=await User.findOne({name:username});


        if (!user) {
			return res.status(404).json({ success: false, message: "Invalid credentials" });
		}

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

    const token=  generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
			success: true,
			user: {
				...user.toObject(),
				password: "",
			},
      tok:token
		});

    } catch (error) {
        console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
    }

}

async function logout(req:Request,res:Response){
try {
    res.clearCookie("user-jwt")
    res.status(200).json({ success: true, message: "Logged out successfully" });


} catch (error) {
    console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
}
}


async function authCheck(req:AuthenticatedRequest,res:Response){
  try {
    console.log("req.user:", req.user);
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export { signup ,login,logout,authCheck};
