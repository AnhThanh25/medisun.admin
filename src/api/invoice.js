import request from "@/utils/request";

export function GetInvoiceLst(data) {
  return request({
    url: "DTInvoice/GetInvoiceLst",
    method: "post",
    data: data,
  });
}

export function GetInvoiceInfo(data) {
  return request({
    url: "DTInvoice/GetInvoiceInfo",
    method: "post",
    data: data,
  });
}

export function DelInvoiceInfo(data) {
  return request({
    url: "DTInvoice/DelInvoiceInfo",
    method: "post",
    data: data,
  });
}
export function UpdateInvoiceInfo(data) {
  return request({
    url: "DTInvoice/UpdateInvoiceInfo",
    method: "post",
    data: data,
  });
}
export function UpdateInvoiceLst(data) {
  return request({
    url: "DTInvoice/UpdateInvoiceLst",
    method: "post",
    data: data,
  });
}