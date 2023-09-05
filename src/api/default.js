import request from "@/utils/request";

export function GetCity(data) {
  return request({
    url: "Default/GetCity",
    method: "post",
    data: data,
  });
}

export function GetDistrictByCity(data) {
  return request({
    url: "Default/GetDistrictByCity",
    method: "post",
    data: data,
  });
}

export function GetCommuneByCityAndDistrict(data) {
  return request({
    url: "Default/GetCommuneByCityAndDistrict",
    method: "post",
    data: data,
  });
}
