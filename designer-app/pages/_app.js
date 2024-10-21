import "@/styles/colors.css";
import "@/styles/globals.css";
import "@/styles/layout.css";
import { Rubik } from "next/font/google";

export const rubik = Rubik({
  subsets: ["latin-ext"],
  variable: "--font-rubik",
  weight: "variable",
});

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
