<template>
  <v-card>
    <v-card-title>
      <div class="d-flex" style="justify-content: space-between">
        <h6 class="text-h6 py-2">Khách hàng</h6>
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
              v-model="isMenuSearch"
              activator="parent"
              transition="slide-y-transition"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  color="primary"
                  variant="tonal"
                  icon="mdi-account-search"
                  style="height: 42px"
                  class="mr-1"
                  v-bind="props"
                ></v-btn>
              </template>
              <v-card width="300" style="padding-top: 20px !important">
                <v-card-text>
                  <v-text-field
                    v-model="dataSearchPhone"
                    label="Số điện thoại / Mã tổ chức"
                    prepend-inner-icon="mdi-magnify"
                    hide-details
                    color="primary"
                  />

                  <v-btn
                    class="mt-2"
                    variant="tonal"
                    color="primary"
                    block
                    @click="searchHistoryUser"
                  >
                    Tìm kiếm</v-btn
                  >
                </v-card-text>
              </v-card>
            </v-menu>
          </span>
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
              style="width: 140px !important"
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
            <v-menu
              v-model="isMenuTime"
              activator="parent"
              transition="slide-y-transition"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  color="blue"
                  variant="tonal"
                  icon="mdi-clock-plus"
                  style="height: 42px"
                  v-bind="props"
                ></v-btn>
              </template>
              <v-card
                width="300"
                height="400"
                style="padding-top: 20px !important"
              >
                <v-card-text>
                  <VDatePicker2
                    locale="vi"
                    v-model="timeStart"
                    mode="date"
                    :masks="masks"
                  >
                    <template #default="{ inputValue, inputEvents }">
                      <v-text-field
                        v-model="timeStart"
                        :value="inputValue"
                        v-on="inputEvents"
                        label="Bắt đầu"
                        color="blue"
                        append-inner-icon="mdi-calendar"
                        hide-details
                        size="small"
                        clearable
                      />
                    </template>
                  </VDatePicker2>
                  <VDatePicker2
                    locale="vi"
                    v-model="timeEnd"
                    mode="date"
                    :masks="masks"
                  >
                    <template #default="{ inputValue, inputEvents }">
                      <v-text-field
                        v-model="timeEnd"
                        :value="inputValue"
                        v-on="inputEvents"
                        label="Kết thúc"
                        class="mt-2"
                        color="blue"
                        append-inner-icon="mdi-calendar"
                        hide-details
                        size="small"
                        clearable
                      />
                    </template>
                  </VDatePicker2>
                </v-card-text>
              </v-card>
            </v-menu>
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
          @click="btShowUpdate(item.raw)"
          >mdi-pencil
        </v-icon>
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
import Care from "@/views/components/care.vue";
import { exportExcel } from "./function";
import Rank from "@/views/components/rank.vue";

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
        { title: "STT", sortable: false, key: "Key", width: 110 },
        { title: "Mã TC", key: "PlaceID", sortable: false },
        { title: "Tổ chức", key: "PlaceName", sortable: false },
        { title: "SĐT", key: "Phone", sortable: false, align: "center" },
        { title: "Hạng KH", key: "Ranking", sortable: false, align: "center" },
        { title: "Điểm", key: "Point", sortable: false, align: "center" },
        {
          title: "HT C.sóc",
          key: "TypeCare",
          sortable: false,
          align: "center",
        },
        {
          title: "KQ C.Sóc",
          key: "Resuilt",
          sortable: false,
          align: "center",
        },
        {
          title: "Trạng thái",
          key: "StatusCare",
          sortable: false,
          align: "center",
        },
        {
          title: "TG chăm sóc",
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
        { value: 4, label: "Đăng ký TV" },
        { value: 1, label: "Chưa ĐKTV" },
      ],
      statusCustomer: 1,
      rankLst: rankLst,
      rankCustomer: 0,
      timeStart: null,
      timeEnd: null,
      searchCustomer: "",
      productName: "",
      placeID: "",
      dataSearchPhone: "",
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
      GetPlaceLstByLevel({
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
            Coordinate:
              item.Latitude != 0
                ? `http://maps.google.com/maps?q=loc:${item.Latitude},${item.Longitude}`
                : "Không có",
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
    searchHistoryUser() {
      if (this.isPhoneNumber(this.dataSearchPhone)) {
        this.loading = true;
        SearchHistoryUser2({
          Phone: this.dataSearchPhone,
          PlaceID: null,
          PageNumber: 1,
          RowspPage: 1000,
        }).then((res) => {
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              DateCareShow: formatDateDisplay(item.DateCare),
              RankingShow: this.getRank(item.Ranking),
              StatusCareShow: this.getStatus2(item.StatusCare),
              Coordinate:
                item.Latitude != 0
                  ? `http://maps.google.com/maps?q=loc:${item.Latitude},${item.Longitude}`
                  : "Không có",
            };
          });
          this.dataLength = res.TotalRows;
          this.loadding = false;
        });
      } else {
        this.loading = true;
        SearchHistoryUser2({
          Phone: null,
          PlaceID: this.dataSearchPhone,
          PageNumber: 1,
          RowspPage: 1000,
        }).then((res) => {
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              DateCareShow: formatDateDisplay(item.DateCare),
              StatusCareShow: this.getStatus2(item.StatusCare),
              RankingShow: this.getRank(item.Ranking),
              Coordinate:
                item.Latitude != 0
                  ? `http://maps.google.com/maps?q=loc:${item.Latitude},${item.Longitude}`
                  : "Không có",
            };
          });
          this.dataLength = res.TotalRows;
          this.loadding = false;
        });
      }
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
      if (this.rankCustomer == 0) {
        this.getPlaceLstByCity();
      } else {
        this.getPlaceLstByLevel(this.rankCustomer);
      }
    },
    getPlaceLstByLevel(type) {
      this.loadding = true;
      GetPlaceLstByLevel({
        City: this.placeName,
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: "",
        PlaceType: this.typePlace,
        Status: this.statusCustomer,
        TimeStart: this.timeStart
          ? formatDateUpload(this.timeStart) + " 00:00:00"
          : null,
        TimeEnd: this.timeEnd
          ? formatDateUpload(this.timeEnd) + " 23:59:00"
          : null,
        Level: type,
        LevelChange: 100,
      }).then((res) => {
        var num = (this.pageNumber - 1) * this.rowspPage;
        this.desserts = res.Data.map((item, index) => {
          return {
            ...item,
            Key: index + 1 + num,
            DateCareShow: formatDateDisplay(item.DateCare),
            StatusCareShow: this.getStatus2(item.StatusCare),
            RankingShow: this.getRank(item.Ranking),
            Coordinate:
              item.Latitude != 0
                ? `http://maps.google.com/maps?q=loc:${item.Latitude},${item.Longitude}`
                : "Không có",
          };
        });
        this.dataLength = res.TotalRows;
        this.loadding = false;
      });
    },
    getPlaceLstByCity() {
      this.loadding = true;
      GetPlaceLstByCity({
        City: this.placeName,
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: "",
        PlaceType: this.typePlace,
        Status: this.statusCustomer,
        TimeStart: this.timeStart,
        TimeEnd: this.timeEnd,
      }).then((res) => {
        var num = (this.pageNumber - 1) * this.rowspPage;

        this.desserts = res.Data.map((item, index) => {
          return {
            ...item,
            Key: index + 1 + num,
            DateCareShow: formatDateDisplay(item.DateCare),
            StatusCareShow: this.getStatus2(item.StatusCare),
            RankingShow: this.getRank(item.Ranking),
            Coordinate:
              item.Latitude != 0
                ? `http://maps.google.com/maps?q=loc:${item.Latitude},${item.Longitude}`
                : "Không có",
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
