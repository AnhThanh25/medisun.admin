<template>
  <v-card>
    <v-card-title>
      <div class="d-flex" style="justify-content: space-between">
        <h6 class="text-h6 py-2">Danh sách xuất hàng</h6>
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
            @click="getLocalStoreOutLst"
          ></v-btn>
          <v-btn
            color="success"
            variant="tonal"
            icon="mdi-plus"
            style="height: 42px"
            @click="btShowScanBox"
          ></v-btn>
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
      <template v-slot:item.Ranking="{ item }">
        {{ getRank(item.raw.Ranking) }}
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
      <template v-slot:item.StatusCare="{ item }">
        <v-chip :color="getStatus(item.raw.StatusCare).color">
          {{ getStatus(item.raw.StatusCare).text }}</v-chip
        >
      </template>
    </v-data-table-server>
  </v-card>
  <v-dialog v-model="isShowScanBox" persistent width="500">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Quét mã barcode</h6>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Quét | Nhập mã kiện hàng"
          v-model="qrScanbox"
          prepend-inner-icon="mdi-qrcode"
          clearable
        ></v-text-field>
        <v-card-text style="color: red">{{ title }}</v-card-text>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="btClose">
          Đóng
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowCreate" persistent width="1000"
    ><Create :billInfo="billInfo" @btClose="btClose" />
  </v-dialog>
  <v-dialog v-model="isShowUpdate" persistent width="1000"
    ><Update :billInfo="billInfo" @btClose="btClose" />
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
  formatDateDisplay,
  formatDateDisplayDDMMYY,
  formatDateUpload,
} from "@/helpers/getTime";
import Update from "./components/update.vue";
import Create from "./components/create.vue";
import { GetLocalStoreOutLst, GetStampExportByID } from "@/api/export";
import { GetInvoiceInfo } from "@/api/invoice";
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
        { title: "Mã kiện", key: "DocumentID", sortable: false },
        { title: "Mã khách hàng", key: "CustomerID", sortable: false },
        {
          title: "Khách hàng",
          key: "CustomerName",
          sortable: false,
          align: "center",
        },
        {
          title: "Địa chỉ",
          key: "CustomerAddress",
          sortable: false,
          align: "center",
        },
        {
          title: "Ngày tạo",
          key: "PostingDateShow",
          sortable: false,
          align: "center",
        },
        {
          title: "Ghi chú",
          key: "Note",
          sortable: false,
          align: "center",
        },
      ],
      desserts: [],
      pageNumber: 1,
      rowspPage: 10,
      search: "",
      dataLength: 0,

      timeStart: new Date(),
      timeEnd: new Date(),
      placeID: "",
      isShowCreate: false,
      isShowUpdate: false,
      isShowScanBox: false,
      qrScanbox: "",
      title: "",
      billUpdate: {},
    };
  },
  watch: {
    timeStart(newValue) {
      this.getLocalStoreOutLst();
    },
    timeEnd(newValue) {
      this.getLocalStoreOutLst();
    },
    pageNumber(newValue) {
      setPageNumber(newValue);
      this.getLocalStoreOutLst();
    },
    rowspPage(newValue) {
      setRowspPage(newValue);
      this.getLocalStoreOutLst();
    },
    search(newValue) {
      if (newValue.length > 4 || newValue.length == 0) {
        this.getLocalStoreOutLst();
      }
    },
    qrScanbox(value) {
      if (value.length > 4) {
        this.getInvoiceInfo(value);
      }
    },
  },
  methods: {
    btShowUpdate(data) {
      GetInvoiceInfo({
        ID: data.DocumentID,
      }).then((res) => {
        if (res.RespCode == 0) {
          this.billInfo = res.Data;
          this.isShowUpdate = true;
          this.isShowScanBox = false;
        }
      });
    },
    getInvoiceInfo(data) {
      GetInvoiceInfo({
        ID: data,
      }).then((res) => {
        if (res.RespCode == 0) {
          this.billInfo = res.Data;
          this.isShowCreate = true;
          this.isShowScanBox = false;
          this.title = "";
        } else {
          this.title = "Mã hóa đơn không tồn tại";
        }
      });
    },
    btShowScanBox() {
      this.isShowScanBox = true;
      this.qrScanbox = "";
    },

    getLocalStoreOutLst() {
      GetLocalStoreOutLst({
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
        if (res.RespCode == 0) {
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              PostingDateShow: formatDateDisplayDDMMYY(item.PostingDate),
            };
          });
        }
      });
    },
    btPage(data) {
      this.pageNumber = data;
    },
    btRow(data) {
      this.rowspPage = data;
    },
    btClose() {
      this.isShowCreate = false;
      this.isShowUpdate = false;
      this.isShowScanBox = false;
      this.getLocalStoreOutLst();
    },
  },
  created() {
    if (getRowspPage()) {
      this.rowspPage = parseInt(getRowspPage());
    }
    if (getPageNumber()) {
      this.pageNumber = parseInt(getPageNumber());
    }
    this.getLocalStoreOutLst();
  },
};
</script>

<style></style>
