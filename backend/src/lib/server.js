import mongoose from "mongoose";

export const connectDb = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.log(`MongoDb failure:- ${error}`);
  }
};
