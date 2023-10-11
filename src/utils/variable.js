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
];

import { getUserName, getToken } from "@/utils/auth";

export function urlUploadImageCare(rowID) {
  return `http://202.191.56.172/PKPosAPI/File/UploadImageCare?UserName=${getUserName()}&Token=${getToken()}&RowID=${rowID}`;
}