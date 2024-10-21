import request from "@/utils/request";

export function GetProductLst(data) {
  return request({
    url: "Product/GetProductLst",
    method: "post",
    data: data,
  });
}

export function GetProductInfo(data) {
  return request({
    url: "Product/GetProductInfo",
    method: "post",
    data: data,
  });
}

export function UpdateProductInfo(data) {
  return request({
    url: "Product/UpdateProductInfo",
    method: "post",
    data: data,
  });
}

export function DelProductInfo(data) {
  return request({
    url: "Product/DelProductInfo",
    method: "post",
    data: data,
  });
}

export function DelImageProduct(data) {
  return request({
    url: "Product/DelImageProduct",
    method: "post",
    data: data,
  });
}

