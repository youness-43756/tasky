import User from "@/backend/models/UserSchema";
import connectDB from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const {
    name,
    id,
    email,
    image,
  }: { name: string; id: string; email: string; image: string } = body;
  try {
    await connectDB();
    //? Checks if a value can be used to create a valid bson ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 201 });
    }

    //? check if user exists:

    //? update user info
    const result = await User.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          email: email,
          image: image ? `${process.env.BASE_URL}/${image}` : "",
          updatedAt: new Date(),
        },
      }
    );

    if (result)
      return NextResponse.json({ message: "User updated!" }, { status: 201 });
  } catch (error) {
    console.error(error);
  }
};
