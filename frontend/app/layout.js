import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Groovewave",
  description:
    "Our music streaming app redefines how you enjoy and discover music",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Koulen&display=swap"
        />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
