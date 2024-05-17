import { NextAuthOptions, type Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../db";
import User from "@/backend/models/UserSchema";
import { hashPass, isSamePass } from "../hashPass";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        if (req.method !== "POST") return null;
        const { name, email, password } = credentials as {
          name: string;
          email: string;
          password: string;
        };
        await connectDB();
        if (req?.body?.call === "sign-in" && req.method === "POST") {
          const userExisting = await User.findOne({ email });
          const hashedPass = await hashPass(password);

          const newUser = await User.create({
            name: req?.body?.name,
            email: req?.body?.email,
            image: req?.body?.image ? req?.body?.image : "",
            password: hashedPass,
          });
          return userExisting ? null : newUser.save();
        }

        //? login logic
        if (req?.body?.call === "login" && req.method === "POST") {
          const existingUser = await User.findOne({ email });
          if (!existingUser) return null;
          const isSamePassword = await isSamePass(
            password,
            existingUser.password
          );
          if (!isSamePassword) return null;

          if (existingUser && isSamePassword)
            return {
              id: existingUser?._id,
              name: existingUser?.name,
              email: existingUser?.email,
              image: existingUser?.image,
            };
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.sub = user.id;
      }
      return token;
    },
    async signIn({ user }) {
      try {
        await connectDB();
        const { name, email } = user as {
          name: string;
          email: string;
        };
        const userExisting = await User.findOne({
          $or: [{ name }, { email }],
        });
        if (userExisting) return true;
        console.log(userExisting);
        const newUser = await User.create({
          email: user?.email,
          name: user?.name,
          image: user?.image,
          password: await hashPass(name),
        });

        return newUser.save();
      } catch (error) {
        throw new Error("Failed with Oauth!");
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, //? 1 day
  },
  jwt: {},
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  // debug: process.env.NODE_ENV === "development",
};
