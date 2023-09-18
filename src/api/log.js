import request from "@/utils/request";

export function GetLogLst(data) {
  return request({
    url: "PKLog/GetLogLst",
    method: "post",
    data: data,
  });
}
