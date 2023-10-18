<template>
  <v-card>
    <v-card-title class="text-h6 py-4"> Địa bàn </v-card-title>
    <v-data-table-server
      :items-length="totalLength"
      @update:itemsPerPage="btRow"
      @update:page="btPage"
      no-data-text="Không có dữ liệu"
      :headers="headers"
      :items="desserts"
      :search="search"
      height="calc(100vh - 210px)"
      items-per-page-text="Số dòng 1 trang"
      sort-asc-icon="mdi-menu-up"
      sort-desc-icon="mdi-menu-down"
    >
      <template v-slot:top>
        <div class="d-flex flex-wrap gap-2">
          <span>
            <v-text-field
              v-model="search"
              label="Tìm kiếm"
              class="ml-4"
              variant="outlined"
              hide-details
              density="compact"
              style="width: 250px !important"
              prepend-inner-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </span>

          <v-btn
            color="blue"
            variant="tonal"
            @click="btShowCreate"
            icon="mdi-text-box-plus"
            style="height: 42px"
          ></v-btn>
        </div>
      </template>
      <template v-slot:item.Status="{ item }">
        <v-chip color="success" size="small" v-if="item.raw.Status == 2"
          >Đã duyệt
        </v-chip>
        <v-chip color="primary" size="small" v-if="item.raw.Status == 1">
          Đăng ký
        </v-chip>
        <v-chip color="error" size="small" v-if="item.raw.Status == 0">
          Xóa
        </v-chip>
      </template>
      <template v-slot:item.Action="{ item }">
        <v-icon
          color="primary"
          size="small"
          class="me-2"
          @click="btShowConfirm(item.raw)"
          v-if="item.raw.Status == 1"
          >mdi-check-circle
        </v-icon>

        <v-icon color="primary" size="small" @click="btShowDel(item.raw)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table-server>
  </v-card>
  <v-dialog v-model="isShowCreate" persistent width="400">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Thêm địa bàn mới</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="placeName"
              :items="cityLst"
              label="Địa bàn"
              item-title="city"
              item-value="city"
              class="ml-1"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowCreate = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="addPlaceByID"> Đăng ký </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowConfirm" persistent width="400">
    <v-card>
      <v-toolbar
        class="pl-2"
        color="success"
        title="Phê duyệt địa bàn"
        center
      ></v-toolbar>
      <v-card-text>
        <div class="text-h5 pt-4">
          Có chắc bạn muốn phê duyệt địa bàn này không?
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="blue" variant="text" @click="isShowConfirm = false"
          >Đóng</v-btn
        >
        <v-btn
          variant="text"
          color="success"
          @click="updateLocalByID(itemConfirm.RowID, 2)"
          >Phê duyệt</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowDel" width="400">
    <v-card>
      <v-toolbar
        class="pl-2"
        color="error"
        title="Xóa địa bàn"
        center
      ></v-toolbar>
      <v-card-text>
        <div class="text-h5 pt-4">Có chắc bạn muốn xóa địa bàn này không?</div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="blue" variant="text" @click="isShowDel = false"
          >Đóng</v-btn
        >
        <v-btn variant="text" @click="updateLocalByID(itemDel.RowID, 0)"
          >Xóa</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script>
import { AddPlaceByID, UpdateLocalByID, GetPlaceLst } from "@/api/crm";
import { getToken } from "@/utils/auth";
import { GetCity } from "@/api/default";
export default {
  data() {
    return {
      defaultInfo: {},
      isShowDel: false,
      isShowConfirm: false,
      isShowCreate: false,
      search: "",
      headers: [
        { title: "STT", sortable: false, key: "Key" },
        { title: "Nhân viên", key: "FullName", sortable: false },
        { title: "Địa bàn", key: "City", sortable: false },
        { title: "Trạng thái", key: "Status", sortable: false },
        { title: "", key: "Action" },
      ],
      desserts: [],

      pageNumber: 1,
      rowspPage: 10,
      search: "",
      date: null,
      defaultUpdate: {},
      price: null,
      itemDel: {},
      itemConfirm: {},
      totalLength: 0,
      cityLst: [],
      placeName: "",
    };
  },
  watch: {
    pageNumber(newValue) {
      this.getPlaceLst();
    },
    rowspPage(newValue) {
      this.getPlaceLst();
    },
  },
  methods: {
    btShowCreate() {
      this.isShowCreate = true;
      this.getCityNow();
    },
    getCityNow() {
      GetCity({ token: getToken() }).then((res) => {
        if (res.ResCode == 0) {
          this.cityLst = res.Data;
        }
      });
    },
    btPage(data) {
      this.pageNumber = data;
    },
    btRow(data) {
      this.rowspPage = data;
    },
    btShowDel(data) {
      this.itemDel = { ...data };
      this.isShowDel = true;
    },

    addPlaceByID() {
      AddPlaceByID({
        PlaceLst: this.placeName,
      }).then((res) => {
        if (res) {
          this.isShowCreate = false;
          this.getPlaceLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Đăng ký địa bàn mới thành công",
          });
        }
      });
    },
    updateLocalByID(rowID, status) {
      UpdateLocalByID({
        RowID: rowID,
        Status: status,
      }).then((res) => {
        if (res) {
          this.isShowConfirm = false;
          this.isShowDel = false;
          this.getPlaceLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Cập nhật địa bàn mới thành công",
          });
        }
      });
    },
    btShowConfirm(data) {
      this.itemConfirm = { ...data };
      this.isShowConfirm = true;
    },

    getPlaceLst() {
      GetPlaceLst({
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: this.search,
      }).then((res) => {
        if (res) {
          var num = (this.pageNumber - 1) * this.rowspPage;
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1 + num,
            };
          });
          this.totalLength = res.TotalRows;
        }
      });
    },
  },
  created() {
    this.getPlaceLst();
  },
};
</script>

<style>
.custom-picker .v-overlay__content {
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 0px);
}
@media screen and (max-width: 598px) {
  .custom-picker .v-overlay__content {
    position: absolute;
    top: calc(50% - 60px);
    left: calc(50% - 125px);
  }
}
</style>
