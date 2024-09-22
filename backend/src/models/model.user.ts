import mongoose, { Document, Schema } from 'mongoose';


interface IProject {
    id: string; // or mongoose.Types.ObjectId
    name: string; // Example field for project name
    description?: string; // Optional field for project description
  }

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId; // Ensure _id is typed as ObjectId
    name: string;
    email: string;
    password: string;
    role: string;
    // projects:Array<string>;
    projects: IProject[]; // Change to array of objects
   
}

const userSchema = new Schema<IUser>({
    // id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: true },//0->User role
    // projects: { type: [String], required: false }
    projects: {
        type: [{ 
          id: { type: String, required: true }, // Unique ID for each project
          name: { type: String, required: true }, // Example field
          description: { type: String, required: false },
        }],
        required: false,
      },
   
});
export const User = mongoose.model<IUser>('User', userSchema);
