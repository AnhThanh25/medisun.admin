import request from "@/utils/request";

export function GetDebtMedicalLst(data) {
  return request({
    url: "PKDebtMedical/GetDebtMedicalLst",
    method: "post",
    data: data,
  });
}
export function AddDebtMedical(data) {
  return request({
    url: "PKDebtMedical/AddDebtMedical",
    method: "post",
    data: data,
  });
}
export function DelDebtMedical(data) {
  return request({
    url: "PKDebtMedical/DelDebtMedical",
    method: "post",
    data: data,
  });
}
