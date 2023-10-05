import request from "@/utils/request";

export function GetCRMLstByCity(data) {
  return request({
    url: "DairyCRM/GetCRMLstByCity",
    method: "post",
    data: data,
  });
}
export function GetPlaceLstByID(data) {
  return request({
    url: "DairyCRM/GetPlaceLstByID",
    method: "post",
    data: data,
  });
}
export function GetCRMLstByLevel(data) {
  return request({
    url: "DairyCRM/GetCRMLstByLevel",
    method: "post",
    data: data,
  });
}

