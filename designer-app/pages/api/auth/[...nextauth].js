import prisma from "@/util/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/** @type {import("next-auth").AuthOptions} */
export const authOptions = {
  providers: [
    // @ts-ignore
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  adapter: PrismaAdapter(prisma),

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // params: user, account, profile, email, credentials
    async signIn({ user }) {
      const userId = user.id;

      if (userId) {
        const draftsCount = await prisma.collection
          .count({
            where: {
              AND: [
                { userId: userId },
                { name: "Drafts" },
                { editable: false },
              ],
            },
          })
          .catch(console.log);

        if (!draftsCount) {
          await prisma.collection
            .create({
              data: {
                userId: userId,
                name: "Drafts",
                editable: false,
              },
            })
            .catch(console.log);
        }
      }

      return true;
    },

    // params: token, user, account, profile, isNewUser
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
        // @ts-ignore
        token.provider = account.provider;
      }

      // Return previous token if no updates
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      session.provider = token.provider;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
}

// @ts-ignore
export default NextAuth.default(authOptions);
