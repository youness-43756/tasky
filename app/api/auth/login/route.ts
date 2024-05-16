import connectDB from "@/lib/db";
import { isSamePass } from "@/lib/hashPass";
import User from "@/backend/models/UserSchema";
import { NextResponse } from "next/server";

connectDB();
export const POST = async (req: Request) => {
  const body = await req.json();
  const { username, password }: { username: string; password: string } = body;
  try {
    //? check if user not exists:
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return NextResponse.json(
        { message: "No account found. Sign up now!", success: false },
        { status: 201 }
      );
    }

    //? check if pass same as database pass:
    const comparePass = await isSamePass(password, existingUser.password);
    if (!comparePass) {
      return NextResponse.json(
        {
          message: "Oops, incorrect password. Please try again.",
          success: false,
        },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { message: "Login successful! Welcome back!", success: true },
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
