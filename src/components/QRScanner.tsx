"use client";

import { useState, useRef, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Link from "next/link";
import VisitorForm from "./VisitorForm";
import type { VNeIDData } from "@/types/vneid";

export default function QRScanner() {
  const [scannedData, setScannedData] = useState<VNeIDData | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          console.log("=== QR Code Scanned ===");
          console.log("Raw text:", decodedText);
          console.log("Text length:", decodedText.length);
          console.log("======================");
          
          try {
            // Parse pipe-delimited VNeID format
            // Format: CCCD|CMND|Name|DOB|Gender|Address|IssueDate
            const parts = decodedText.split("|");
            
            if (parts.length !== 7) {
              throw new Error(`Expected 7 parts, got ${parts.length}`);
            }

            // Helper function to format date from DDMMYYYY to DD/MM/YYYY
            const formatDate = (dateStr: string) => {
              if (dateStr.length !== 8) return dateStr;
              const day = dateStr.substring(0, 2);
              const month = dateStr.substring(2, 4);
              const year = dateStr.substring(4, 8);
              return `${day}/${month}/${year}`;
            };

            const parsedData: VNeIDData = {
              "Số CCCD": parts[0].trim(),
              "Số CMND": parts[1].trim(),
              "Họ và tên": parts[2].trim(),
              "Ngày sinh": formatDate(parts[3].trim()),
              "Giới tính": parts[4].trim(),
              "Nơi thường trú": parts[5].trim(),
              "Ngày cấp CCCD": formatDate(parts[6].trim()),
            };

            console.log("Parsed data:", parsedData);
            setScannedData(parsedData);
            setIsScanning(false);
            scannerRef.current?.clear();
            scannerRef.current = null;
          } catch (error) {
            console.error("Error parsing QR code:", error);
            alert("Mã QR không hợp lệ. Vui lòng thử lại!\n\n" + decodedText);
          }
        },
        (errorMessage) => {
          // Silently handle scan errors
          console.log(errorMessage);
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isScanning]);

  const handleReset = () => {
    setScannedData(null);
    setIsScanning(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Professional Background with Image */}
      <div className="fixed inset-0 -z-10">
        <img 
          src="/image1.jpeg" 
          alt="Thổ Chu Island" 
          className="w-full h-full object-cover"
        />
        {/* High contrast overlay for professional look */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-800/85 to-blue-900/90"></div>
      </div>

      {/* Professional Header */}
      <header className="bg-white shadow-lg border-b-4 border-cyan-500">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo with Image */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full shadow-xl border-4 border-cyan-500 overflow-hidden bg-white">
                  <img 
                    src="/image2.jpeg" 
                    alt="Logo Thổ Chu" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  Hệ Thống Check-in Đảo Thổ Chu
                </h1>
                <p className="text-sm text-gray-600 font-medium">🏝️ Công an Kiên Giang - Du lịch an toàn</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/services"
                className="hidden md:block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg"
              >
                🏝️ Dịch Vụ Du Lịch
              </Link>
              <div className="hidden md:flex items-center gap-2">
                <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md">
                  <img src="/image3.jpeg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md">
                  <img src="/image4.jpeg" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl flex-1">
        {/* Main Content Area */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Sidebar - Island Showcase */}
          <div className="hidden md:block space-y-4">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3">
                <h3 className="text-white font-bold text-sm flex items-center">
                  <span className="mr-2">🌴</span> Khám Phá Thổ Chu
                </h3>
              </div>
              <div className="p-3 space-y-3">
                {[5, 6, 3].map((num, idx) => (
                  <div key={num} className="relative group">
                    <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                      <img 
                        src={`/image${num}.jpeg`} 
                        alt={`Thổ Chu ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {idx === 0 && '🌊 Bãi biển xanh trong'}
                      {idx === 1 && '🏖️ Rừng thông nhiệt đới'}
                      {idx === 2 && '🌅 Hoàng hôn tuyệt đẹp'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-xl p-4 text-white">
              <h4 className="font-bold mb-2 text-sm">📍 Thông Tin Du Lịch</h4>
              <ul className="text-xs space-y-1.5">
                <li className="flex items-center"><span className="mr-2">✓</span> An toàn - Thân thiện</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Hỗ trợ 24/7</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Check-in nhanh chóng</li>
              </ul>
            </div>
          </div>

          {/* Center - Main Scanner/Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-cyan-500">
              {isScanning && !scannedData ? (
                <div className="p-6">
                  {/* Scanner Header */}
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 mb-6 border-l-4 border-cyan-500">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Quét Mã QR VNeID
                        </h2>
                        <p className="text-sm text-gray-600">
                          Bắt đầu check-in của bạn 🎫
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR Scanner */}
                  <div
                    id="qr-reader"
                    className="mx-auto max-w-md border-4 border-cyan-500 rounded-xl overflow-hidden shadow-xl bg-black"
                  ></div>

                  {/* Instructions */}
                  <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 text-sm">📱 Hướng dẫn quét mã:</h3>
                        <ol className="text-sm text-gray-700 space-y-1.5">
                          <li className="flex items-start">
                            <span className="font-bold text-cyan-600 mr-2 min-w-[20px]">1.</span>
                            <span>Mở ứng dụng <strong>VNeID</strong> trên điện thoại</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold text-cyan-600 mr-2 min-w-[20px]">2.</span>
                            <span>Chọn mục <strong>&ldquo;Mã QR định danh&rdquo;</strong></span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold text-cyan-600 mr-2 min-w-[20px]">3.</span>
                            <span>Đưa mã QR vào khung camera phía trên</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              ) : scannedData ? (
                <VisitorForm initialData={scannedData} onReset={handleReset} />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-center md:text-left">
              <p className="font-bold text-sm">🏛️ Công an Đảo Thổ Chu - Kiên Giang</p>
              <p className="text-xs text-gray-400">Hệ thống quản lý du khách tự động - An toàn & Hiện đại</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs text-gray-400">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Đang hoạt động
              </div>
              <div className="text-xs bg-cyan-600 px-3 py-1 rounded-full font-semibold">
                Phiên bản 1.0
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
