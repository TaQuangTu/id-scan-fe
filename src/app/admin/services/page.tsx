"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ServicePost, ServiceCategory, TourBooking } from "@/types/services";
import {
  getServices,
  saveService,
  deleteService,
  getBookings,
  updateBookingStatus,
  deleteBooking,
  loadDemoServices,
  clearAllServices,
} from "@/utils/servicesStorage";

export default function AdminServicesManagement() {
  const [services, setServices] = useState<ServicePost[]>([]);
  const [bookings, setBookings] = useState<TourBooking[]>([]);
  const [activeTab, setActiveTab] = useState<"services" | "bookings">("services");
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState<ServicePost | null>(null);
  const router = useRouter();

  const [serviceFormData, setServiceFormData] = useState<Omit<ServicePost, "id" | "createdAt" | "updatedAt">>({
    category: "restaurant",
    title: "",
    description: "",
    images: [],
    price: "",
    contact: "",
    location: "",
  });

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      router.push("/admin");
      return;
    }

    loadData();
  }, [router]);

  const loadData = () => {
    setServices(getServices());
    setBookings(getBookings());
  };

  const handleLoadDemoData = () => {
    if (confirm("Tải dữ liệu mẫu? Dữ liệu hiện tại sẽ được thay thế.")) {
      loadDemoServices();
      loadData();
      alert("Đã tải dữ liệu mẫu thành công!");
    }
  };

  const handleClearAll = () => {
    if (confirm("Xóa toàn bộ dữ liệu dịch vụ? Hành động này không thể hoàn tác!")) {
      clearAllServices();
      loadData();
      alert("Đã xóa toàn bộ dữ liệu!");
    }
  };

  const handleSubmitService = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceData: ServicePost = {
      id: editingService?.id || `service-${Date.now()}`,
      ...serviceFormData,
      createdAt: editingService?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveService(serviceData);
    loadData();
    resetForm();
    alert(editingService ? "Cập nhật dịch vụ thành công!" : "Thêm dịch vụ thành công!");
  };

  const handleEditService = (service: ServicePost) => {
    setEditingService(service);
    setServiceFormData({
      category: service.category,
      title: service.title,
      description: service.description,
      images: service.images,
      price: service.price || "",
      contact: service.contact || "",
      location: service.location || "",
    });
    setShowServiceForm(true);
  };

  const handleDeleteService = (serviceId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      deleteService(serviceId);
      loadData();
      alert("Đã xóa dịch vụ!");
    }
  };

  const resetForm = () => {
    setShowServiceForm(false);
    setEditingService(null);
    setServiceFormData({
      category: "restaurant",
      title: "",
      description: "",
      images: [],
      price: "",
      contact: "",
      location: "",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Hình ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.");
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setServiceFormData({
        ...serviceFormData,
        images: [...serviceFormData.images, base64String],
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlAdd = () => {
    const url = prompt("Nhập URL hình ảnh:");
    if (url && url.trim()) {
      setServiceFormData({
        ...serviceFormData,
        images: [...serviceFormData.images, url.trim()],
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setServiceFormData({
      ...serviceFormData,
      images: serviceFormData.images.filter((_, i) => i !== index),
    });
  };

  const handleUpdateBookingStatus = (bookingId: string, status: TourBooking["status"]) => {
    updateBookingStatus(bookingId, status);
    loadData();
    alert(`Đã cập nhật trạng thái booking!`);
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm("Xóa booking này?")) {
      deleteBooking(bookingId);
      loadData();
      alert("Đã xóa booking!");
    }
  };

  const getCategoryLabel = (category: ServiceCategory): string => {
    const labels = {
      restaurant: "Nhà Hàng",
      hotel: "Khách Sạn",
      vehicle: "Thuê Xe",
      tour: "Tour Du Lịch",
    };
    return labels[category];
  };

  const getCategoryIcon = (category: ServiceCategory): string => {
    const icons = {
      restaurant: "🍽️",
      hotel: "🏨",
      vehicle: "🏍️",
      tour: "🗺️",
    };
    return icons[category];
  };

  const getStatusBadge = (status: TourBooking["status"]) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    const labels = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      cancelled: "Đã hủy",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">🏝️ Quản Lý Dịch Vụ Du Lịch</h1>
              <p className="text-cyan-100">Admin Dashboard - Thổ Chu Island</p>
            </div>
            <Link
              href="/admin/dashboard"
              className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-colors shadow-lg"
            >
              ← Quay lại Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("services")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "services"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              📋 Quản Lý Dịch Vụ ({services.length})
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "bookings"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              🎫 Quản Lý Booking Tour ({bookings.length})
            </button>
          </div>

          {/* Action Buttons */}
          <div className="p-4 bg-gray-50 flex gap-3">
            {activeTab === "services" && (
              <>
                <button
                  onClick={() => setShowServiceForm(!showServiceForm)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
                >
                  ➕ Thêm Dịch Vụ Mới
                </button>
                <button
                  onClick={handleLoadDemoData}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg"
                >
                  📦 Tải Dữ Liệu Mẫu
                </button>
                <button
                  onClick={handleClearAll}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-lg"
                >
                  🗑️ Xóa Toàn Bộ
                </button>
              </>
            )}
            <Link
              href="/services"
              target="_blank"
              className="ml-auto bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors shadow-lg"
            >
              👁️ Xem Trang User
            </Link>
          </div>
        </div>

        {/* Services Management */}
        {activeTab === "services" && (
          <>
            {/* Service Form */}
            {showServiceForm && (
              <div className="bg-white rounded-xl shadow-2xl p-8 mb-6 border-t-4 border-cyan-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingService ? "✏️ Chỉnh Sửa Dịch Vụ" : "➕ Thêm Dịch Vụ Mới"}
                </h2>
                <form onSubmit={handleSubmitService} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Danh mục *
                      </label>
                      <select
                        required
                        value={serviceFormData.category}
                        onChange={(e) =>
                          setServiceFormData({
                            ...serviceFormData,
                            category: e.target.value as ServiceCategory,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                      >
                        <option value="restaurant">🍽️ Nhà Hàng</option>
                        <option value="hotel">🏨 Khách Sạn</option>
                        <option value="vehicle">🏍️ Thuê Xe</option>
                        <option value="tour">🗺️ Tour Du Lịch</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tiêu đề *
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceFormData.title}
                        onChange={(e) =>
                          setServiceFormData({ ...serviceFormData, title: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                        placeholder="Tên dịch vụ"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mô tả *
                    </label>
                    <textarea
                      required
                      value={serviceFormData.description}
                      onChange={(e) =>
                        setServiceFormData({ ...serviceFormData, description: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                      placeholder="Mô tả chi tiết về dịch vụ..."
                    />
                  </div>

                  {/* Images Upload Section */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hình ảnh
                    </label>
                    <div className="space-y-3">
                      {/* Current Images */}
                      {serviceFormData.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-3">
                          {serviceFormData.images.map((img, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={img}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Upload Buttons */}
                      <div className="flex gap-3">
                        <label className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all cursor-pointer text-center">
                          📁 Upload Ảnh Từ Máy
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={handleImageUrlAdd}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                        >
                          🔗 Thêm URL Ảnh
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Tải lên ảnh từ máy (max 2MB) hoặc dán link URL ảnh từ internet
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Giá
                      </label>
                      <input
                        type="text"
                        value={serviceFormData.price}
                        onChange={(e) =>
                          setServiceFormData({ ...serviceFormData, price: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                        placeholder="VD: 500.000đ/người"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Liên hệ
                      </label>
                      <input
                        type="text"
                        value={serviceFormData.contact}
                        onChange={(e) =>
                          setServiceFormData({ ...serviceFormData, contact: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                        placeholder="Số điện thoại"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Địa điểm
                      </label>
                      <input
                        type="text"
                        value={serviceFormData.location}
                        onChange={(e) =>
                          setServiceFormData({ ...serviceFormData, location: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                        placeholder="Vị trí"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg"
                    >
                      {editingService ? "💾 Cập Nhật" : "➕ Thêm Dịch Vụ"}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Services List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Danh mục</th>
                      <th className="px-6 py-4 text-left font-semibold">Tiêu đề</th>
                      <th className="px-6 py-4 text-left font-semibold">Giá</th>
                      <th className="px-6 py-4 text-left font-semibold">Liên hệ</th>
                      <th className="px-6 py-4 text-center font-semibold">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {services.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                            {getCategoryIcon(service.category)} {getCategoryLabel(service.category)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{service.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {service.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{service.price || "-"}</td>
                        <td className="px-6 py-4 text-gray-700">{service.contact || "-"}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEditService(service)}
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                            >
                              ✏️ Sửa
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
                            >
                              🗑️ Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {services.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <div className="text-5xl mb-3">🏝️</div>
                          <p className="text-gray-500 text-lg">Chưa có dịch vụ nào</p>
                          <p className="text-gray-400 text-sm mt-1">
                            Nhấn &ldquo;Thêm Dịch Vụ Mới&rdquo; để bắt đầu
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Bookings Management */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Khách hàng</th>
                    <th className="px-6 py-4 text-left font-semibold">Tour</th>
                    <th className="px-6 py-4 text-left font-semibold">Ngày đi</th>
                    <th className="px-6 py-4 text-center font-semibold">Số người</th>
                    <th className="px-6 py-4 text-center font-semibold">Trạng thái</th>
                    <th className="px-6 py-4 text-center font-semibold">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking) => {
                    const service = services.find((s) => s.id === booking.serviceId);
                    return (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">
                            {booking.customerName}
                          </div>
                          <div className="text-sm text-gray-500">📞 {booking.customerPhone}</div>
                          <div className="text-sm text-gray-500">🆔 {booking.customerCCCD}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">
                            {service?.title || "N/A"}
                          </div>
                          {booking.notes && (
                            <div className="text-sm text-gray-500">💬 {booking.notes}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {new Date(booking.tourDate).toLocaleDateString("vi-VN")}
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-900">
                          {booking.numberOfPeople}
                        </td>
                        <td className="px-6 py-4 text-center">{getStatusBadge(booking.status)}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            {booking.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleUpdateBookingStatus(booking.id, "confirmed")
                                  }
                                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
                                >
                                  ✅ Xác nhận
                                </button>
                                <button
                                  onClick={() =>
                                    handleUpdateBookingStatus(booking.id, "cancelled")
                                  }
                                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
                                >
                                  ❌ Hủy
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors"
                            >
                              🗑️ Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="text-5xl mb-3">🎫</div>
                        <p className="text-gray-500 text-lg">Chưa có booking nào</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
