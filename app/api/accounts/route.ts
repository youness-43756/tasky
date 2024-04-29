import { NextResponse } from "next/server";
import Account from "@/models/accountSchema";
import hashPass from "@/lib/hashPass";

export async function POST(req: any) {
  try {
    const body = await req.json();
    const accountData = body.formData;
    const hashed = await hashPass(accountData.password);
    await Account.create({ ...accountData, password: hashed });
    return NextResponse.json({ message: "account created!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "failed", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const usernamesOnly = await Account.find({}, { _id: 0, username: 1 });
    return NextResponse.json(usernamesOnly, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failed", error }, { status: 500 });
  }
}
