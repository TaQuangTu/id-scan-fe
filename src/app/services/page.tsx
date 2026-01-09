"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ServicePost, Review, TourBooking, ServiceCategory } from "@/types/services";
import {
  getServices,
  getServiceReviews,
  saveReview,
  getAverageRating,
  saveBooking,
  loadDemoServices,
} from "@/utils/servicesStorage";

export default function ServicesPage() {
  const [services, setServices] = useState<ServicePost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "all">("all");
  const [selectedService, setSelectedService] = useState<ServicePost | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Review form state
  const [reviewData, setReviewData] = useState({
    userName: "",
    rating: 5,
    comment: "",
  });

  // Booking form state
  const [bookingData, setBookingData] = useState({
    customerName: "",
    customerPhone: "",
    customerCCCD: "",
    tourDate: "",
    numberOfPeople: 1,
    notes: "",
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    const stored = getServices();
    // Load demo data if empty OR if we have old 5-service data
    if (stored.length === 0 || stored.length === 5) {
      loadDemoServices();
      setServices(getServices());
    } else {
      setServices(stored);
    }
  };

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category === selectedCategory);

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

  const handleViewDetails = (service: ServicePost) => {
    setSelectedService(service);
    setReviews(getServiceReviews(service.id));
    setShowReviewForm(false);
    setShowBookingForm(false);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const newReview: Review = {
      id: `review-${Date.now()}`,
      serviceId: selectedService.id,
      userName: reviewData.userName,
      rating: reviewData.rating,
      comment: reviewData.comment,
      createdAt: new Date().toISOString(),
    };

    saveReview(newReview);
    setReviews(getServiceReviews(selectedService.id));
    setReviewData({ userName: "", rating: 5, comment: "" });
    setShowReviewForm(false);
    alert("Cảm ơn bạn đã đánh giá! 🌟");
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const newBooking: TourBooking = {
      id: `booking-${Date.now()}`,
      serviceId: selectedService.id,
      customerName: bookingData.customerName,
      customerPhone: bookingData.customerPhone,
      customerCCCD: bookingData.customerCCCD,
      tourDate: bookingData.tourDate,
      numberOfPeople: bookingData.numberOfPeople,
      notes: bookingData.notes,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    saveBooking(newBooking);
    setBookingData({
      customerName: "",
      customerPhone: "",
      customerCCCD: "",
      tourDate: "",
      numberOfPeople: 1,
      notes: "",
    });
    setShowBookingForm(false);
    alert("Đặt tour thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất. 🎉");
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Page Title Section */}
      <div className="relative bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="absolute inset-0 opacity-20">
          <img src="/image1.jpeg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 py-6 md:py-8 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                🏝️ Dịch Vụ Du Lịch Thổ Chu
              </h1>
              <p className="text-cyan-100 text-sm md:text-base">
                Khám phá các dịch vụ tuyệt vời trên đảo
              </p>
            </div>
            <Link
              href="/"
              className="bg-white text-cyan-600 px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-cyan-50 transition-colors shadow-lg"
            >
              ← Trang chủ
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex gap-6">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Category Filter */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedService(null);
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === "all"
                      ? "bg-cyan-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  🌟 Tất cả ({services.length})
                </button>
                {(["restaurant", "hotel", "vehicle", "tour"] as ServiceCategory[]).map((cat) => {
                  const count = services.filter((s) => s.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedService(null);
                      }}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        selectedCategory === cat
                          ? "bg-cyan-600 text-white shadow-lg scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {getCategoryIcon(cat)} {getCategoryLabel(cat)} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Services Grid */}
            {!selectedService ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredServices.map((service) => {
              const avgRating = getAverageRating(service.id);
              const reviewCount = getServiceReviews(service.id).length;

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleViewDetails(service)}
                >
                  {/* Service Image - Real photo or Icon */}
                  <div className="h-48 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-6xl relative overflow-hidden">
                    {service.images && service.images.length > 0 ? (
                      <img
                        src={service.images[0]}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getCategoryIcon(service.category)
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-semibold px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full">
                        {getCategoryLabel(service.category)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {service.description}
                    </p>

                    {service.price && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-cyan-600 font-bold text-lg">{service.price}</span>
                      </div>
                    )}

                    {service.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <span>📍</span>
                        <span>{service.location}</span>
                      </div>
                    )}

                    {/* Rating */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2">
                        {renderStars(Math.round(avgRating))}
                        <span className="text-sm text-gray-600">
                          {avgRating > 0 ? avgRating.toFixed(1) : "Chưa có đánh giá"}
                        </span>
                      </div>
                      {reviewCount > 0 && (
                        <span className="text-xs text-gray-500">
                          ({reviewCount} đánh giá)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredServices.length === 0 && (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🏝️</div>
                <p className="text-gray-500 text-lg">
                  Chưa có dịch vụ nào trong danh mục này
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Service Details View */
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Back Button */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-4 border-b">
              <button
                onClick={() => setSelectedService(null)}
                className="flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-700"
              >
                <span>←</span> Quay lại danh sách
              </button>
            </div>

            <div className="p-8">
              {/* Service Header */}
              <div className="mb-6">
                {/* Image Gallery */}
                {selectedService.images && selectedService.images.length > 0 && (
                  <div className="mb-6">
                    {/* Main Image */}
                    <div className="relative h-96 rounded-xl overflow-hidden mb-3">
                      <img
                        src={selectedService.images[0]}
                        alt={selectedService.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Thumbnail Images */}
                    {selectedService.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-3">
                        {selectedService.images.slice(1, 5).map((img, index) => (
                          <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                            <img
                              src={img}
                              alt={`${selectedService.title} ${index + 2}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{getCategoryIcon(selectedService.category)}</span>
                  <div>
                    <span className="text-xs font-semibold px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full">
                      {getCategoryLabel(selectedService.category)}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 mt-2">
                      {selectedService.title}
                    </h2>
                  </div>
                </div>

                {/* Rating Summary */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    {renderStars(Math.round(getAverageRating(selectedService.id)))}
                    <span className="text-lg font-semibold text-gray-700">
                      {getAverageRating(selectedService.id).toFixed(1)}
                    </span>
                  </div>
                  <span className="text-gray-500">({reviews.length} đánh giá)</span>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {selectedService.description}
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  {selectedService.price && (
                    <div className="bg-cyan-50 rounded-lg p-4">
                      <div className="text-sm text-cyan-700 font-semibold mb-1">💰 Giá</div>
                      <div className="text-xl font-bold text-cyan-600">
                        {selectedService.price}
                      </div>
                    </div>
                  )}
                  {selectedService.location && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-sm text-blue-700 font-semibold mb-1">📍 Địa điểm</div>
                      <div className="text-gray-700">{selectedService.location}</div>
                    </div>
                  )}
                  {selectedService.contact && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-sm text-green-700 font-semibold mb-1">📞 Liên hệ</div>
                      <div className="text-gray-700">{selectedService.contact}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                {selectedService.category === "tour" && (
                  <button
                    onClick={() => {
                      setShowBookingForm(!showBookingForm);
                      setShowReviewForm(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    🎫 Đặt Tour Ngay
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowReviewForm(!showReviewForm);
                    setShowBookingForm(false);
                  }}
                  className="flex-1 bg-yellow-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-all shadow-lg hover:shadow-xl"
                >
                  ⭐ Viết Đánh Giá
                </button>
              </div>

              {/* Booking Form */}
              {showBookingForm && selectedService.category === "tour" && (
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 mb-8 border-2 border-cyan-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 Đặt Tour</h3>
                  <form onSubmit={handleSubmitBooking} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Họ và tên *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingData.customerName}
                          onChange={(e) =>
                            setBookingData({ ...bookingData, customerName: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          required
                          value={bookingData.customerPhone}
                          onChange={(e) =>
                            setBookingData({ ...bookingData, customerPhone: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                          placeholder="0987654321"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Số CCCD *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingData.customerCCCD}
                          onChange={(e) =>
                            setBookingData({ ...bookingData, customerCCCD: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                          placeholder="001234567890"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Ngày đi tour *
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingData.tourDate}
                          onChange={(e) =>
                            setBookingData({ ...bookingData, tourDate: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số người *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={bookingData.numberOfPeople}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            numberOfPeople: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ghi chú
                      </label>
                      <textarea
                        value={bookingData.notes}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, notes: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                        placeholder="Yêu cầu đặc biệt..."
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:from-cyan-700 hover:to-blue-700 transition-all"
                      >
                        Xác Nhận Đặt Tour
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowBookingForm(false)}
                        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Review Form */}
              {showReviewForm && (
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 mb-8 border-2 border-yellow-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">⭐ Viết Đánh Giá</h3>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tên của bạn *
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewData.userName}
                        onChange={(e) =>
                          setReviewData({ ...reviewData, userName: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Đánh giá *
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewData({ ...reviewData, rating: star })}
                            className="text-4xl focus:outline-none hover:scale-110 transition-transform"
                          >
                            <span
                              className={
                                star <= reviewData.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            >
                              ★
                            </span>
                          </button>
                        ))}
                        <span className="ml-3 text-lg font-semibold text-gray-700 self-center">
                          ({reviewData.rating}/5)
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nhận xét *
                      </label>
                      <textarea
                        required
                        value={reviewData.comment}
                        onChange={(e) =>
                          setReviewData({ ...reviewData, comment: e.target.value })
                        }
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none"
                        placeholder="Chia sẻ trải nghiệm của bạn..."
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 transition-all"
                      >
                        Gửi Đánh Giá
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Reviews List */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  💬 Đánh Giá Từ Khách Hàng ({reviews.length})
                </h3>
                {reviews.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <div className="text-5xl mb-3">⭐</div>
                    <p className="text-gray-500">
                      Chưa có đánh giá nào. Hãy là người đầu tiên!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-50 rounded-xl p-5 border-l-4 border-cyan-500"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-bold text-gray-900">{review.userName}</div>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.rating)}
                              <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
          </div>

          {/* Right Sidebar - Advertisers & Local Policies */}
          <div className="hidden lg:block w-80 space-y-6">
            {/* Local Policies Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-cyan-500">
                <span className="text-2xl">📋</span>
                <h3 className="text-lg font-bold text-gray-900">Quy Định Địa Phương</h3>
              </div>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex gap-3">
                  <span className="text-cyan-600 font-bold">•</span>
                  <p>Giữ gìn vệ sinh môi trường biển và bãi biển</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-cyan-600 font-bold">•</span>
                  <p>Không khai thác hải sản trái phép trong khu vực bảo tồn</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-cyan-600 font-bold">•</span>
                  <p>Tuân thủ giờ giới nghiêm từ 22:00 - 05:00</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-cyan-600 font-bold">•</span>
                  <p>Luôn mang theo giấy tờ tùy thân khi di chuyển</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-cyan-600 font-bold">•</span>
                  <p>Báo cáo ngay cho cơ quan chức năng khi phát hiện hành vi khả nghi</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-semibold mb-2">📞 Liên Hệ Khẩn Cấp</p>
                  <div className="space-y-1 text-sm">
                    <p className="font-bold text-cyan-700">Công An: 0297 3845 166</p>
                    <p className="font-bold text-cyan-700">Cấp Cứu: 0297 3845 117</p>
                    <p className="font-bold text-cyan-700">Trạm Y Tế: 0297 3845 117</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advertisement Space */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg p-6 text-white text-center">
              <div className="text-4xl mb-3">🏝️</div>
              <h4 className="font-bold text-lg mb-2">Không Gian Quảng Cáo</h4>
              <p className="text-sm text-cyan-100 mb-4">
                Liên hệ để quảng bá dịch vụ của bạn
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-xs">
                <p className="font-semibold">📧 Email: ads@thochu.vn</p>
                <p className="font-semibold mt-1">📱 Hotline: 02973845166</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📊</span> Thống Kê Du Lịch
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Dịch vụ đăng ký</span>
                  <span className="font-bold text-cyan-600">{services.length}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Nhà hàng</span>
                  <span className="font-bold text-cyan-600">
                    {services.filter(s => s.category === 'restaurant').length}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Khách sạn</span>
                  <span className="font-bold text-cyan-600">
                    {services.filter(s => s.category === 'hotel').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tour du lịch</span>
                  <span className="font-bold text-cyan-600">
                    {services.filter(s => s.category === 'tour').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
