import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "VNeID Scanner - Thổ Chu Island Check-in",
  description: "Visitor check-in system for Thổ Chu Island, An Giang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
