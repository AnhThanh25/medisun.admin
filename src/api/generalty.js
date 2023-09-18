import request from "@/utils/request";

export function GetGeneraltyLst(data) {
  return request({
    url: "PKGeneralty/GetGeneraltyLst",
    method: "post",
    data: data,
  });
}
export function GetGeneraltyByID(data) {
  return request({
    url: "PKGeneralty/GetGeneraltyByID",
    method: "post",
    data: data,
  });
}
export function AddGeneralty(data) {
  return request({
    url: "PKGeneralty/AddGeneralty",
    method: "post",
    data: data,
  });
}
