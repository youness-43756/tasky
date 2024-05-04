import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  password: string;
}
const UserSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);
export default User;
