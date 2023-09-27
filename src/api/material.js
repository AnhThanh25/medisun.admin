import request from "@/utils/request";

export function GetMaterialLst(data) {
  return request({
    url: "PKMaterial/GetMaterialLst",
    method: "post",
    data: data,
  });
}
export function AddMaterial(data) {
  return request({
    url: "PKMaterial/AddMaterial",
    method: "post",
    data: data,
  });
}
export function DelMaterial(data) {
  return request({
    url: "PKMaterial/DelMaterial",
    method: "post",
    data: data,
  });
}
export function GetOrderMaterialLst(data) {
  return request({
    url: "PKMaterial/GetOrderMaterialLst",
    method: "post",
    data: data,
  });
}
export function AddOrderMaterial(data) {
  return request({
    url: "PKMaterial/AddOrderMaterial",
    method: "post",
    data: data,
  });
}
export function DelOrderMaterial(data) {
  return request({
    url: "PKMaterial/DelOrderMaterial",
    method: "post",
    data: data,
  });
}
