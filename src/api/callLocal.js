import request from "@/utils/request";

export function GetCallLocalLst(data) {
  return request({
    url: "Call/GetCallLocalLst",
    method: "post",
    data: data,
  });
}