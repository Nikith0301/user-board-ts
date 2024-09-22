import mongoose from "mongoose"

export const connectDB= async():Promise <void> =>{

    try {
        const conn= await mongoose.connect("mongodb+srv://nik:1234@cluster0.lpymyoj.mongodb.net/Userdb?")
        console.log("MongoDB connected: " + conn.connection.host);
    } catch (error) {
        if (error instanceof Error) {
            console.log("NOt connected to DB: " + error.message);
        } else {
            console.log("Unknown error occurred during connection.");
        }
    }
}