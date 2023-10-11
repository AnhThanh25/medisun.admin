import request from "@/utils/request";
import requestC from "@/utils/request-cpc1hn";

export function GetCity(data) {
  return requestC({
    url: "Default/GetCity",
    method: "post",
    data: data,
  });
}

export function GetDistrictByCity(data) {
  return requestC({
    url: "Default/GetDistrictByCity",
    method: "post",
    data: data,
  });
}

export function GetCommuneByCityAndDistrict(data) {
  return requestC({
    url: "Default/GetCommuneByCityAndDistrict",
    method: "post",
    data: data,
  });
}

export function GetDefaultValue(data) {
  return request({
    url: "Default/GetDefaultValue",
    method: "post",
    data: data,
  });
}

export function GetDefaultLst(data) {
  return request({
    url: "Default/GetDefaultLst",
    method: "post",
    data: data,
  });
}

export function CreateDefaultValue(data) {
  return request({
    url: "Default/CreateDefaultValue",
    method: "post",
    data: data,
  });
}

export function UpdateDefaultValue(data) {
  return request({
    url: "Default/UpdateDefaultValue",
    method: "post",
    data: data,
  });
}

export function DelDefaultValue(data) {
  return request({
    url: "Default/DelDefaultValue",
    method: "post",
    data: data,
  });
}

