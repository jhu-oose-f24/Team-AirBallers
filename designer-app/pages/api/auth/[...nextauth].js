import prisma from "@/util/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// @ts-ignore
export default NextAuth.default({
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
    async jwt({ token, user, account, profile, isNewUser }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
        token.provider = account.provider;

        if (isNewUser) {
          await prisma.collection.create({
            data: {
              userId: user.id,
              name: "Drafts",
              editable: false,
            },
          })
          .catch(console.log);
        }
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
});
