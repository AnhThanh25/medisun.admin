import request from "@/utils/request";


export function Login(data) {
  return request({
    url: "User/Login",
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
