import request from "@/utils/request";

export function GetAppointmentLst(data) {
  return request({
    url: "PKAppointment/GetAppointmentLst",
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