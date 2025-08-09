import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const mongoUrl =
      process.env.MONGODB_URL || "mongodb://localhost:27017/ai-assistant";
    await mongoose.connect(mongoUrl);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
