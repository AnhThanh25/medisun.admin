import request from "@/utils/request";

export function GetDashHomeLst(data) {
  return request({
    url: "PKDashHome/GetDashHomeLst",
    method: "post",
    data: data,
  });
}

export function AddDashHomeLst(data) {
  return request({
    url: "PKDashHome/AddDashHomeLst",
    method: "post",
    data: data,
  });
}

export function UpdateDashHomeLst(data) {
  return request({
    url: "PKDashHome/UpdateDashHomeLst",
    method: "post",
    data: data,
  });
}
