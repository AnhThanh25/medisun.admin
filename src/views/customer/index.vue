<template>
  <v-card>
    <v-card-title>
      <div class="d-flex" style="justify-content: space-between">
        <h6 class="text-h6 py-2">Khách hàng</h6>
        <div>
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
                  v-model="searchCustomer"
                  label="Số điện thoại / Mã tổ chức"
                  prepend-inner-icon="mdi-magnify"
                  hide-details
                  size="small"
                  color="primary"
                />

                <v-btn class="mt-2" variant="tonal" color="primary" block>
                  Tìm kiếm</v-btn
                >
              </v-card-text>
            </v-card>
          </v-menu>

          <v-btn
            color="success"
            variant="tonal"
            icon="mdi-microsoft-excel"
            style="height: 42px"
            class="mr-1"
          ></v-btn>
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
                  size="small"
                  color="error"
                />

                <v-btn class="mt-2" variant="tonal" color="error" block>
                  Tìm kiếm</v-btn
                >
              </v-card-text>
            </v-card>
          </v-menu>
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
              style="width: 130px !important"
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
                      />
                    </template>
                  </VDatePicker2>
                  <v-btn class="mt-2" variant="tonal" color="blue" block>
                    Tìm kiếm</v-btn
                  >
                </v-card-text>
              </v-card>
            </v-menu>
          </span>
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
          @click="btShowUpdate(item.raw)"
          >mdi-face-agent
        </v-icon>
      </template>
    </v-data-table-server>
  </v-card>

  <notifications />
</template>

<script>
import { GetCRMLstByCity, GetCRMLstByLevel, GetPlaceLstByID } from "@/api/crm";
import { formatDate } from "@/helpers/getTime";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict,
} from "@/api/default";
import { getRoleText, roleLst } from "@/utils/role";
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
} from "@/utils/auth";
export default {
  data() {
    return {
      isMenuSearch: false,
      isMenuCare: false,
      isMenuTime: false,
      isShowCreateCustomer: false,
      isShowUpdateCustomer: false,
      loadding: false,
      headers: [
        { title: "STT", sortable: false, key: "Key" },

        { title: "Tổ chức", key: "PlaceName", sortable: false },
        { title: "SĐT", key: "PatientName", sortable: false, align: "center" },
        { title: "Hạng KH", key: "Ranking", sortable: false, align: "center" },
        { title: "Điểm", key: "Point", sortable: false, align: "center" },
        {
          title: "HT C.sóc",
          key: "EmployCare",
          sortable: false,
          align: "center",
        },
        {
          title: "Điểm tăng",
          key: "PointUp",
          sortable: false,
          align: "center",
        },
        {
          title: "Trạng thái",
          key: "Status",
          sortable: false,
          align: "center",
        },
        {
          title: "TG chăm sóc",
          key: "TimeCare",
          sortable: false,
          align: "center",
        },
        {
          title: "NV chăm sóc",
          key: "EmployCare",
          sortable: false,
          align: "center",
        },
        {
          title: "ĐK thành viên",
          key: "DebtNow",
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
        { value: 2, label: "Đã duyệt" },
        { value: 1, label: "Chờ xử lý" },
        { value: 0, label: "Tất cả" },
      ],
      statusCustomer: 0,
      rankLst: rankLst,
      rankCustomer: 0,
      timeStart: null,
      timeEnd: null,
      searchCustomer: "",
      productName: "",
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
  },
  methods: {
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
        this.getCRMLstByCity();
      }
    },
    getCRMLstByCity() {
      this.loadding = true;
      GetCRMLstByCity({
        City: this.placeName,
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: "",
        PlaceType: this.placeType,
        Product: this.productName,
      }).then((res) => {
        this.desserts = res.Data.map((item, index) => {
          return {
            ...item,
            Key: index + 1,
          };
        });
        this.dataLength = res.TotalRows;
        this.loadding = false;
      });
    },
  },
  created() {
    if (getPlaceName()) {
      this.placeName = getPlaceName();
    }
    if (getTypePlace()) {
      this.placeType = getTypePlace();
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
