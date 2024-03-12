<template>
  <v-card>
    <v-card-title>
      <div class="d-flex" style="justify-content: space-between">
        <h6 class="text-h6 py-2">Danh sách hóa đơn</h6>
        <div>
          <span>
            <v-menu
              v-model="isMenuSearch"
              activator="parent"
              transition="slide-y-transition"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  color="success"
                  variant="tonal"
                  icon="mdi-microsoft-excel"
                  style="height: 42px"
                  class="mr-1"
                  v-bind="props"
                ></v-btn>
              </template>
              <v-card width="300" style="padding-top: 20px !important">
                <v-card-text>
                  <v-btn
                    class="mt-2"
                    variant="tonal"
                    color="secondary"
                    block
                    @click="exportExcel"
                  >
                    Excel mẫu
                  </v-btn>
                  <v-btn
                    class="mt-2"
                    variant="tonal"
                    color="blue"
                    block
                    :loading="loadding"
                    @click="handleFileImport"
                  >
                    Nhập excel</v-btn
                  >
                  <input
                    ref="uploader"
                    class="d-none"
                    type="file"
                    @change="fileUpload"
                  />
                </v-card-text>
              </v-card>
            </v-menu>
          </span>
        </div>
      </div>
    </v-card-title>
    <v-data-table-server
      no-data-text="Không có dữ liệu"
      :headers="headers"
      :items="desserts"
      items-per-page-text=""
      sort-asc-icon="mdi-menu-up"
      sort-desc-icon="mdi-menu-down"
      :items-length="dataLength"
      @update:itemsPerPage="btRow"
      @update:page="btPage"
      height="calc(100vh - 210px)"
      :loading="loadding"
      :items-per-page-options="[
        { value: 10, title: '10' },
        { value: 50, title: '50' },
        { value: 100, title: '100' },
        { value: 10000, title: 'All' },
      ]"
    >
      <template v-slot:top>
        <div class="d-flex flex-wrap gap-2">
          <span>
            <VDateField
              v-model:modelValue="timeStart"
              label="Bắt đầu"
            ></VDateField>
          </span>
          <span>
            <VDateField
              v-model:modelValue="timeEnd"
              label="Kết thúc"
            ></VDateField>
          </span>
          <span>
            <v-text-field
              v-model="search"
              style="width: 180px"
              placeholder="Tìm kiếm"
            ></v-text-field>
          </span>
          <v-btn
            color="secondary"
            variant="tonal"
            icon="mdi-magnify"
            style="height: 42px"
            @click="getInvoiceLst"
          ></v-btn>
          <!-- <v-btn
            color="success"
            variant="tonal"
            icon="mdi-plus"
            style="height: 42px"
            @click="btShowCreate"
          ></v-btn> -->
        </div>
      </template>
      <template v-slot:item.Key="{ item }">
        {{ item.raw.Key }}
        <v-icon
          color="primary"
          size="small"
          class="me-2"
          @click="btShowUpdate(item.raw)"
          >mdi-pencil
        </v-icon>
      </template>
      <template v-slot:item.Action="{ item }">
        <v-icon
          color="error"
          size="small"
          class="me-2"
          @click="btShowDel(item.raw)"
          >mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.Point="{ item }">
        {{ new Intl.NumberFormat().format(item.raw.Point) }}
      </template>
      <template v-slot:item.Register="{ item }">
        <v-icon v-if="item.raw.StatusCare == 4" color="success"
          >mdi-check-circle</v-icon
        >
        <v-icon v-else color="more">mdi-close-circle</v-icon>
      </template>
      <!-- <template v-slot:item.StatusCare="{ item }">
        <v-chip :color="getStatus(item.raw.StatusCare).color">
          {{ getStatus(item.raw.StatusCare).text }}</v-chip
        >
      </template> -->
    </v-data-table-server>
  </v-card>

  <v-dialog v-model="isShowCreate" persistent width="600"
    ><Create @btClose="btClose" />
  </v-dialog>
  <v-dialog v-model="isShowUpdate" persistent width="900"
    ><Update :billDocumentID="billUpdate" @btClose="btClose" />
  </v-dialog>
  <v-dialog v-model="isShowDel" persistent width="400">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">
          Xóa hóa đơn - {{ delInfo.DocumentID }}
        </h6>
      </v-card-title>
      <v-card-text>
        <div class="px-2">Có chắc bạn muốn xóa hóa đơn này không?</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="btClose">
          Đóng
        </v-btn>
        <v-btn @click="delInvoiceInfo"> Xác nhận </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script>
import {
  getPageNumber,
  setPageNumber,
  setRowspPage,
  getRowspPage,
} from "@/utils/auth";
import {
  formatDateUpload,
  formatDateDisplayDDMMYY,
  formatDate,
} from "@/helpers/getTime";
import Update from "./components/update.vue";
import Create from "./components/create.vue";

import { GetInvoiceLst, DelInvoiceInfo, UpdateInvoiceLst } from "@/api/invoice";
import { exportExcel, excelDateToJSDate } from "./function";
import XLSX from "xlsx";

export default {
  components: {
    Update,
    Create,
  },
  data() {
    return {
      loadding: false,
      headers: [
        { title: "STT", sortable: false, key: "Key", width: 50 },
        {
          title: "Mã hóa đơn",
          key: "DocumentID",
          sortable: false,
          align: "center",
        },
        {
          title: "Mã khách hàng",
          key: "CustomerID",
          sortable: false,
          align: "center",
        },
        {
          title: "Khách hàng",
          key: "CustomerName",
          sortable: false,
        },
        {
          title: "Địa chỉ",
          key: "CustomerAddress",
          sortable: false,
        },
        {
          title: "Ngày nhập",
          key: "PostingDateShow",
          sortable: false,
          align: "center",
        },
        { title: "Ghi chú", key: "Note", sortable: false, align: "center" },
        { title: "", key: "Action", sortable: false, align: "center" },
      ],
      desserts: [],
      pageNumber: 1,
      rowspPage: 10,
      search: "",
      dataLength: 0,

      timeStart: new Date(),
      timeEnd: new Date(),
      isShowCreate: false,
      isShowUpdate: false,
      isMenuSearch: false,
      billUpdate: {},
      isShowDel: false,
      delInfo: {},
      invoiceLst: {},
    };
  },
  watch: {
    timeStart() {
      this.getInvoiceLst();
    },
    timeEnd() {
      this.getInvoiceLst();
    },
    pageNumber(newValue) {
      // setPageNumber(newValue);
      this.getInvoiceLst();
    },
    rowspPage(newValue) {
      setRowspPage(newValue);
      this.getInvoiceLst();
    },
    search(newValue) {
      if (newValue.length > 4 || newValue.length == 0) {
        this.getInvoiceLst();
      }
    },
  },
  methods: {
    handleFileImport() {
      this.loadding = true;

      // After obtaining the focus when closing the FilePicker, return the button state to normal
      window.addEventListener(
        "focus",
        () => {
          this.loadding = false;
        },
        { once: true }
      );

      // Trigger click on the FileInput
      this.$refs.uploader.click();
    },
    fileUpload(data) {
      var basic = data.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        console.log(data);
        this.invoiceLst = this.convertToReq(data).map((item, index) => {
          return {
            ...item,
            Key: index + 1,
          };
        });
        this.updateInvoiceLst(this.invoiceLst);
      };
      reader.readAsBinaryString(basic);
    },
    convertToReq(data) {
      var lstReq = [];
      for (var i = 1; i < data.length; i++) {
        if (data[i][1]) {
          var req = {
            DocumentID: data[i][1],
            CustomerID: data[i][2],
            CustomerName: data[i][3],
            CustomerAddress: data[i][4],
            PostingDate: formatDate(new Date(data[i][5])),
            Note: data[i][6],
          };
          lstReq.push(req);
        }
      }
      return lstReq;
    },
    updateInvoiceLst(data) {
      UpdateInvoiceLst({
        Data: data,
      }).then((res) => {
        if (res.RespCode == 0) {
          notify({
            type: "success",
            title: "Thành công",
            text: "Thêm hóa đơn thành công",
          });
          this.getInvoiceLst();
        }
      });
    },
    delInvoiceInfo() {
      DelInvoiceInfo({
        ID: this.delInfo.RowID,
      }).then((res) => {
        if (res.RespCode == 0) {
          notify({
            type: "success",
            title: "Thành công",
            text: "Xóa hóa đơn thành công",
          });
          this.delInfo = {};
          this.btClose();
          this.getInvoiceLst();
        }
      });
    },
    btShowDel(data) {
      this.isShowDel = true;
      this.delInfo = data;
    },
    btShowUpdate(data) {
      this.isShowUpdate = true;
      this.billUpdate = data.DocumentID;
    },
    exportExcel() {
      exportExcel();
    },
    btShowCreate() {
      this.isShowCreate = true;
    },
    btClose() {
      this.isShowCreate = false;
      this.isShowUpdate = false;
      this.isShowDel = false;
      this.getInvoiceLst();
    },
    btPage(data) {
      this.pageNumber = data;
    },
    btRow(data) {
      this.rowspPage = data;
    },
    getInvoiceLst() {
      GetInvoiceLst({
        TimeStart: this.timeStart
          ? formatDateUpload(this.timeStart) + " 00:00:00"
          : null,
        TimeEnd: this.timeEnd
          ? formatDateUpload(this.timeEnd) + " 23:59:00"
          : null,
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: this.search,
      }).then((res) => {
        this.desserts = res.Data.map((item, index) => {
          return {
            ...item,
            Key: index + 1,
            PostingDateShow: formatDateDisplayDDMMYY(item.PostingDate),
          };
        });
        this.dataLength = res.TotalRows;
      });
    },
  },
  created() {
    if (getRowspPage()) {
      this.rowspPage = parseInt(getRowspPage());
    }
    // if (getPageNumber()) {
    //   this.pageNumber = parseInt(getPageNumber());
    // }
    this.getInvoiceLst();
  },
};
</script>

<style></style>
