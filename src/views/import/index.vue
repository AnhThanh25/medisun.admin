<template>
  <v-card>
    <v-card-title>
      <div class="d-flex" style="justify-content: space-between">
        <h6 class="text-h6 py-2">Danh sách nhập hàng</h6>
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
            @click="fetchData"
          ></v-btn>
          <v-btn
            color="success"
            variant="tonal"
            icon="mdi-plus"
            style="height: 42px"
            @click="btShowCreate"
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
      <template v-slot:item.StatusText="{ item }">
        <v-chip :color="getStatus(item.raw.Status).color">
          {{ getStatus(item.raw.Status).text }}</v-chip
        >
      </template>
    </v-data-table-server>
  </v-card>

  <v-dialog v-model="isShowCreate" persistent width="1000"
    ><Create @btClose="btClose" />
  </v-dialog>
  <!-- <v-dialog v-model="isShowCare" persistent width="700"
    ><Care :placeID="placeID" @btClose="btClose" />
  </v-dialog>
  <v-dialog v-model="isShowRank" persistent width="700"
    ><Rank :placeID="placeID" @btClose="btClose" />
  </v-dialog>
  <v-dialog v-model="isShowProductSales" persistent width="1000"
    ><ProduceSales :placeID="placeID" @btClose="btClose" />
  </v-dialog> -->
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
import { formatDateDisplay, formatDateUpload } from "@/helpers/getTime";
import Update from "./components/update.vue";
import Create from "./components/create.vue";
import Care from "@/views/components/care.vue";
import { exportExcel } from "./function";
import Rank from "@/views/components/rank.vue";
import ProduceSales from "@/views/components/productSales.vue";
import { GetLocalStoreInLst } from "@/api/import";

export default {
  components: {
    Update,
    Care,
    Rank,
    ProduceSales,
    Create,
  },
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
        {
          title: "Trạng thái",
          key: "StatusText",
          sortable: false,
          align: "center",
        },
        { title: "Mã tem", key: "StampID", sortable: false },
        { title: "Sản phẩm", key: "ProductName", sortable: false },
        { title: "Số lô", key: "LotCode", sortable: false, align: "center" },
        {
          title: "Số lượng",
          key: "Quantity",
          sortable: false,
          align: "center",
        },
        {
          title: "Hạn dùng",
          key: "DateExpired",
          sortable: false,
          align: "center",
        },
        {
          title: "Ngày nhập",
          key: "TimeCreate",
          sortable: false,
          align: "center",
        },
        {
          title: "Người tạo",
          key: "Creater",
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
    placeName(newValue) {
      setPlaceName(newValue);
      this.fetchData();
    },
    typePlace(newValue) {
      setTypePlace(newValue);
      this.fetchData();
    },
    pageNumber(newValue) {
      setPageNumber(newValue);
      this.fetchData();
    },
    rowspPage(newValue) {
      setRowspPage(newValue);
      this.fetchData();
    },
    search(newValue) {
      if (newValue.length > 4 || newValue.length == 0) {
        this.fetchData();
      }
    },
    statusCustomer(newValue) {
      setStatusCustomer(newValue);
      this.fetchData();
    },
    rankCustomer(newValue) {
      setRankCustomer(newValue);
      this.fetchData();
    },
  },
  methods: {
    btShowCreate() {
      this.isShowCreate = true;
    },
    getLocalStoreInLst() {
      GetLocalStoreInLst({
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
    if (getPageNumber()) {
      this.pageNumber = parseInt(getPageNumber());
    }
    this.getLocalStoreInLst();
  },
};
</script>

<style></style>
