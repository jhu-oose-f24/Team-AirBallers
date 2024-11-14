import { authOptions } from '@/auth';
import NextAuth from 'next-auth';
 
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

export const API_AUTH_PREFIX = "/api/auth";

export const AUTH_ROUTES = ["/login"];

export const PROTECTED_ROUTES = [
  "/",
  // your other protected routes
]