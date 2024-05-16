import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  image: string;
  password: string;
}
const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);
export default User;
