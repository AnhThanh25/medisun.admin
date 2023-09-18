import request from "@/utils/request";

export function GetPatientLst(data) {
  return request({
    url: "PKPatient/GetPatientLst",
    method: "post",
    data: data,
  });
}
export function AddPatientLst(data) {
  return request({
    url: "PKPatient/AddPatientLst",
    method: "post",
    data: data,
  });
}
