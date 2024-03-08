import request from "@/utils/request";
import requestSX from "@/utils/requestSX";

export function GetStampLst(data) {
  return request({
    url: "DTStamp/GetStampLst",
    method: "post",
    data: data,
  });
}

export function CheckHistoryStamp(data) {
  return requestSX({
    url: "SX/CheckHistoryStamp",
    method: "post",
    data: data,
  });
}
