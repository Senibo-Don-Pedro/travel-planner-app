import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Github],
  adapter: PrismaAdapter(db),
});
