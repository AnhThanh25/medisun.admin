import request from "@/utils/request";

export function UpdateLocalStoreOutLst(data) {
  return request({
    url: "LocalStoreOut/UpdateLocalStoreOutLst",
    method: "post",
    data: data,
  });
}

export function GetLocalStoreOutLst(data) {
  return request({
    url: "LocalStoreOut/GetLocalStoreOutLst",
    method: "post",
    data: data,
  });
}
export function GetStampExportByID(data) {
  return request({
    url: "LocalStoreOut/GetStampExportByID",
    method: "post",
    data: data,
  });
}