import request from "@/utils/request";

export function GetGeneraltyLst(data) {
  return request({
    url: "PKAppointment/GetGeneraltyLst",
    method: "post",
    data: data,
  });
}
export function AddAppointment(data) {
  return request({
    url: "PKAppointment/AddAppointment",
    method: "post",
    data: data,
  });
}