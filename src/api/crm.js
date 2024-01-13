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

export function GetPlaceLstByCity(data) {
  return request({
    url: "DairyCRM/GetPlaceLstByCity",
    method: "post",
    data: data,
  });
}

export function GetPlaceLstByLevel(data) {
  return request({
    url: "DairyCRM/GetPlaceLstByLevel",
    method: "post",
    data: data,
  });
}

export function GetPlaceByID(data) {
  return request({
    url: "DairyCRM/GetPlaceByID",
    method: "post",
    data: data,
  });
}

export function UpdatePlaceByID(data) {
  return request({
    url: "DairyCRM/UpdatePlaceByID",
    method: "post",
    data: data,
  });
}

export function CreateCRM(data) {
  return request({
    url: "DairyCRM/CreateCRM",
    method: "post",
    data: data,
  });
}

export function SearchHistoryUser(data) {
  return request({
    url: "DairyCRM/SearchHistoryUser",
    method: "post",
    data: data,
  });
}

export function SearchHistoryUser2(data) {
  return request({
    url: "DairyCRM/SearchHistoryUser2",
    method: "post",
    data: data,
  });
}

export function GetPlaceLstByBirthday(data) {
  return request({
    url: "DairyCRM/GetPlaceLstByBirthday",
    method: "post",
    data: data,
  });
}

export function GetRankInfoLst(data) {
  return request({
    url: "DairyCRM/GetRankInfoLst",
    method: "post",
    data: data,
  });
}

export function UpdateLocalByID(data) {
  return request({
    url: "DairyCRM/UpdateLocalByID",
    method: "post",
    data: data,
  });
}
export function AddPlaceByID(data) {
  return request({
    url: "DairyCRM/AddPlaceByID",
    method: "post",
    data: data,
  });
}
export function GetPlaceLst(data) {
  return request({
    url: "DairyCRM/GetPlaceLst",
    method: "post",
    data: data,
  });
}
export function GetPlaceStandardLst(data) {
  return request({
    url: "DairyCRM/GetPlaceStandardLst",
    method: "post",
    data: data,
  });
}
export function GetSearchPlaceLst(data) {
  return request({
    url: "DairyCRM/GetSearchPlaceLst",
    method: "post",
    data: data,
  });
}
export function CreatePlaceStandard(data) {
  return request({
    url: "DairyCRM/CreatePlaceStandard",
    method: "post",
    data: data,
  });
}
export function DelPlaceStandard(data) {
  return request({
    url: "DairyCRM/DelPlaceStandard",
    method: "post",
    data: data,
  });
}

export function GetProductSalesByPlaceID(data) {
  return request({
    url: "DairyCRM/GetProductSalesByPlaceID",
    method: "post",
    data: data,
  });
}

