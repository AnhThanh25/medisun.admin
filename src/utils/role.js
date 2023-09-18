export function getRoleText(data) {
  if (data == 1) {
    return "Nhân viên";
  }
  if (data == 2) {
    return "Nha sĩ";
  }
  if (data == 3) {
    return "Y tá";
  }
  if (data == 10) {
    return "Admin";
  }
  return "Nhân viên";
}

export const roleLst = [
  { value: 1, text: "Nhân viên" },
  { value: 2, text: "Nha sĩ" },
  { value: 3, text: "Y tá" },
  { value: 10, text: "Admin" },
];
