import RootLayout from "@/components/RootLayout";
import { SessionProvider } from "next-auth/react";
import { Rubik } from "next/font/google";

import "@/styles/colors.css";
import "@/styles/globals.css";
import "@/styles/layout.css";
import "@/styles/shirt-puppet.css";
import "overlayscrollbars/overlayscrollbars.css";
import "tippy.js/dist/tippy.css";

export const rubik = Rubik({
  subsets: ["latin-ext"],
  variable: "--font-rubik",
  weight: "variable",
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </SessionProvider>
  );
}
