<template>
  <v-card>
    <v-card-title>
      <div class="d-flex" style="justify-content: space-between">
        <h6 class="text-h6 py-2">Tồn kho</h6>
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
            @click="getStampLst"
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
      <template v-slot:item.StatusText="{ item }">
        <v-chip :color="getStatus(item.raw.Status).color">
          {{ getStatus(item.raw.Status).text }}</v-chip
        >
      </template>
      <template v-slot:item.ItemLength="{ item }">
        <v-chip color="secondary"> {{ item.raw.ItemLength }} Hộp</v-chip>
      </template>
    </v-data-table-server>
  </v-card>

  <notifications />
</template>

<script>
import {
  GetPlaceLstByCity,
  GetPlaceLstByLevel,
  GetPlaceLstByID,
  SearchHistoryUser2,
} from "@/api/crm";

import { typePlaceLst, rankLst } from "@/utils/variable";
import {
  getPlaceName,
  setPlaceName,
  getTypePlace,
  setTypePlace,
  getPageNumber,
  setPageNumber,
  setRowspPage,
  getRowspPage,
  setStatusCustomer,
  setRankCustomer,
  getStatusCustomer,
  getRankCustomer,
} from "@/utils/auth";
import {
  formatDateDisplay,
  formatDateDisplayDDMMYY,
  formatDateUpload,
} from "@/helpers/getTime";

import { GetStampLst } from "@/api/stamp";

export default {
  data() {
    return {
      isShowProductSales: false,
      isMenuSearch: false,
      isMenuCare: false,
      isMenuTime: false,
      isShowCare: false,
      isShowUpdatePlace: false,
      loadding: false,
      isShowRank: false,
      headers: [
        { title: "STT", sortable: false, key: "Key", width: 50 },

        { title: "Mã tem", key: "StampID", sortable: false },
        { title: "Sản phẩm", key: "ProductName", sortable: false },
        { title: "Số lô", key: "LotCode", sortable: false, align: "center" },
        {
          title: "SL Nhập",
          key: "Quantity",
          sortable: false,
          align: "center",
        },
        {
          title: "SL Xuất",
          key: "QuantityGet",
          align: "center",
          sortable: false,
        },

        {
          title: "Tồn",
          key: "QuantityRemain",
          align: "center",
          sortable: false,
        },

        {
          title: "ĐVT",
          key: "Unit",
          sortable: false,
          align: "center",
        },
        {
          title: "Hạn dùng",
          key: "DateExpiredShow",
          sortable: false,
          align: "center",
        },
        {
          title: "Ngày nhập",
          key: "TimeCreateShow",
          sortable: false,
          align: "center",
        },
        {
          title: "Người tạo",
          key: "Creater",
          sortable: false,
          align: "center",
        },
      ],
      desserts: [],
      pageNumber: 1,
      rowspPage: 10,
      search: "",
      date: null,
      placeName: "",
      dataLength: 0,
      placeLst: [],
      typePlaceLst: typePlaceLst,
      typePlace: "",
      statusLst: [
        { value: 4, label: "Đăng ký TV" },
        { value: 1, label: "Chưa ĐKTV" },
      ],
      statusCustomer: 1,
      rankLst: rankLst,
      rankCustomer: 0,
      timeStart: new Date(),
      timeEnd: new Date(),
      searchCustomer: "",
      productName: "",
      placeID: "",
      dataSearchPhone: "",
      isShowCreate: false,
    };
  },
  watch: {
    timeStart(newValue) {
      this.getStampLst();
    },
    timeEnd(newValue) {
      this.getStampLst();
    },
    pageNumber(newValue) {
      // setPageNumber(newValue);
      this.getStampLst();
    },
    rowspPage(newValue) {
      setRowspPage(newValue);
      this.getStampLst();
    },
    search(newValue) {
      if (newValue.length > 4 || newValue.length == 0) {
        this.getStampLst();
      }
    },
  },
  methods: {
    btShowCreate() {
      this.isShowCreate = true;
    },
    getStampLst() {
      GetStampLst({
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
            ItemLength: 1,
            DateExpiredShow: formatDateDisplayDDMMYY(item.DateExpired),
            TimeCreateShow: formatDateDisplayDDMMYY(item.TimeCreate),
          };
        });
        this.dataLength = res.TotalRows;
      });
    },
    btClose() {
      this.isShowCreate = false;
    },
    btPage(data) {
      this.pageNumber = data;
    },
    btRow(data) {
      this.rowspPage = data;
    },
    getStatus(status) {
      if (status == 0) {
        return { text: "Đã hủy", color: "error" };
      }
      if (status == 1) {
        return { text: "Mới nhập kho", color: "more" };
      }
      if (status == 2) {
        return { text: "Đã đóng kiện", color: "secondary" };
      }
      if (status == 3 || status == 4) {
        return { text: "Đã bốc hàng", color: "success" };
      }
    },
  },
  created() {
    if (getRowspPage()) {
      this.rowspPage = parseInt(getRowspPage());
    }
    // if (getPageNumber()) {
    //   this.pageNumber = parseInt(getPageNumber());
    // }
    this.getStampLst();
  },
};
</script>

<style></style>
