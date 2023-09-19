<template>
  <v-card>
    <v-card-title class="text-h6 py-4"> Danh sách dịch vụ </v-card-title>
    <v-data-table  no-data-text="Không có dữ liệu"
      :headers="headers"
      :items="desserts"
      :search="search"
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
            ></v-text-field>
          </span>

          <v-btn
            color="blue"
            variant="tonal"
            @click="isShowCreateService = true"
            icon="mdi-note-plus"
            style="height: 42px"
          ></v-btn>
        </div>
      </template>
      <template v-slot:item.Action="{ item }">
        <v-icon
          color="primary"
          size="small"
          class="me-2"
          @click="btShowUpdate(item.raw)"
          >mdi-pencil
        </v-icon>

        <v-icon color="primary" size="small" @click="btShowDel(item.raw)">
          mdi-delete
          <v-tooltip text="Xóa"> </v-tooltip>
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
  <v-dialog v-model="isShowCreateService" persistent width="500">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Thêm dịch vụ</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="serviceInfo.ServiceName"
                  label="Tên dịch vụ"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Giá"
                  hide-details
                  v-model="priceFormatted"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Mô tả"
                  v-model="serviceInfo.Description"
                  hide-details
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowCreateService = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="addService"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowUpdateService" persistent width="500">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Cập nhật thông tin dịch vụ</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="serviceUpdate.ServiceName"
                  label="Tên dịch vụ"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Giá"
                  v-model="priceFormatted"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Mô tả"
                  v-model="serviceUpdate.Description"
                  hide-details
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowUpdateService = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="updateService"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowDelService" width="400">
    <v-card>
      <v-toolbar
        class="pl-2"
        color="error"
        title="Xóa dịch vụ"
        center
      ></v-toolbar>
      <v-card-text>
        <div class="text-h5 pt-4">Có chắc bạn muốn xóa dịch vụ này không?</div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="blue" variant="text" @click="isShowDelService = false"
          >Đóng</v-btn
        >
        <v-btn variant="text" @click="delService">Xóa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script>
import {
  GetServiceLst,
  AddService,
  UpdateService,
  DelService,
} from "@/api/service";
export default {
  data() {
    return {
      show1: false,
      show2: false,
      serviceInfo: {},
      fromDateVal: "",
      isShowDelService: false,
      isShowUpdateService: false,
      isShowCreateService: false,
      search: "",
      sortBy: [{ key: "calories", order: "asc" }],
      headers: [
        {
          title: "STT",
          align: "start",
          sortable: false,
          key: "Key",
        },
        { title: "Mã DV", key: "ServiceID", sortable: false },
        { title: "Tên DV", key: "ServiceName", width: "25%" },
        { title: "Giá", key: "PriceShow" },
        { title: "Mô tả", key: "Description" },

        { title: "Action", key: "Action" },
      ],
      desserts: [],

      pageNumber: 1,
      rowspPage: 10,
      search: "",
      date: null,
      menu2: false,
      serviceUpdate: {},
      price: null,
      itemDel: {},
    };
  },
  computed: {
    priceFormatted: {
      get: function () {
        return this.formatAsCurrency(this.price, 0);
      },
      set: function (newValue) {
        this.price = Number(newValue.replace(/[^0-9\.]/g, ""));
      },
    },
  },

  methods: {
    btShowDel(data) {
      this.itemDel = { ...data };
      this.isShowDelService = true;
    },
    delService() {
      DelService({ ServiceID: this.itemDel.ServiceID }).then((res) => {
        if (res) {
          this.isShowDelService = false;
          this.getServiceLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Xóa dịch vụ thành công",
          });
        }
      });
    },
    addService() {
      AddService({
        Data: { ...this.serviceInfo, Price: this.price },
      }).then((res) => {
        if (res) {
          this.isShowCreateService = false;
          this.getServiceLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Thêm mới dịch vụ thành công",
          });
        }
      });
    },
    formatAsCurrency(value, dec) {
      dec = dec || 0;
      if (value === null) {
        return "";
      }
      return (
        "" + value?.toFixed(dec).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
      );
    },
    btShowUpdate(data) {
      this.serviceUpdate = { ...data };
      this.isShowUpdateService = true;
      this.priceFormatted = this.serviceUpdate.PriceShow;
    },
    updateService() {
      UpdateService({
        Data: { ...this.serviceUpdate, Price: this.price },
      }).then((res) => {
        if (res) {
          this.isShowUpdateService = false;
          this.getServiceLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Cập nhật dịch vụ thành công",
          });
        }
      });
    },
    getServiceLst() {
      GetServiceLst({
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: this.search,
      }).then((res) => {
        if (res) {
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              PriceShow: new Intl.NumberFormat().format(item.Price),
            };
          });
        }
      });
    },
  },
  created() {
    this.getServiceLst();
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
