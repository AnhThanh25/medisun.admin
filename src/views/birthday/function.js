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
