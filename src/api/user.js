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

export function UserLogin(data) {
  return request({
    url: "User/UserLogin",
    method: "post",
    data: data,
  });
}

export function LostPassword(data) {
  return request({
    url: "User/LostPassword",
    method: "post",
    data: data,
  });
}

export function CheckOTPLostPassword(data) {
  return request({
    url: "User/CheckOTPLostPassword",
    method: "post",
    data: data,
  });
}
export function AddAccountClinic(data) {
  return request({
    url: "User/AddAccountClinic",
    method: "post",
    data: data,
  });
}
export function UpdateAccount(data) {
  return request({
    url: "User/UpdateAccount",
    method: "post",
    data: data,
  });
}
export function GetEmployLst(data) {
  return request({
    url: "User/GetEmployLst",
    method: "post",
    data: data,
  });
}
