import request from "@/utils/request";

export function CreateLocalStoreIn(data) {
  return request({
    url: "LocalStore/CreateLocalStoreIn",
    method: "post",
    data: data,
  });
}
export function UpdateLocalStoreIn(data) {
  return request({
    url: "LocalStore/UpdateLocalStoreIn",
    method: "post",
    data: data,
  });
}
export function DelLocalStoreIn(data) {
  return request({
    url: "LocalStore/DelLocalStoreIn",
    method: "post",
    data: data,
  });
}
export function GetLocalStoreInLst(data) {
  return request({
    url: "LocalStore/GetLocalStoreInLst",
    method: "post",
    data: data,
  });
}
export function GetStampProduct(data) {
  return request({
    url: "LocalStore/GetStampProduct",
    method: "post",
    data: data,
  });
}

export function GetStampImportByID(data) {
  return request({
    url: "LocalStore/GetStampImportByID",
    method: "post",
    data: data,
  });
}
