export interface VNeIDData {
  "Số CCCD": string;
  "Số CMND": string;
  "Họ và tên": string;
  "Giới tính": string;
  "Ngày sinh": string;
  "Nơi thường trú": string;
  "Ngày cấp CCCD": string;
}

export interface VisitorFormData extends VNeIDData {
  "Nơi tạm trú": string;
  "Ghi chú khác": string;
}
