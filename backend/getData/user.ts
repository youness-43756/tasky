import connectDB from "@/lib/db";
import User from "../models/UserSchema";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectDB();
    const existingUser = await User.findById(id);
    return existingUser;
  } catch {
    return null;
  }
};
