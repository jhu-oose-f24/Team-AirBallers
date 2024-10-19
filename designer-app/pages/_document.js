import { Head, Html, Main, NextScript } from "next/document";
import { rubik } from "pages/_app";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="darkreader-lock" content="only-light" />
      </Head>
      <body className={`${rubik.variable} antialiased`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
