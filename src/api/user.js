import request from "@/utils/request";

export function UserRegister(data) {
  return request({
    url: "User/UserRegister",
    method: "post",
    data: data,
  });
}
export function GetOTPCheck(data) {
  return request({
    url: "User/GetOTPCheck",
    method: "post",
    data: data,
  });
}
