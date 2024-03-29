import request from "@/utils/request";


export function GetRequestOrderLst(data) {
  return request({
    url: 'TRequestOrder/TGetRequestOrderLst',
    method: 'post',
    data: data,
  })
}

export function UpdateRequestOrder(data) {
  return request({
    url: 'TRequestOrder/TUpdateRequestOrder',
    method: 'post',
    data: data,
  })
}
