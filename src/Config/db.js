import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected Sucessfully : ${conn.connection.host}`);
  } catch (error) {
    console.log("DB Connection Failed..", error.message);
    process.exit(1);
  }
};
