import type { Metadata } from "next";
import { Suspense } from "react";

import { metaContent } from "@/utils/descriptions";
import "./globals.css";

import HeaderBar from "@/components/HeaderBar";

export const metadata: Metadata = {
  title: "MAPA | Mapa de la Policia",
  description: metaContent,
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col-reverse  gap-4 bg-black p-7 md:flex-col ">
        <HeaderBar />
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
