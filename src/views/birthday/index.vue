<template>
  <v-card>
    <v-card-title>
      <div class="d-flex" style="justify-content: space-between">
        <h6 class="text-h6 py-2">Sinh nhật</h6>
        <div>
          <v-btn
            color="success"
            variant="tonal"
            icon="mdi-microsoft-excel"
            style="height: 42px"
            class="mr-1"
            @click="btExportExcel"
          ></v-btn>

          <span>
            <v-menu
              v-model="isMenuCare"
              activator="parent"
              transition="slide-y-transition"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  color="error"
                  variant="tonal"
                  icon="mdi-face-agent"
                  style="height: 42px"
                  v-bind="props"
                ></v-btn>
              </template>
              <v-card width="300" style="padding-top: 20px !important">
                <v-card-text>
                  <v-text-field
                    v-model="searchCustomer"
                    label="Nhân viên chăm sóc"
                    prepend-inner-icon="mdi-magnify"
                    hide-details
                    color="error"
                  />

                  <v-btn
                    class="mt-2"
                    variant="tonal"
                    color="error"
                    block
                    @click="btSearchCustomerCare"
                  >
                    Tìm kiếm</v-btn
                  >
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
            <v-select
              v-model="placeName"
              :items="placeLst"
              label="Địa bàn"
              item-title="City"
              item-value="City"
              class="ml-1"
              style="width: 220px !important"
              hide-details
            ></v-select>
          </span>
          <span>
            <v-select
              v-model="typePlace"
              :items="typePlaceLst"
              label="Loại tổ chức"
              item-title="label"
              item-value="value"
              style="width: 200px !important"
              hide-details
            ></v-select>
          </span>
          <span>
            <v-select
              v-model="statusCustomer"
              :items="statusLst"
              label="Trạng thái"
              item-title="label"
              item-value="value"
              style="width: 160px !important"
              hide-details
            ></v-select>
          </span>
          <span>
            <v-select
              v-model="rankCustomer"
              :items="rankLst"
              label="Hạng KH"
              item-title="label"
              item-value="value"
              style="width: 150px !important"
              hide-details
            ></v-select>
          </span>
          <span>
            <v-select
              v-model="monthNow"
              :items="monthLst"
              label="Tháng"
              item-title="text"
              item-value="value"
              style="width: 150px !important"
              hide-details
            ></v-select>
          </span>
          <v-btn
            color="info"
            variant="tonal"
            icon="mdi-magnify"
            style="height: 42px"
            @click="fetchData"
          ></v-btn>
        </div>
      </template>
      <template v-slot:item.Key="{ item }">
        {{ item.raw.Key }}
        <v-icon
          color="primary"
          size="small"
          class="me-2"
          @click="btShowCare(item.raw)"
          >mdi-face-agent
        </v-icon>
        <v-icon
          color="primary"
          size="small"
          class="me-2"
          @click="btShowRank(item.raw)"
          >mdi-chart-box-outline
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

  <v-dialog v-model="isShowUpdatePlace" persistent width="800"
    ><Update :placeID="placeID" @btClose="btClose" />
  </v-dialog>
  <v-dialog v-model="isShowCare" persistent width="700"
    ><Care :placeID="placeID" @btClose="btClose" />
  </v-dialog>
  <v-dialog v-model="isShowRank" persistent width="700"
    ><Rank :placeID="placeID" @btClose="btClose" />
  </v-dialog>
  <notifications />
</template>

<script>
import { GetPlaceLstByID, GetPlaceLstByBirthday } from "@/api/crm";

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
  formatDateUpload,
  formatDateDisplayDDMMYY,
} from "@/helpers/getTime";
import Update from "./components/update.vue";
import Care from "@/views/components/care.vue";
import Rank from "@/views/components/rank.vue";
import { exportExcel } from "./function";
import { monthLst } from "@/utils/variable";
export default {
  components: {
    Update,
    Care,
    Rank,
  },
  data() {
    return {
      isMenuSearch: false,
      isMenuCare: false,
      isMenuTime: false,
      isShowCare: false,
      isShowUpdatePlace: false,
      loadding: false,
      isShowRank: false,
      headers: [
        { title: "STT", sortable: false, key: "Key", width: 90 },
        { title: "Mã TC", key: "PlaceID", sortable: false },
        { title: "Tổ chức", key: "PlaceName", sortable: false },
        { title: "SĐT", key: "Phone", sortable: false, align: "center" },
        {
          title: "Sinh nhật",
          key: "BirthdayShow",
          sortable: false,
          align: "center",
        },
        { title: "Hạng KH", key: "Ranking", sortable: false, align: "center" },
        { title: "Điểm", key: "Point", sortable: false, align: "center" },
        {
          title: "Điểm lên hạng",
          key: "PointUpRank",
          sortable: false,
          align: "center",
        },
        {
          title: "Tiền lên hạng",
          key: "MoneyUpRank",
          sortable: false,
          align: "center",
        },

        {
          title: "NV KD",
          key: "DateCareShow",
          sortable: false,
          align: "center",
        },
        {
          title: "NV chăm sóc",
          key: "CrmName",
          sortable: false,
          align: "center",
        },
        {
          title: "ĐK thành viên",
          key: "Register",
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
        { value: 0, label: "Hủy tặng quà" },
        { value: 1, label: "Chưa tặng quà" },
        { value: 2, label: "Đã gửi quà" },
        { value: 3, label: "XN thông tin" },
        { value: 4, label: "Đã nhận quà" },
      ],
      statusCustomer: 1,
      rankLst: rankLst,
      rankCustomer: 1,
      searchCustomer: "",
      productName: "",
      placeID: "",
      dataSearchPhone: "",
      monthNow: new Date().getMonth() + 1,
      monthLst: monthLst,
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
    btShowRank(data) {
      this.placeID = data;
      this.isShowRank = true;
    },
    btExportExcel() {
      exportExcel(this.desserts);
    },
    btSearchCustomerCare() {
      this.loadding = true;
      getPlaceLstByBirthday({
        City: "",
        PageNumber: 1,
        RowspPage: 100000,
        Search: this.searchCustomer,
        PlaceType: "",
        Status: 0,
        TimeStart: this.timeStart
          ? formatDateUpload(this.timeStart) + " 00:00:00"
          : null,
        TimeEnd: this.timeEnd
          ? formatDateUpload(this.timeEnd) + " 23:59:00"
          : null,
        Level: null,
        LevelChange: 2,
      }).then((res) => {
        var num = (this.pageNumber - 1) * this.rowspPage;
        this.desserts = res.Data.map((item, index) => {
          return {
            ...item,
            Key: index + 1 + num,
            DateCareShow: formatDateDisplay(item.DateCare),
            StatusCareShow: this.getStatus2(item.StatusCare),
            RankingShow: this.getRank(item.Ranking),
            BirthdayShow: formatDateDisplayDDMMYY(item.Birthday),
            TextRegister:
              item.StatusCare == 4 ? "Đã đăng ký thành viên" : "Chưa đăng ký",
          };
        });
        this.dataLength = res.TotalRows;
        this.loadding = false;
      });
    },
    getStatus2(status) {
      if (status == 0) {
        return "Chờ xử lý";
      }
      if (status == 1) {
        return "Đã cập nhật";
      }
      if (status == 2) {
        return "Đã cập nhật";
      }
      if (status == 3) {
        return "Đã duyệt";
      }
      if (status == 4) {
        return "Đã đăng ký thành viên";
      }
      return "Anh thành";
    },
    btShowCare(data) {
      this.placeID = data.PlaceID;
      this.isShowCare = true;
    },
    btClose() {
      this.isShowUpdatePlace = false;
      this.isShowCare = false;
      this.isShowRank = false;
    },
    btShowUpdate(data) {
      this.placeID = data.PlaceID;
      this.isShowUpdatePlace = true;
    },
    btPage(data) {
      this.pageNumber = data;
    },
    btRow(data) {
      this.rowspPage = data;
    },
    getPlaceLstByID() {
      GetPlaceLstByID({}).then((res) => {
        this.placeLst = res.Data;
      });
    },

    isPhoneNumber(input) {
      // Kiểm tra bằng biểu thức chính quy
      var pattern = /^[0-9]{10,15}$/;
      if (pattern.test(input)) {
        return true; // Chuỗi là số điện thoại
      }
      // Kiểm tra bằng phương pháp parseInt và isNaN
      var number = parseInt(input);
      if (!isNaN(number)) {
        return true; // Chuỗi có thể chuyển thành số
      }
      return false; // Chuỗi không phải là số điện thoại
    },
    fetchData() {
      if (!this.placeName) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Chưa chọn địa bàn",
        });
        return;
      }
      this.getPlaceLstByBirthday();
    },
    getPlaceLstByBirthday() {
      this.loadding = true;
      GetPlaceLstByBirthday({
        City: this.placeName,
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: "",
        PlaceType: this.typePlace,
        Status: this.statusCustomer,
        Month: this.monthNow,
        Ranking: this.rankCustomer,
      }).then((res) => {
        var num = (this.pageNumber - 1) * this.rowspPage;
        this.desserts = res.Data.map((item, index) => {
          return {
            ...item,
            Key: index + 1 + num,
            DateCareShow: formatDateDisplay(item.DateCare),
            StatusCareShow: this.getStatus2(item.StatusCare),
            RankingShow: this.getRank(item.Ranking),
            BirthdayShow: formatDateDisplayDDMMYY(item.Birthday),
            PointUpRank:
              item.Ranking == 4
                ? 0
                : item.Ranking == 3
                ? 490 - item.Point
                : item.Ranking == 2
                ? 100 - item.Point
                : item.Ranking == 1
                ? 10 - item.Point
                : item.Ranking == 0
                ? 10 - item.Point
                : 0,
            TextRegister:
              item.StatusCare == 4 ? "Đã đăng ký thành viên" : "Chưa đăng ký",
          };
        }).map((item) => {
          return {
            ...item,
            MoneyUpRank: Intl.NumberFormat().format(item.PointUpRank * 50000),
          };
        });
        this.dataLength = res.TotalRows;
        this.loadding = false;
      });
    },

    getRank(status) {
      if (status == 0) {
        return "No rank";
      }
      if (status == 1) {
        return "Silver";
      }
      if (status == 2) {
        return "Titan";
      }
      if (status == 3) {
        return "Gold";
      }
      if (status == 4) {
        return "Platium";
      }
    },
    getStatus(status) {
      if (status == 0) {
        return { text: "Chờ xử lý", color: "more" };
      }
      if (status == 1 || status == 2) {
        return { text: "Đã cập nhật", color: "secondary" };
      }
      if (status == 3 || status == 4) {
        return { text: "Đã duyệt", color: "success" };
      }
    },
  },
  created() {
    setPageNumber(1);

    if (getPlaceName()) {
      this.placeName = getPlaceName();
    }
    if (getTypePlace()) {
      this.placeType = getTypePlace();
    }
    if (getStatusCustomer()) {
      this.statusCustomer = parseInt(getStatusCustomer());
    }
    if (getRankCustomer()) {
      this.rankCustomer = parseInt(getRankCustomer());
    }

    if (getRowspPage()) {
      this.rowspPage = parseInt(getRowspPage());
    }
    if (getPageNumber()) {
      this.pageNumber = parseInt(getPageNumber());
    }
    this.getPlaceLstByID();
  },
};
</script>

<style></style>
