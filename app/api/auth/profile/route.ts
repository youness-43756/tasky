import connectDB from "@/lib/db";
import User from "@/backend/models/UserSchema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async (req: Request) => {
  const body = await req.json();
  try {
    const { userId } = body;
    //? Checks if a value can be used to create a valid bson ObjectId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 404 });
    }

    await connectDB();
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return NextResponse.json(
        { message: "Profile does not exists!", success: false },
        { status: 404 }
      );
    }

    const { name, email, id, image } = existingUser;
    return NextResponse.json(
      { message: { name, email, id, image }, success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Not working..... Try again later!" },
      { status: 500 }
    );
  }
};

//! lproblem li7m9ni kan mn dik status knt dayerha 400 (Bad Request)
