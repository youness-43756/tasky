import mongoose from "mongoose";
const uri: string = process.env.MONGODB_URI as string;

const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const connectDB = async () => {
  try {
    await mongoose.connect(uri, options);
  } catch (error: any) {
    console.error(error.message);
    // process.exit(1);
  }
};

export default connectDB;
