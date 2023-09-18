import request from "@/utils/request";

export function GetServiceLst(data) {
  return request({
    url: "PKService/GetServiceLst",
    method: "post",
    data: data,
  });
}
export function AddService(data) {
  return request({
    url: "PKService/AddService",
    method: "post",
    data: data,
  });
}
export function UpdateService(data) {
  return request({
    url: "PKService/UpdateService",
    method: "post",
    data: data,
  });
}
export function DelService(data) {
  return request({
    url: "PKService/DelService",
    method: "post",
    data: data,
  });
}
