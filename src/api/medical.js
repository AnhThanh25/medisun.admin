import request from "@/utils/request";

export function GetMedicalLst(data) {
  return request({
    url: "PKMedical/GetMedicalLst",
    method: "post",
    data: data,
  });
}
export function GetMedicalByID(data) {
  return request({
    url: "PKMedical/GetMedicalByID",
    method: "post",
    data: data,
  });
}
export function AddMedicalLst(data) {
  return request({
    url: "PKMedical/AddMedicalLst",
    method: "post",
    data: data,
  });
}

export function DelMedical(data) {
  return request({
    url: "PKMedical/DelMedical",
    method: "post",
    data: data,
  });
}
