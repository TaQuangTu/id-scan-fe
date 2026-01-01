"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { VisitorFormData } from "@/types/vneid";
import { loadDemoData, clearAllData } from "@/utils/demoData";

export default function AdminDashboard() {
  const [visitors, setVisitors] = useState<VisitorFormData[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorFormData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      router.push("/admin");
      return;
    }

    // Load visitors from localStorage
    loadVisitors();
  }, [router]);

  const loadVisitors = () => {
    const stored = localStorage.getItem("checkedInVisitors");
    if (stored) {
      setVisitors(JSON.parse(stored));
    }
  };

  const handleLoadDemoData = () => {
    const demoData = loadDemoData();
    setVisitors(demoData);
  };

  const handleClearAllData = () => {
    if (confirm("Xác nhận xóa toàn bộ dữ liệu? Hành động này không thể hoàn tác.")) {
      clearAllData();
      setVisitors([]);
      setSelectedVisitor(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  const handleDownloadCSV = () => {
    const headers = [
      "Số CCCD",
      "Số CMND",
      "Họ và tên",
      "Giới tính",
      "Ngày sinh",
      "Nơi thường trú",
      "Ngày cấp CCCD",
      "Nơi tạm trú",
      "Ghi chú khác",
      "Thời gian check-in"
    ];

    const csvContent = [
      headers.join(","),
      ...visitors.map(v => [
        v["Số CCCD"],
        v["Số CMND"],
        `"${v["Họ và tên"]}"`,
        v["Giới tính"],
        v["Ngày sinh"],
        `"${v["Nơi thường trú"]}"`,
        v["Ngày cấp CCCD"],
        `"${v["Nơi tạm trú"]}"`,
        `"${v["Ghi chú khác"]}"`,
        new Date().toLocaleString("vi-VN")
      ].join(","))
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `danh-sach-du-khach-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const handleDeleteVisitor = (index: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa du khách này?")) {
      const updated = visitors.filter((_, i) => i !== index);
      setVisitors(updated);
      localStorage.setItem("checkedInVisitors", JSON.stringify(updated));
      setSelectedVisitor(null);
    }
  };

  const filteredVisitors = visitors.filter(v =>
    v["Họ và tên"].toLowerCase().includes(searchTerm.toLowerCase()) ||
    v["Số CCCD"].includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-cyan-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Quản Lý Du Khách - Thổ Chu
                </h1>
                <p className="text-sm text-gray-600">Công an Kiên Giang</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-cyan-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Tổng du khách</p>
                <p className="text-3xl font-bold text-gray-900">{visitors.length}</p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Hôm nay</p>
                <p className="text-3xl font-bold text-gray-900">{visitors.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Đang lưu trú</p>
                <p className="text-3xl font-bold text-gray-900">{visitors.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm theo tên hoặc số CCCD..."
                  className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleLoadDemoData}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Tải dữ liệu mẫu
              </button>

              <button
                onClick={handleDownloadCSV}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Tải xuống CSV
              </button>

              <button
                onClick={handleClearAllData}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Xóa toàn bộ
              </button>
            </div>
          </div>
        </div>

        {/* Visitor List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">STT</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Họ và tên</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Số CCCD</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Giới tính</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Nơi tạm trú</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVisitors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <div className="text-gray-400">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-lg font-semibold">Chưa có du khách check-in</p>
                        <p className="text-sm mt-1">Danh sách sẽ hiển thị khi có du khách đăng ký</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredVisitors.map((visitor, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-gray-900">{visitor["Họ và tên"]}</div>
                        <div className="text-xs text-gray-500">{visitor["Ngày sinh"]}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-mono">{visitor["Số CCCD"]}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{visitor["Giới tính"]}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{visitor["Nơi tạm trú"] || "—"}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedVisitor(visitor)}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                          >
                            Chi tiết
                          </button>
                          <button
                            onClick={() => handleDeleteVisitor(index)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedVisitor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Chi Tiết Du Khách</h2>
              <button
                onClick={() => setSelectedVisitor(null)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600">Họ và tên</label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{selectedVisitor["Họ và tên"]}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600">Giới tính</label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{selectedVisitor["Giới tính"]}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600">Số CCCD</label>
                  <p className="text-sm font-semibold text-gray-900 mt-1 font-mono">{selectedVisitor["Số CCCD"]}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600">Số CMND</label>
                  <p className="text-sm font-semibold text-gray-900 mt-1 font-mono">{selectedVisitor["Số CMND"]}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600">Ngày sinh</label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{selectedVisitor["Ngày sinh"]}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600">Ngày cấp CCCD</label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{selectedVisitor["Ngày cấp CCCD"]}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-600">Nơi thường trú</label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{selectedVisitor["Nơi thường trú"]}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-600">Nơi tạm trú tại Thổ Chu</label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{selectedVisitor["Nơi tạm trú"]}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-600">Ghi chú</label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{selectedVisitor["Ghi chú khác"] || "Không có"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
