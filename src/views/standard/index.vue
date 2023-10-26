<template>
  <!-- <h3>Chuẩn khách hàng</h3> -->

  <v-row>
    <v-col cols="4">
      <v-card height="calc(100vh - 64px)">
        <v-card-title>
          <div class="d-flex" style="justify-content: space-between">
            <h6 class="text-h6 py-1">Chuẩn hóa khách hàng</h6>
            <div>
              <v-btn
                color="primary"
                variant="text"
                icon="mdi-pencil"
                size="x-small"
                @click="isShowUpdatePlace = true"
                v-if="placeInfoBFO.PlaceID"
              ></v-btn>
              <!-- <v-btn
                color="primary"
                variant="text"
                icon="mdi-lock-open-check"
                size="x-small"
              ></v-btn> -->
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <v-card color="success" v-if="placeInfoBFO.PlaceName">
            <v-card-title class="text-h6">
              <div class="d-flex" style="justify-content: space-between">
                <h6 class="text-h6">{{ placeInfoBFO.PlaceName }}</h6>
              </div>
            </v-card-title>

            <v-card-text class="text-h7 pb-2" color="#000"
              >Mã chuẩn hóa: {{ placeInfoBFO.PlaceID }}</v-card-text
            >
          </v-card>
          <h6 class="text-h6 py-2" v-if="dataGroups.length > 0">Nhóm</h6>
          <div class="groups">
            <v-card
              color="primary"
              v-for="(item, index) in dataGroups"
              :key="index"
              variant="outlined"
              class="mb-2"
            >
              <v-card-title class="text-h6">
                <div class="d-flex" style="justify-content: space-between">
                  <h6 class="text-h6">{{ item.PlaceName }}</h6>
                  <v-btn
                    color="primary"
                    variant="text"
                    icon="mdi-close"
                    size="x-small"
                    class="mr-0"
                    @click="delPlaceStandard(item)"
                  ></v-btn>
                </div>
              </v-card-title>

              <v-card-text class="text-h7 pl-4 pt-2 pb-2" color="#000"
                >Mã KH: {{ item.PlaceID }}</v-card-text
              >
            </v-card>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="8">
      <v-card>
        <v-card-title>
          <div class="d-flex" style="justify-content: space-between">
            <h6 class="text-h6 py-2">Chuẩn hóa khách hàng</h6>
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
                      v-model="searchPhone"
                      label="Số điện thoại"
                      prepend-inner-icon="mdi-magnify"
                      hide-details
                      color="primary"
                      class="mb-2"
                    />
                    <v-text-field
                      v-model="searchPlaceName"
                      label="Tên tổ chức"
                      prepend-inner-icon="mdi-magnify"
                      hide-details
                      color="primary"
                      class="mb-2"
                    />
                    <v-text-field
                      v-model="searchCity"
                      label="Tỉnh"
                      prepend-inner-icon="mdi-magnify"
                      hide-details
                      color="primary"
                    />
                    <v-btn
                      class="mt-2"
                      variant="tonal"
                      color="primary"
                      block
                      @click="getSearchPlaceLst"
                      :loading="loadding"
                    >
                      Tìm kiếm
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-menu>
            </span>
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
          height="calc(100vh - 170px)"
          :loading="loadding"
          :items-per-page-options="[
            { value: 10, title: '10' },
            { value: 50, title: '50' },
            { value: 100, title: '100' },
            { value: 10000, title: 'All' },
          ]"
        >
          <template v-slot:item.Key="{ item }">
            {{ item.raw.Key }}
            <v-icon
              color="primary"
              size="small"
              class="me-2"
              @click="btCreate(item.raw)"
              >mdi-check-circle
            </v-icon>
          </template>
        </v-data-table-server>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="isShowUpdatePlace" persistent width="800"
    ><Update :placeID="placeInfoBFO.PlaceID" @btClose="btClose" />
  </v-dialog>
  <notifications />
</template>

<script>
import {
  GetPlaceStandardLst,
  GetSearchPlaceLst,
  CreatePlaceStandard,
  DelPlaceStandard,
} from "@/api/crm";
import Update from "@/views/customer/components/update.vue";

export default {
  components: {
    Update,
  },
  data() {
    return {
      isMenuSearch: false,
      headers: [
        { title: "STT", sortable: false, key: "Key" },
        { title: "Mã TC", key: "PlaceID", sortable: false },
        { title: "Tổ chức", key: "PlaceName", sortable: false },
        { title: "SĐT", key: "Phone", sortable: false, align: "center" },
        { title: "Tỉnh", key: "City", sortable: false, align: "center" },
        { title: "", key: "Action", sortable: false, align: "center" },
      ],
      desserts: [],
      pageNumber: 1,
      rowspPage: 10,
      search: "",
      dataLength: 0,
      searchPhone: "",
      searchPlaceName: "",
      searchCity: "",
      loadding: false,
      dataGroups: [],
      placeInfoBFO: {},
      isShowUpdatePlace: false,
    };
  },
  methods: {
    btClose() {
      this.isShowUpdatePlace = false;
    },
    btPage(data) {
      this.pageNumber = data;
    },
    btRow(data) {
      this.rowspPage = data;
    },
    btCreate(data) {
      console.log(data);
      if (data.PlaceID.length < 8) {
        this.placeInfoBFO = data;
        this.getPlaceStandardLst(data);
      } else {
        if (this.placeInfoBFO.PlaceID) {
          this.createPlaceStandard(data);
        } else {
          notify({
            type: "error",
            title: "Lỗi",
            text: "Bạn cần chọn khách hàng chuẩn hóa trước",
          });
        }
      }
    },
    getSearchPlaceLst() {
      this.loadding = true;
      GetSearchPlaceLst({
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: "",
        SearchPhone: this.searchPhone,
        SearchCity: this.searchCity,
        SearchPlaceName: this.searchPlaceName,
      }).then((res) => {
        if (res) {
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
            };
          });
          this.dataLength = res.TotalRows;
          this.loadding = false;
        }
      });
    },
    getPlaceStandardLst(data) {
      GetPlaceStandardLst({
        PlaceIDBFO: data.PlaceID,
      }).then((res) => {
        if (res) {
          this.dataGroups = res.Data;
        }
      });
    },
    createPlaceStandard(data) {
      CreatePlaceStandard({
        PlaceID: data.PlaceID,
        PlaceIDBFO: this.placeInfoBFO.PlaceID,
      }).then((res) => {
        if (res) {
          this.getPlaceStandardLst(this.placeInfoBFO);
          notify({
            type: "success",
            title: "Thành công",
            text: "Thêm khách hàng chuẩn hóa thành công",
          });
        }
      });
    },
    delPlaceStandard(data) {
      DelPlaceStandard({
        PlaceID: data.PlaceID,
        PlaceIDBFO: this.placeInfoBFO.PlaceID,
      }).then((res) => {
        if (res) {
          this.getPlaceStandardLst(this.placeInfoBFO);
          notify({
            type: "success",
            title: "Thành công",
            text: "Xóa khách hàng chuẩn hóa thành công",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.groups {
  overflow-y: scroll;
  height: calc(100vh - 250px);
  padding-right: 2px;
  &::-webkit-scrollbar-track-piece {
    background: #ffffff;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(var(--v-theme-primary));
    border-radius: 20px;
  }
}
</style>
