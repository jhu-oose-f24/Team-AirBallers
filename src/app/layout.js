import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin-ext"],
  variable: "--font-rubik",
  weight: "variable",
});

export const metadata = {
  title: "Designer-App",
  description: "Design your own garments with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="darkreader-lock" content="only-light" />
      <body className={`${rubik.variable} antialiased`}>{children}</body>
    </html>
  );
}
