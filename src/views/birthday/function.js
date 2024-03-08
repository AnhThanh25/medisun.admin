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
export function exportExcel() {
  const tHeader = [
    "STT",
    "Mã hóa đơn",
    "Mã khách hàng",
    "Tên khách hàng",
    "Địa chỉ khách hàng",
    "Ngày nhập",
    "Ghi chú",
  ];
  const filterHeader = [
    "Key",
    "DocumentID",
    "CustomerID",
    "CustomerName",
    "CustomerAddress",
    "PostingDate",
    "Note",
  ];
  var dataLst = [
    {
      Key: 1,
      DocumentID: "HD00001",
      CustomerID: "KD00001",
      CustomerName: "Nguyễn Văn A",
      CustomerAddress: "365A Giải Phóng - Phương Liệt - Thanh Xuân - Hà Nội",
      PostingDate: "2024-03-07 00:00:00",
      Note: "Nhập ghi chú hóa đơn",
    },
  ];
  // dataLst = dataCRM;
  import("@/vendor/Export2Excel").then((excel) => {
    const data = formatJson(filterHeader, dataLst);
    excel.export_json_to_excel({
      header: tHeader,
      data: data,
      filename: "Danh sách hóa đơn mẫu",
      autoWidth: true,
      bookType: "xlsx",
    });
  });
}
export function excelDateToJSDate(data) {
  var serial = new Date(data);
  console.log(serial);
  var utc_days = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);
  var fractional_day = serial - Math.floor(serial) + 0.0000001;
  var total_seconds = Math.floor(86400 * fractional_day);
  var seconds = total_seconds % 60;
  total_seconds -= seconds;
  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;
  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
}
