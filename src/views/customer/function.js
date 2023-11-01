export function formatJson(filterVal, jsonData) {
  return jsonData.map((v) =>
    filterVal.map((j) => {
      if (j === "timestamp") {
        return v[j];
      } else {
        return v[j];
      }
    })
  );
}
export function exportExcel(dataCRM) {
  const tHeader = [
    "STT",
    "Mã KH",
    "KH tổ chức",
    "Điện thoại",
    "Tỉnh",
    "Quận/Huyện",
    "Phường/Xã",
    "Địa chỉ",
    "Tọa độ",
    "Loại tổ chức",
    "Trạng thái",
    "Hạng",
    "Điểm",
    "HT chăm sóc",
    "KQ chăm sóc",
    "Ghi chú",
    "TG chăm sóc",
    "Mã NV",
    "Nhân viên",
  ];
  const filterHeader = [
    "Key",
    "PlaceID",
    "PlaceName",
    "Phone",
    "City",
    "District",
    "Commune",
    "Address",
    "Coordinate",
    "PlaceType",
    "StatusCareShow",
    "RankingShow",
    "Point",
    "TypeCare",
    "Resuilt",
    "Note",
    "DateCare",
    "EmployCode",
    "EmployName",
  ];
  var dataLst = [];
  dataLst = dataCRM;
  import("@/vendor/Export2Excel").then((excel) => {
    const data = formatJson(filterHeader, dataLst);
    excel.export_json_to_excel({
      header: tHeader,
      data: data,
      filename: "Danh sách khách hàng",
      autoWidth: true,
      bookType: "xlsx",
    });
  });
}
