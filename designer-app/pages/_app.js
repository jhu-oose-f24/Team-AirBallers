import RootLayout from "@/components/RootLayout";
import "@/styles/colors.css";
import "@/styles/globals.css";
import "@/styles/layout.css";
import { Rubik } from "next/font/google";
import "overlayscrollbars/overlayscrollbars.css";
import "tippy.js/dist/tippy.css";

export const rubik = Rubik({
  subsets: ["latin-ext"],
  variable: "--font-rubik",
  weight: "variable",
});

export default function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
