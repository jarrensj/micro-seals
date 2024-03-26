import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "./Web3Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "micro sappy",
  description: "micro sappy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Web3Provider>
        <body className={inter.className}>{children}</body>
      </Web3Provider>
    </html>
  );
}
