"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isServicesPage = pathname === "/services";

  return (
    <header className="bg-white shadow-lg border-b-4 border-cyan-500 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        {/* Organization Logos - Left and Right */}
        <div className={`flex items-center justify-between gap-4 ${!isServicesPage ? 'mb-3 pb-3 border-b border-gray-200' : ''}`}>
          {/* Left: Công An Thổ Chu */}
          <div className="flex items-center gap-2">
            <img 
              src="/logo_cong_an_tho_chau.png" 
              alt="Công An Thổ Chu" 
              className="h-10 md:h-14 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-xs md:text-sm font-bold text-gray-800">Công An Thổ Chu</p>
              <p className="text-[10px] md:text-xs text-gray-600">An Giang</p>
            </div>
          </div>

          {/* Right: Trung Tâm PVHCC */}
          <div className="flex items-center gap-2">
            <img 
              src="/logo_trung_tam_PVHCC.png" 
              alt="Trung Tâm PVHCC" 
              className="h-10 md:h-14 w-auto object-contain"
            />
          </div>
        </div>

        {/* Main Header Content - Hide on services page */}
        {!isServicesPage && (
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="relative">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-xl border-3 border-cyan-500 overflow-hidden bg-white">
                  <img 
                    src="/image2.jpeg" 
                    alt="Logo Thổ Chu" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900">
                  Hệ Thống Check-in Đảo Thổ Chu
                </h1>
                <p className="text-xs md:text-sm text-gray-600 font-medium">🏝️ Công an An Giang - Du lịch an toàn</p>
              </div>
            </Link>

            {/* Right side: Services button and Additional Images */}
            <div className="flex items-center gap-3">
              {!isAdminPage && (
                <Link
                  href="/services"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg whitespace-nowrap"
                >
                  🏝️ Dịch Vụ
                </Link>
              )}
              {/* Additional Images - Desktop only */}
              <div className="hidden lg:flex items-center gap-2">
                <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md">
                  <img src="/image3.jpeg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md">
                  <img src="/image4.jpeg" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
