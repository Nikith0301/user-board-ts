import { IUser } from "../models/model.user"; // Import the IUser interface
import { ROLE } from "../config/roles";
import {Types} from "mongoose"
// Function to check if the user can view the project
export function canViewProject(user: IUser, userId: string): boolean {

      // Convert user._id to a string for comparison
  const userIdString = new Types.ObjectId(user._id).toString();
    // console.log("permit is comparing",userIdString)
  return user.role === ROLE.ADMIN ||userIdString=== userId;
}

// Function to check if the user can edit the project
export function canEditProject(user: IUser, userId: string): boolean {
      // Convert user._id to a string for comparison
  const userIdString = new Types.ObjectId(user._id).toString();
    // console.log("permit is comparing",userIdString)
  return user.role === ROLE.ADMIN ||userIdString=== userId;
}

// Function to check if the user can delete the project
export function canDeleteProject(user: IUser, userId: string): boolean {
    // Convert user._id to a string for comparison
    const userIdString = new Types.ObjectId(user._id).toString();
    // console.log("permit is comparing",userIdString)
    return user.role === ROLE.ADMIN ||userIdString=== userId;

}
