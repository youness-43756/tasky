import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../db";
import User from "@/models/UserSchema";
import { hashPass, isSamePass } from "../hashPass";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
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
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        try {
          await connectDB();
          const { name, email } = user;

          const userExisting = await User.findOne({
            $or: [{ name }, { email }],
          });

          const newUser = await User.create({
            email: user?.email,
            name: user?.name,
            image: user?.image,
            password: "github",
          });
          return userExisting ? true : newUser.save();
        } catch (error) {
          console.log(error);
        }
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, //? 1 day
  },
  jwt: {},
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/:path*",
  },
  // debug: process.env.NODE_ENV === "development",
};
