import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    // id:string
    name: string;
    email: string;
    password: string;
    role: string;
    projects:Array<string>;
   
}

const userSchema = new Schema<IUser>({
    // id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: true },//0->User role
    projects: { type: [String], required: false }
   
});
export const User = mongoose.model<IUser>('User', userSchema);
