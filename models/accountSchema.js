import mongoose, { Schema } from "mongoose";

try {
  await mongoose.connect(
    "mongodb+srv://youness:elQFCQ8xIZJ8Y0sJ@cluster0.xnh3hie.mongodb.net/tasky?retryWrites=true&w=majority"
  );
} catch (error) {
  throw new Error("Connection Failed!!");
}

const accountSchema = new Schema(
  {
    username: "string",
    password: "string",
  },
  {
    timestamps: true,
  }
);
const Account =
  mongoose.models.accounts || mongoose.model("accounts", accountSchema);
export default Account;
