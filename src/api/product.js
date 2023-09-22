import request from "@/utils/request";

export function PKUpdateProductInfo(data) {
  return request({
    url: "Product/PKUpdateProductInfo",
    method: "post",
    data: data,
  });
}
export function PKDelProductInfo(data) {
  return request({
    url: "Product/PKDelProductInfo",
    method: "post",
    data: data,
  });
}
export function PKGetProductLst(data) {
  return request({
    url: "Product/PKGetProductLst",
    method: "post",
    data: data,
  });
}
