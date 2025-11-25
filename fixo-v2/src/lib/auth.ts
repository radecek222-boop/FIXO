import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    // Google OAuth
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    // GitHub OAuth
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
    // Demo/Development credentials provider
    CredentialsProvider({
      id: "demo",
      name: "Demo účet",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "demo@fixo.cz" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        // For demo purposes, create or find user
        const user = await prisma.user.upsert({
          where: { email: credentials.email },
          update: {},
          create: {
            email: credentials.email,
            name: "Demo uživatel",
            plan: "FREE",
            monthlyAnalysesUsed: 0,
            monthlyAnalysesLimit: 3,
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    newUser: "/dashboard",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;

        // Fetch additional user data
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: {
            plan: true,
            monthlyAnalysesUsed: true,
            monthlyAnalysesLimit: true,
          },
        });

        if (dbUser) {
          session.user.plan = dbUser.plan;
          session.user.monthlyAnalysesUsed = dbUser.monthlyAnalysesUsed;
          session.user.monthlyAnalysesLimit = dbUser.monthlyAnalysesLimit;
        }
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }

      // Handle session update
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async redirect({ url, baseUrl }) {
      // Allow relative URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allow URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  events: {
    async createUser({ user }) {
      // Initialize new user with FREE plan
      await prisma.user.update({
        where: { id: user.id },
        data: {
          plan: "FREE",
          monthlyAnalysesLimit: 3,
          monthlyAnalysesUsed: 0,
        },
      });
    },
  },
  debug: process.env.NODE_ENV === "development",
};

// Type augmentation for session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      plan?: string;
      monthlyAnalysesUsed?: number;
      monthlyAnalysesLimit?: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
