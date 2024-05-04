// lib/db.js
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
    process.exit(1);
  }
};

export default connectDB;

// import clientPromise from "../../../lib/mongodb";

// import { NextResponse } from "next/server";
// import Account from "@/models/accountSchema";
// import hashPass from "@/lib/hashPass";

// export async function GET() {
//   const client = await clientPromise;
//   try {
//     await client.connect();
//     const usernamesOnly = await Account.find({}, { _id: 0, username: 1 });
//     return NextResponse.json(usernamesOnly, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "failed", error }, { status: 500 });
//   } finally {
//     await client.close();
//   }
// }

// export async function POST(req: Request, res: Response) {
//   const client = await clientPromise;
//   try {
//     await client.connect();
//     const body = await req.json();
//     const accountData = body.formData;
//     const hashed = await hashPass(accountData.password);
//     // await Account.create({ ...accountData, password: hashed });
//     return NextResponse.json({ message: "account created!" }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: "failed", error }, { status: 500 });
//   } finally {
//     await client.close();
//   }
// }

// const MongoClient = require("mongodb").MongoClient;
// const MongoClient = require("mongoose").MongoClient;
// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function CheckUser(username: string) {
//   try {
//     await client.connect();
//     const db = client.db("accounts");
//     const user = await db.accounts({ username: username });

//     if (user.accounts.length > 0) {
//       console.log(`User ${username} is registered.`);
//     } else {
//       console.log(`User ${username} is not registered.`);
//     }
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }
// export { CheckUser };

// import clientPromise from "../../../lib/mongodb";

// export async function POST(req: Request, res: Response) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("accounts");

//     const data = await db.collection("accounts").find({}).toArray();
//     return res.status(200).json({ data });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Unable to connect to database" });
//   }
// }
