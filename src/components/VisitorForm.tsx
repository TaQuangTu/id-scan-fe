"use client";

import { useState } from "react";
import type { VNeIDData, VisitorFormData } from "@/types/vneid";

interface VisitorFormProps {
  initialData: VNeIDData;
  onReset: () => void;
}

export default function VisitorForm({ initialData, onReset }: VisitorFormProps) {
  const [formData, setFormData] = useState<VisitorFormData>({
    ...initialData,
    "Nơi tạm trú": "",
    "Ghi chú khác": "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - Replace with actual backend integration later
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Submitting data:", formData);
      
      // Save to localStorage for admin dashboard
      const existingVisitors = localStorage.getItem("checkedInVisitors");
      const visitors = existingVisitors ? JSON.parse(existingVisitors) : [];
      visitors.push({
        ...formData,
        checkInTime: new Date().toISOString(),
      });
      localStorage.setItem("checkedInVisitors", JSON.stringify(visitors));
      
      setSubmitSuccess(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onReset();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="p-8 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-600 rounded-full mb-6 shadow-2xl">
          <svg
            className="w-14 h-14 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Check-in Thành Công!
        </h2>
        <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-4 inline-block">
          <p className="text-gray-700 text-sm mb-1">
            Chào mừng quý khách
          </p>
          <p className="text-xl font-bold text-cyan-700">{formData["Họ và tên"]}</p>
          <p className="text-gray-600 text-sm mt-2">
            🏝️ Đến với Đảo Thổ Chu - Kiên Giang
          </p>
        </div>
        <p className="text-gray-600 mt-4 text-sm">
          Chúc quý khách có chuyến đi vui vẻ và an toàn! 🌴
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 -mx-6 -mt-6 px-6 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Thông Tin Du Khách
              </h2>
              <p className="text-xs text-cyan-100">
                Vui lòng kiểm tra và bổ sung thông tin
              </p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="bg-white hover:bg-gray-100 text-cyan-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Quét lại
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Scanned Information - High Contrast */}
        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 border-b-2 border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Thông Tin Căn Cước Công Dân
            </h3>
          </div>
          <div className="p-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Số CCCD"
              value={formData["Số CCCD"]}
              readOnly
            />
            <FormField
              label="Số CMND"
              value={formData["Số CMND"]}
              readOnly
            />
            <FormField
              label="Họ và tên"
              value={formData["Họ và tên"]}
              readOnly
              className="md:col-span-2"
            />
            <FormField
              label="Giới tính"
              value={formData["Giới tính"]}
              readOnly
            />
            <FormField
              label="Ngày sinh"
              value={formData["Ngày sinh"]}
              readOnly
            />
            <FormField
              label="Ngày cấp CCCD"
              value={formData["Ngày cấp CCCD"]}
              readOnly
            />
            <FormField
              label="Nơi thường trú"
              value={formData["Nơi thường trú"]}
              readOnly
              className="md:col-span-2"
            />
          </div>
        </div>
        </div>

        {/* Additional Information - High Contrast */}
        <div className="border-2 border-cyan-300 rounded-lg overflow-hidden">
          <div className="bg-cyan-600 px-4 py-3">
            <h3 className="text-sm font-bold text-white flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Thông Tin Lưu Trú Tại Thổ Chu
            </h3>
          </div>
          <div className="p-4 bg-cyan-50">
            <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                🏖️ Địa chỉ lưu trú <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="Nơi tạm trú"
                value={formData["Nơi tạm trú"]}
                onChange={handleInputChange}
                required
                placeholder="Nhập địa chỉ khách sạn/nhà nghỉ tại Thổ Chu..."
                className="w-full px-4 py-3 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                📝 Ghi chú bổ sung
              </label>
              <textarea
                name="Ghi chú khác"
                value={formData["Ghi chú khác"]}
                onChange={handleInputChange}
                rows={3}
                placeholder="Mục đích chuyến đi, thời gian lưu trú, thông tin liên lạc..."
                className="w-full px-4 py-3 text-sm text-gray-900 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition resize-none bg-white placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
        </div>

        {/* Professional Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 hover:border-gray-400 transition text-sm shadow-sm"
          >
            ← Quay lại
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-bold hover:from-cyan-700 hover:to-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang xử lý...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Xác Nhận Check-in →
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  value: string;
  readOnly?: boolean;
  className?: string;
}

function FormField({ label, value, readOnly, className = "" }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        readOnly={readOnly}
        className="w-full px-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 font-medium focus:outline-none"
      />
    </div>
  );
}
