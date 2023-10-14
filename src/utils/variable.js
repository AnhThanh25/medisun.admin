export const typePlaceLst = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: "Trạm y tế",
    label: "Trạm y tế",
  },
  {
    value: "Bệnh viện",
    label: "Bệnh viện",
  },
  {
    value: "Bệnh viện tư nhân",
    label: "Bệnh viện tư nhân",
  },
  {
    value: "Chi nhánh",
    label: "Chi nhánh",
  },
  {
    value: "Công ty",
    label: "Công ty",
  },
  {
    value: "Phòng khám chuyên khoa",
    label: "Phòng khám chuyên khoa",
  },
  {
    value: "Phòng khám đa khoa",
    label: "Phòng khám đa khoa",
  },
  {
    value: "Sở y tế",
    label: "Sở y tế",
  },
  {
    value: "Trung tâm y tế",
    label: "Trung tâm y tế",
  },
  {
    value: "Bảo hiểm xã hội Tỉnh/TP",
    label: "Bảo hiểm xã hội Tỉnh/TP",
  },
  {
    value: "Nhà xe",
    label: "Nhà xe",
  },
  {
    value: "Quầy thuốc/Nhà thuốc",
    label: "Quầy thuốc/Nhà thuốc",
  },
  {
    value: "Tạp Hóa",
    label: "Tạp Hóa",
  },
  {
    value: "Siêu Thị",
    label: "Siêu Thị",
  },
];

export const rankLst = [
  {
    label: "6T k đơn",
    value: 0,
  },
  {
    label: "Silver",
    value: 1,
  },
  {
    label: "Titan",
    value: 2,
  },
  {
    label: "Gold",
    value: 3,
  },
  {
    label: "Platium",
    value: 4,
  },
];

export const areaLst = ["Miền Bắc", "Miền Trung", "Miền Nam"];

export const careTypeLst = [
  {
    text: "Đăng ký thành viên",
    options: [
      {
        text: "Đăng ký qua Zalo",
      },
      {
        text: "Đăng ký qua Gmail",
      },
      {
        text: "Đăng ký qua Facebook",
      },
    ],
  },
  {
    text: "Chăm sóc qua Broadcast",
    options: [
      {
        text: "CT thường quy",
      },
      {
        text: "CT phát sinh",
      },
    ],
    resuilts: [
      { text: "Phát sinh đơn" },
      {
        text: "Không phát sinh đơn",
        options: [
          { text: "Tư vấn sản phẩm" },
          { text: "Tư vấn chương trình" },
          { text: "Pass thông tin KD" },
        ],
      },
    ],
  },

  {
    text: "Chăm sóc qua sinh nhật",
    options: [
      {
        text: "Khuyến khích lên điểm",
      },
      {
        text: "Tư vấn lên điểm",
      },
    ],
    resuilts: [
      { text: "KH lên đơn dưới 9 điểm" },
      { text: "KH lên từ 10 - 49 điểm" },
      { text: "KH lên từ 50 - 100 điểm" },
      { text: "Tư vấn lên điểm" },
    ],
  },
  {
    text: "Chăm sóc qua tổng đài CSKH",
    options: [
      {
        text: "Khuyến khích lên điểm",
      },
      {
        text: "Nhắc nhở giảm hạng",
      },
      {
        text: "Tư vấn chương trình",
      },
    ],
    resuilts: [
      { text: "KH lên điểm" },
      { text: "Liên hệ thành công" },
      { text: "KH đồng ý chăm sóc qua OA" },
    ],
  },
  {
    text: "Tặng quà sinh nhật",
    options: [
      {
        text: "Đã xác nhận",
      },
      {
        text: "Chưa xác nhận",
      },
    ],
    resuilts: [
      { text: "Sai số" },
      { text: "Liên hệ sau" },
      { text: "Không liên hệ được" },
      { text: "Đã liên hệ" },
    ],
    gifts: [
      { text: "Chuột không dây" },
      { text: "Loa Bluetooth" },
      { text: "Cân điện tử" },
      { text: "Bộ chăn gối" },
      { text: "Đế tản nhiệt" },
      { text: "Máy đo huyết áp" },
      { text: "Nhiệt kế" },
    ],
    typeResuilts: [
      { text: "KH đã nhận quà" },
      { text: "Đã gửi quà" },
      { text: "Hủy tặng quà" },
    ],
  },
];

import { getUserName, getToken } from "@/utils/auth";

export function urlUploadImageCare(rowID) {
  return `http://202.191.56.172/PKPosAPI/File/UploadImageCare?UserName=${getUserName()}&Token=${getToken()}&RowID=${rowID}`;
}
export const monthLst = [
  { text: "Tháng 1", value: 1 },
  { text: "Tháng 2", value: 2 },
  { text: "Tháng 3", value: 3 },
  { text: "Tháng 4", value: 4 },
  { text: "Tháng 5", value: 5 },
  { text: "Tháng 6", value: 6 },
  { text: "Tháng 7", value: 7 },
  { text: "Tháng 8", value: 8 },
  { text: "Tháng 9", value: 9 },
  { text: "Tháng 10", value: 10 },
  { text: "Tháng 11", value: 11 },
  { text: "Tháng 12", value: 12 },
];
