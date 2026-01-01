import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VNeID Scanner - Thổ Chu Island Check-in",
  description: "Visitor check-in system for Thổ Chu Island, Kiên Giang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
}
