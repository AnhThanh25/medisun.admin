import request from "@/utils/request";

export function GetStampLst(data) {
  return request({
    url: "DTStamp/GetStampLst",
    method: "post",
    data: data,
  });
}
