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
    "Loại tổ chức",
    "Ngày sinh",
    "Trạng thái",
    "Hạng",
    "Điểm",
    "Điểm lên hạng",
    "Tiền lên hạng",
    "HT chăm sóc",
    "KQ chăm sóc",
    "Ghi chú",
    "TG chăm sóc",
    "Mã NV",
    "Nhân viên",
    "Call Cuối",
    "ĐKTV",
  ];
  const filterHeader = [
    "Key",
    "PlaceID",
    "PlaceName",
    "Phone",
    "City",
    "PlaceType",
    "BirthdayShow",
    "StatusCareShow",
    "RankingShow",
    "Point",
    "PointUpRank",
    "MoneyUpRank",
    "TypeCare",
    "Resuilt",
    "Note",
    "DateCare",
    "CrmID",
    "CrmName",
    "LastCall",
    "TextRegister",
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
