import { cn } from "@/lib/utils";
import { metaDenuncia } from "@/utils/descriptions";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

export const metadata: Metadata = {
  title: metaDenuncia.title,
  description: metaDenuncia.description,
  icons: "/favicon.png",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={cn(
        "bg-background h-full font-sans antialiased",
        fontSans.variable,
      )}
    >
      {children}
    </main>
  );
}
