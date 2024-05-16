import connectDB from "@/lib/db";
import { hashPass } from "@/lib/hashPass";
import User from "@/backend/models/UserSchema";
import { NextResponse } from "next/server";

connectDB();

export const POST = async (req: Request) => {
  const body = await req.json();
  const { username, password } = body;
  try {
    //? Check if the user already exists:
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      //? Hash password:
      const hashedPassword = await hashPass(password);

      //? Create new user:
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      //? Save it inside DB:
      await newUser.save();

      return NextResponse.json(
        { message: "User registered successfully.", success: true },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Try a valid username!", success: false },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to recive data.", error },
      { status: 500 }
    );
  }
};

//! 201 : user doesn't exists
//! 400 : Bad Request
//! 500 : Failed to recive data from client-side
