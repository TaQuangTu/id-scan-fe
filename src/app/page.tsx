"use client";

import QRScanner from "@/components/QRScanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <QRScanner />
    </main>
  );
}
