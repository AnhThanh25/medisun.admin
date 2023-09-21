export function getStatusAppointment(data) {
  if (data == 1) {
    return { Text: "Mới tạo", Color: "blue" };
  }
  if (data == 2) {
    return { Text: "Đã sửa", Color: "info" };
  }
  if (data == 3) {
    return { Text: "Đã đến", Color: "warning" };
  }
  if (data == 4) {
    return { Text: "Đã xong", Color: "success" };
  }
  if (data == 0) {
    return { Text: "Hủy", Color: "error" };
  }
  return { Text: "Hủy", Color: "error" };
}

export const appointmentStatusLst = [
  { value: 1, text: "Mới tạo" },
  { value: 2, text: "Đã sửa" },
  { value: 3, text: "Đã đến" },
  { value: 4, text: "Đã xong" },
  { value: 0, text: "Hủy" },
];
