import { Account, DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id?: User["id"];
      accessToken: Account["access_token"];
    };
    provider?: OAuthProvider;
  }
}

declare module "next-auth/jwt" {
  type JWT = DefaultJWT & {
    id?: User["id"];
    accessToken?: Account["access_token"];
    provider?: OAuthProvider;
  };
}
