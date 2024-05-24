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


export function DTPGetValue(data) {
  return request({
    url: "Default/DTPGetValue",
    method: "post",
    data: data,
  });
}


