// Demo data generator for Thổ Chu Island Check-in System

export const generateDemoData = () => {
  const demoVisitors = [
    {
      "Số CCCD": "062098001234",
      "Số CMND": "233252111",
      "Họ và tên": "Nguyễn Văn An",
      "Giới tính": "Nam",
      "Ngày sinh": "15/05/1990",
      "Nơi thường trú": "123 Đường Lê Lợi, Phường 1, Quận 1, TP. Hồ Chí Minh",
      "Ngày cấp CCCD": "01/01/2022",
      "Nơi tạm trú": "Khách sạn Biển Xanh, Đảo Thổ Chu",
      "Ghi chú khác": "Du lịch gia đình, lưu trú 3 ngày 2 đêm",
      "checkInTime": new Date(Date.now() - 3600000).toISOString()
    },
    {
      "Số CCCD": "079095002345",
      "Số CMND": "212345222",
      "Họ và tên": "Trần Thị Bình",
      "Giới tính": "Nữ",
      "Ngày sinh": "20/08/1995",
      "Nơi thường trú": "456 Đường Trần Hưng Đạo, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
      "Ngày cấp CCCD": "15/03/2023",
      "Nơi tạm trú": "Nhà nghỉ Hải Đăng, Đảo Thổ Chu",
      "Ghi chú khác": "Công tác và du lịch",
      "checkInTime": new Date(Date.now() - 7200000).toISOString()
    },
    {
      "Số CCCD": "001088003456",
      "Số CMND": "198765333",
      "Họ và tên": "Lê Minh Cường",
      "Giới tính": "Nam",
      "Ngày sinh": "10/12/1988",
      "Nơi thường trú": "789 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      "Ngày cấp CCCD": "20/06/2022",
      "Nơi tạm trú": "Homestay Thổ Chu Paradise",
      "Ghi chú khác": "Nghỉ dưỡng cuối tuần",
      "checkInTime": new Date(Date.now() - 1800000).toISOString()
    },
    {
      "Số CCCD": "024093004567",
      "Số CMND": "187654444",
      "Họ và tên": "Phạm Thu Hà",
      "Giới tính": "Nữ",
      "Ngày sinh": "25/03/1993",
      "Nơi thường trú": "321 Đường Hai Bà Trưng, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh",
      "Ngày cấp CCCD": "10/09/2023",
      "Nơi tạm trú": "Resort Đảo Ngọc",
      "Ghi chú khác": "Honeymoon, lưu trú 5 ngày",
      "checkInTime": new Date(Date.now() - 5400000).toISOString()
    },
    {
      "Số CCCD": "036087005678",
      "Số CMND": "176543555",
      "Họ và tên": "Hoàng Văn Đức",
      "Giới tính": "Nam",
      "Ngày sinh": "05/07/1987",
      "Nơi thường trú": "654 Đường Pasteur, Phường 6, Quận 3, TP. Hồ Chí Minh",
      "Ngày cấp CCCD": "05/12/2021",
      "Nơi tạm trú": "Khách sạn Sao Biển",
      "Ghi chú khác": "Chuyến công tác khảo sát",
      "checkInTime": new Date(Date.now() - 10800000).toISOString()
    }
  ];

  return demoVisitors;
};

export const loadDemoData = () => {
  const demoData = generateDemoData();
  localStorage.setItem("checkedInVisitors", JSON.stringify(demoData));
  return demoData;
};

export const clearAllData = () => {
  localStorage.removeItem("checkedInVisitors");
};
