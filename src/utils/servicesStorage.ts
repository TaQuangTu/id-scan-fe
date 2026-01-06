import type { ServicePost, Review, TourBooking } from "@/types/services";

// Storage keys
const SERVICES_KEY = "islandServices";
const REVIEWS_KEY = "serviceReviews";
const BOOKINGS_KEY = "tourBookings";

// === Service Posts Management ===
export const getServices = (): ServicePost[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(SERVICES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveService = (service: ServicePost): void => {
  const services = getServices();
  const existingIndex = services.findIndex((s) => s.id === service.id);
  
  if (existingIndex >= 0) {
    services[existingIndex] = service;
  } else {
    services.push(service);
  }
  
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
};

export const deleteService = (serviceId: string): void => {
  const services = getServices().filter((s) => s.id !== serviceId);
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  
  // Also delete related reviews and bookings
  const reviews = getReviews().filter((r) => r.serviceId !== serviceId);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  
  const bookings = getBookings().filter((b) => b.serviceId !== serviceId);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

// === Reviews Management ===
export const getReviews = (): Review[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(REVIEWS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getServiceReviews = (serviceId: string): Review[] => {
  return getReviews().filter((r) => r.serviceId === serviceId);
};

export const saveReview = (review: Review): void => {
  const reviews = getReviews();
  reviews.push(review);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
};

export const deleteReview = (reviewId: string): void => {
  const reviews = getReviews().filter((r) => r.id !== reviewId);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
};

export const getAverageRating = (serviceId: string): number => {
  const reviews = getServiceReviews(serviceId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

// === Tour Bookings Management ===
export const getBookings = (): TourBooking[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(BOOKINGS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getServiceBookings = (serviceId: string): TourBooking[] => {
  return getBookings().filter((b) => b.serviceId === serviceId);
};

export const saveBooking = (booking: TourBooking): void => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

export const updateBookingStatus = (
  bookingId: string,
  status: TourBooking["status"]
): void => {
  const bookings = getBookings();
  const booking = bookings.find((b) => b.id === bookingId);
  if (booking) {
    booking.status = status;
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }
};

export const deleteBooking = (bookingId: string): void => {
  const bookings = getBookings().filter((b) => b.id !== bookingId);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

// === Demo Data ===
export const loadDemoServices = (): void => {
  const demoServices: ServicePost[] = [
    // Restaurants
    {
      id: "service-1",
      category: "restaurant",
      title: "Nhà Hàng Hải Sản Bãi Đá",
      description: "Hải sản tươi sống đánh bắt hàng ngày. Chuyên các món: tôm hùm nướng, cua hoàng đế, mực nhồi thịt, ghẹ hấp bia. View biển tuyệt đẹp, phục vụ nhiệt tình, không gian thoáng mát.",
      images: [
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
        "https://images.unsplash.com/photo-1535850117992-1a5d3a7d855b?w=800"
      ],
      price: "200.000đ - 500.000đ/người",
      contact: "0987654321",
      location: "Bãi Đá, Thổ Chu",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "service-2",
      category: "restaurant",
      title: "Quán Ốc Đêm Thổ Chu",
      description: "Quán ốc chuyên các món nhậu, ốc luộc, ốc hấp sa tế, ốc xào dừa. Giá bình dân, phục vụ từ 6pm đến 12am. Không gian vui vẻ, phù hợp nhóm bạn.",
      images: [
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800"
      ],
      price: "50.000đ - 200.000đ/người",
      contact: "0976543210",
      location: "Chợ Thổ Chu",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "service-3",
      category: "restaurant",
      title: "Cơm Niêu Mẹ Út",
      description: "Cơm niêu truyền thống, cá nướng, canh chua. Món ăn gia đình đậm đà hương vị miền Tây. Giá rẻ, phần nhiều, phục vụ nhanh.",
      images: [
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800"
      ],
      price: "60.000đ - 120.000đ/người",
      contact: "0965432109",
      location: "Trung tâm đảo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "service-4",
      category: "restaurant",
      title: "Café Sóng Biển",
      description: "Quán cà phê view biển cực đẹp. Chuyên cà phê phin, sinh tố trái cây tươi, bánh ngọt tự làm. Không gian yên tĩnh, thích hợp ngồi chill và ngắm hoàng hôn.",
      images: [
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"
      ],
      price: "25.000đ - 70.000đ/món",
      contact: "0954321098",
      location: "Bãi biển chính",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    // Hotels
    {
      id: "service-5",
      category: "hotel",
      title: "Khách Sạn Thổ Chu Ocean View",
      description: "Khách sạn 3 sao với 20 phòng tiện nghi hiện đại, điều hòa, nước nóng, TV, minibar. Tất cả phòng đều có view biển tuyệt đẹp. Bao gồm bữa sáng buffet phong phú.",
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"
      ],
      price: "800.000đ - 1.500.000đ/đêm",
      contact: "0912345678",
      location: "Trung tâm đảo Thổ Chu",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "service-6",
      category: "hotel",
      title: "Homestay Bình Yên",
      description: "Homestay gia đình ấm cúng với 6 phòng. Thiết kế gần gũi thiên nhiên, sân vườn rộng, có võng để thư giãn. Chủ nhà thân thiện, tư vấn địa điểm tham quan.",
      images: [
        "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800"
      ],
      price: "400.000đ - 600.000đ/đêm",
      contact: "0923456789",
      location: "Gần chợ Thổ Chu",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "service-7",
      category: "hotel",
      title: "Resort Hòn Đá Bạc",
      description: "Resort cao cấp ngay sát bãi biển đẹp nhất. 15 bungalow view biển, hồ bơi, nhà hàng, bar. Dịch vụ 5 sao, hoàn hảo cho honeymoon và nghỉ dưỡng sang trọng.",
      images: [
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
      ],
      price: "2.500.000đ - 4.000.000đ/đêm",
      contact: "0934567890",
      location: "Khu vực Hòn Đá Bạc",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "service-8",
      category: "hotel",
      title: "Nhà Nghỉ Biển Xanh",
      description: "Nhà nghỉ bình dân sạch sẽ, giá rẻ. 10 phòng có điều hòa, wifi miễn phí. Thích hợp cho du khách tiết kiệm, gia đình nhỏ. Gần chợ, thuận tiện đi lại.",
      images: [
        "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800"
      ],
      price: "250.000đ - 400.000đ/đêm",
      contact: "0945678901",
      location: "Gần bến cảng",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    // Vehicles
    {
      id: "service-9",
      category: "vehicle",
      title: "Thuê Xe Máy Thổ Chu",
      description: "Cho thuê xe máy tay ga mới, giá rẻ nhất đảo. Giao xe tận nơi miễn phí. Hỗ trợ bản đồ và tư vấn lộ trình tham quan. Xe Vision, Air Blade, SH đều có.",
      images: [
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800"
      ],
      price: "150.000đ/ngày",
      contact: "0909876543",
      location: "Cảng Thổ Chu",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "service-10",
      category: "vehicle",
      title: "Thuê Xe Đạp Điện",
      description: "Cho thuê xe đạp điện để khám phá đảo. Thân thiện môi trường, tiết kiệm. Có mũ bảo hiểm, sạc pin miễn phí. Giá ưu đãi cho thuê cả ngày.",
      images: [],
      price: "100.000đ/ngày",
      contact: "0956789012",
      location: "Trung tâm đảo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "service-11",
      category: "vehicle",
      title: "Thuê Ô Tô 4 Chỗ",
      description: "Cho thuê ô tô 4 chỗ tự lái hoặc có tài xế. Xe mới, máy lạnh, đầy đủ giấy tờ bảo hiểm. Phù hợp gia đình, nhóm bạn. Có ghế trẻ em.",
      images: [
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800"
      ],
      price: "800.000đ/ngày (tự lái) - 1.200.000đ/ngày (có tài)",
      contact: "0967890123",
      location: "Cảng Thổ Chu",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    // Tours
    {
      id: "service-12",
      category: "tour",
      title: "Tour Khám Phá Đảo Thổ Chu",
      description: "Tour 1 ngày tham quan toàn bộ đảo: Hòn Đá Bạc, rừng thông biển, ngọn hải đăng, bãi biển hoang sơ, làng chài. Bao gồm: xe đưa đón, hướng dẫn viên nhiệt tình, bữa trưa hải sản, nước uống.",
      images: [
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
      ],
      price: "500.000đ/người",
      contact: "0898765432",
      location: "Khởi hành từ cảng",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "service-13",
      category: "tour",
      title: "Tour Lặn Ngắm San Hô",
      description: "Trải nghiệm lặn biển ngắm san hô đa dạng màu sắc và sinh vật biển. Cung cấp đầy đủ thiết bị lặn, áo phao, hướng dẫn viên chuyên nghiệp có chứng chỉ. Phù hợp cho người mới. Thời gian: 3-4 giờ.",
      images: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
      ],
      price: "600.000đ/người",
      contact: "0887654321",
      location: "Vùng biển Hòn Đá Bạc",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "service-14",
      category: "tour",
      title: "Tour Câu Cá & BBQ Trên Biển",
      description: "Tour nửa ngày câu cá trên thuyền, sau đó nướng BBQ ngay trên biển. Thuyền đầy đủ trang thiết bị câu cá, có hướng dẫn. BBQ hải sản tươi sống vừa câu được. Trải nghiệm độc đáo!",
      images: [
        "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=800"
      ],
      price: "450.000đ/người",
      contact: "0876543210",
      location: "Bến tàu du lịch",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "service-15",
      category: "tour",
      title: "Tour Ngắm Bình Minh & Chụp Ảnh",
      description: "Tour sớm 4:30am đi ngắm bình minh tại điểm đẹp nhất đảo. Hướng dẫn viên kiêm nhiếp ảnh gia chụp ảnh miễn phí cho bạn. Phù hợp cho các cặp đôi, người yêu thiên nhiên. Kèm bữa sáng nhẹ.",
      images: [
        "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800"
      ],
      price: "350.000đ/người",
      contact: "0865432109",
      location: "Khởi hành từ khách sạn",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "service-16",
      category: "tour",
      title: "Tour Đảo Hoang 2 Ngày 1 Đêm",
      description: "Tour phượt đảo hoang gần Thổ Chu. Camping qua đêm, lửa trại, câu cá, nướng BBQ, ngắm sao đêm. Trải nghiệm sống hòa mình với thiên nhiên. Phù hợp nhóm bạn trẻ, người thích phiêu lưu.",
      images: [
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
        "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800"
      ],
      price: "1.200.000đ/người",
      contact: "0854321098",
      location: "Bến cảng chính",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem(SERVICES_KEY, JSON.stringify(demoServices));

  // Add comprehensive demo reviews with variety
  const demoReviews: Review[] = [
    // Reviews for Restaurant 1 - Nhà Hàng Hải Sản Bãi Đá
    {
      id: "review-1",
      serviceId: "service-1",
      userName: "Nguyễn Văn Anh",
      rating: 5,
      comment: "Hải sản tươi ngon không tưởng! Tôm hùm nướng mỡ hành ăn mê luôn. Giá cả hợp lý so với chất lượng. View biển đẹp, phục vụ nhiệt tình. 10/10 sẽ quay lại!",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-2",
      serviceId: "service-1",
      userName: "Trần Thị Mai",
      rating: 5,
      comment: "Lần đầu ăn cua hoàng đế ngon đến thế. Mực nhồi thịt cũng tuyệt vời. Nhân viên dễ thương, tư vấn món ăn rất chi tiết. Không gian sạch sẽ, view đẹp!",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-3",
      serviceId: "service-1",
      userName: "Lê Minh Tuấn",
      rating: 4,
      comment: "Hải sản tươi, đồ ăn ngon. Có điều hơi đông khách nên phải đợi lâu một chút. Nên đặt bàn trước. Nhưng nhìn chung rất đáng để thử!",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-4",
      serviceId: "service-1",
      userName: "Phạm Thu Hà",
      rating: 5,
      comment: "Gia đình mình 6 người ăn rất no nê, bill khoảng 2tr. So với Hà Nội thì rẻ hơn nhiều mà chất lượng vượt trội. Ghẹ hấp bia quá đỉnh!",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Reviews for Restaurant 2 - Quán Ốc Đêm
    {
      id: "review-5",
      serviceId: "service-2",
      userName: "Hoàng Văn Nam",
      rating: 5,
      comment: "Quán ốc ngon bổ rẻ! Ốc hương xào sa tế cay nồng ăn hoài không chán. Giá siêu rẻ, nhậu nhẹt tốn có 300k/4 người. Quán đông vui, không khí sôi động!",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-6",
      serviceId: "service-2",
      userName: "Võ Thị Lan",
      rating: 4,
      comment: "Ốc tươi, giá tốt. Không gian hơi chật khi đông khách nhưng vẫn ok. Ốc luộc, ốc hấp đều ngon. Phù hợp cho các bạn trẻ thích nhậu.",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Reviews for Restaurant 4 - Café Sóng Biển
    {
      id: "review-7",
      serviceId: "service-4",
      userName: "Đỗ Minh Châu",
      rating: 5,
      comment: "Quán cà phê view đẹp nhất đảo! Ngồi chill ngắm hoàng hôn quá lãng mạn. Cà phê phin ngon, sinh tố bơ sánh mịn. Giá hợp lý. Phục vụ chu đáo!",
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-8",
      serviceId: "service-4",
      userName: "Bùi Thanh Tùng",
      rating: 5,
      comment: "Không gian yên tĩnh, thoải mái. Ngồi làm việc remote cả ngày mà không thấy nhàm. Có wifi mạnh, điện đầy đủ. Đồ uống ngon, nhân viên dễ thương!",
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Reviews for Hotel 5 - Ocean View
    {
      id: "review-9",
      serviceId: "service-5",
      userName: "Ngô Thành Đạt",
      rating: 5,
      comment: "Khách sạn đẹp, phòng sạch sẽ, view biển tuyệt vời! Bữa sáng buffet đa dạng, đồ ăn ngon. Nhân viên chuyên nghiệp. Đáng giá tiền!",
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-10",
      serviceId: "service-5",
      userName: "Trương Thị Hương",
      rating: 4,
      comment: "Phòng đẹp, thoáng mát, giường ngủ êm. Wifi hơi yếu một chút nhưng chấp nhận được. Nhìn chung rất hài lòng. Phù hợp cho gia đình!",
      createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-11",
      serviceId: "service-5",
      userName: "Lý Quang Minh",
      rating: 5,
      comment: "Vợ chồng mình đi honeymoon, chọn khách sạn này quá đúng đắn. Phòng romantic, có ban công nhìn ra biển. Sáng ngắm bình minh siêu đẹp!",
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Reviews for Hotel 6 - Homestay Bình Yên
    {
      id: "review-12",
      serviceId: "service-6",
      userName: "Phan Văn Hải",
      rating: 5,
      comment: "Homestay rất ấm cúng như ở nhà. Chú chủ nhà thân thiện, tư vấn địa điểm tham quan nhiệt tình. Sân vườn đẹp, có võng nằm ngắm trời. Giá rẻ mà chất lượng tốt!",
      createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-13",
      serviceId: "service-6",
      userName: "Đinh Thị Trang",
      rating: 5,
      comment: "Chị chủ nấu ăn ngon lắm! Mình có đặt cơm tối ở đây. Không gian yên tĩnh, phù hợp để nghỉ ngơi thư giãn. Sẽ giới thiệu bạn bè!",
      createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Reviews for Hotel 7 - Resort Hòn Đá Bạc
    {
      id: "review-14",
      serviceId: "service-7",
      userName: "Vũ Minh Quân",
      rating: 5,
      comment: "Resort đẳng cấp 5 sao! Bungalow riêng tư, hồ bơi infinity view biển cực đỉnh. Nhà hàng món ngon, phục vụ chu đáo. Trải nghiệm tuyệt vời!",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-15",
      serviceId: "service-7",
      userName: "Mai Hoàng Anh",
      rating: 4,
      comment: "Resort đẹp, sang trọng. Giá hơi cao nhưng xứng đáng. Phù hợp cho kỳ nghỉ đặc biệt. Bãi biển riêng rất sạch!",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Reviews for Vehicle 9 - Thuê Xe Máy
    {
      id: "review-16",
      serviceId: "service-9",
      userName: "Cao Văn Đức",
      rating: 5,
      comment: "Thuê xe rất tiện! Xe mới, giá rẻ. Chủ giao xe tận nơi và cho bản đồ kèm tư vấn lộ trình tham quan. Rất hài lòng!",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-17",
      serviceId: "service-9",
      userName: "Hồ Thị Ngọc",
      rating: 5,
      comment: "Xe máy chạy êm, xăng đầy. Giá 150k/ngày rất ok. Chủ nhiệt tình, giải thích cách đi rất chi tiết. Sẽ thuê lại lần sau!",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-18",
      serviceId: "service-9",
      userName: "Tô Minh Phương",
      rating: 4,
      comment: "Dịch vụ tốt, xe ổn. Có nhiều loại xe để chọn. Mình thuê SH rất đẹp. Giao trả xe linh hoạt!",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Reviews for Tour 12 - Khám Phá Đảo
    {
      id: "review-19",
      serviceId: "service-12",
      userName: "Dương Văn Sơn",
      rating: 5,
      comment: "Tour rất đáng tham gia! Đi hết các điểm đẹp trên đảo. Hướng dẫn viên anh Tú nhiệt tình, giải thích chi tiết. Bữa trưa hải sản ngon. Giá 500k quá hợp lý!",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-20",
      serviceId: "service-12",
      userName: "Lưu Thị Hồng",
      rating: 5,
      comment: "Tour tuyệt vời! Đi hết các địa điểm nổi tiếng. Hòn Đá Bạc đẹp lung linh. Hải đăng view đỉnh của chóp. Nên đi tour này để nắm hết đảo!",
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-21",
      serviceId: "service-12",
      userName: "Đặng Quốc Tuấn",
      rating: 5,
      comment: "Cả gia đình 6 người đi tour rất vui. Trẻ con thích lắm. Hướng dẫn viên chăm sóc chu đáo. Lịch trình hợp lý, không vội vàng. Recommend!",
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-22",
      serviceId: "service-12",
      userName: "Nguyễn Thị Phương",
      rating: 4,
      comment: "Tour ok, đi nhiều địa điểm. Bữa trưa ngon. Chỉ có hơi mệt vì đi nhiều. Nhưng nhìn chung rất đáng!",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Reviews for Tour 13 - Lặn San Hô
    {
      id: "review-23",
      serviceId: "service-13",
      userName: "Hà Văn Long",
      rating: 5,
      comment: "Trải nghiệm lặn biển tuyệt vời! San hô đẹp, nhiều cá. Hướng dẫn viên hướng dẫn kỹ, an toàn. Lần đầu lặn mà mình không sợ. Thiết bị đầy đủ!",
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-24",
      serviceId: "service-13",
      userName: "Phan Thị Thanh",
      rating: 5,
      comment: "San hô đẹp không tưởng! Màu sắc rực rỡ, cá nhiều loại. Anh hướng dẫn có chứng chỉ quốc tế, rất chuyên nghiệp. Bảo đảm an toàn 100%!",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-25",
      serviceId: "service-13",
      userName: "Lâm Minh Tâm",
      rating: 4,
      comment: "Lặn rất thú vị, nhìn được san hô đẹp. Có chút khó thở lúc đầu nhưng sau quen. Nước biển trong xanh. Nên thử!",
      createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Reviews for Tour 14 - Câu Cá BBQ
    {
      id: "review-26",
      serviceId: "service-14",
      userName: "Trịnh Văn Hùng",
      rating: 5,
      comment: "Tour câu cá siêu vui! Nhóm mình câu được nhiều cá, mực. BBQ ngay trên thuyền quá đã. Bia lạnh, không khí vui vẻ. Trải nghiệm khó quên!",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-27",
      serviceId: "service-14",
      userName: "Lê Thị Bích",
      rating: 5,
      comment: "Lần đầu đi câu cá trên biển. Rất hài lòng! Thuyền ổn định, có mái che. Nướng cá tươi vừa câu lên ngon không tả. Giá 450k rất hợp lý!",
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Reviews for Tour 15 - Ngắm Bình Minh
    {
      id: "review-28",
      serviceId: "service-15",
      userName: "Vương Thị Mai",
      rating: 5,
      comment: "Bình minh trên đảo Thổ Chu đẹp như tranh vẽ! Anh hướng dẫn viên chụp ảnh cho mình rất đẹp. 4:30 sáng dậy hơi mệt nhưng xứng đáng. Cặp đôi nên đi!",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-29",
      serviceId: "service-15",
      userName: "Huỳnh Văn Thắng",
      rating: 5,
      comment: "Trải nghiệm lãng mạn! Ngắm mặt trời mọc, chụp ảnh đẹp. Bữa sáng bánh mì pate nóng hổi. Hướng dẫn dẫn đến điểm view cực đỉnh!",
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Reviews for Tour 16 - Đảo Hoang 2N1Đ
    {
      id: "review-30",
      serviceId: "service-16",
      userName: "Phạm Minh Tuấn",
      rating: 5,
      comment: "Tour phượt đỉnh của chóp! Camping trên đảo hoang, lửa trại, ngắm sao trời đêm. Trải nghiệm hoang dã thật sự. Phù hợp người thích phiêu lưu. Nhóm bạn mình 8 người vui lắm!",
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-31",
      serviceId: "service-16",
      userName: "Tạ Thị Hoa",
      rating: 4,
      comment: "Trải nghiệm mới mẻ! Ngủ lều, câu cá, BBQ, hát hò đêm. Hơi vất vả một chút nhưng rất đáng nhớ. Hướng dẫn viên nhiệt tình, chu đáo!",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  localStorage.setItem(REVIEWS_KEY, JSON.stringify(demoReviews));

  // Add demo bookings
  const demoBookings: TourBooking[] = [
    {
      id: "booking-1",
      serviceId: "service-12",
      customerName: "Nguyễn Văn Hoàng",
      customerPhone: "0901234567",
      customerCCCD: "001234567890",
      tourDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      numberOfPeople: 4,
      notes: "Gia đình có 2 trẻ em 6 tuổi và 8 tuổi",
      status: "confirmed",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "booking-2",
      serviceId: "service-13",
      customerName: "Trần Thị Lan Anh",
      customerPhone: "0912345678",
      customerCCCD: "098765432101",
      tourDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      numberOfPeople: 2,
      notes: "Lần đầu lặn, cần hướng dẫn kỹ",
      status: "pending",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "booking-3",
      serviceId: "service-14",
      customerName: "Lê Minh Đức",
      customerPhone: "0923456789",
      customerCCCD: "012345678902",
      tourDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      numberOfPeople: 6,
      notes: "Nhóm bạn 6 người, muốn tour buổi chiều",
      status: "confirmed",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "booking-4",
      serviceId: "service-15",
      customerName: "Phạm Thu Hương",
      customerPhone: "0934567890",
      customerCCCD: "087654321098",
      tourDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      numberOfPeople: 2,
      notes: "Cặp đôi honeymoon, cần photographer chụp ảnh đẹp",
      status: "confirmed",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "booking-5",
      serviceId: "service-16",
      customerName: "Hoàng Văn Thành",
      customerPhone: "0945678901",
      customerCCCD: "076543210987",
      tourDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      numberOfPeople: 8,
      notes: "Nhóm 8 người, có kinh nghiệm camping",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "booking-6",
      serviceId: "service-12",
      customerName: "Võ Thị Kim Ngân",
      customerPhone: "0956789012",
      customerCCCD: "065432109876",
      tourDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      numberOfPeople: 3,
      notes: "3 người lớn, khởi hành buổi sáng",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(demoBookings));
};

export const clearAllServices = (): void => {
  localStorage.removeItem(SERVICES_KEY);
  localStorage.removeItem(REVIEWS_KEY);
  localStorage.removeItem(BOOKINGS_KEY);
};
