<template>
  <v-card>
    <v-card-title class="text-h6 py-4">Danh sách vật liệu labo</v-card-title>
    <v-data-table
      no-data-text="Không có dữ liệu"
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
            icon="mdi-archive-plus"
            variant="tonal"
            @click="btCreateMedical"
            style="height: 42px"
          ></v-btn>
        </div>
      </template>
      <template v-slot:item.ImPrice="{ item }">
        {{ new Intl.NumberFormat().format(item.raw.ImPrice) }}
      </template>
      <template v-slot:item.ExPrice="{ item }">
        {{ new Intl.NumberFormat().format(item.raw.ExPrice) }}
      </template>
      <template v-slot:item.Image="{ item }">
        <img
          :src="item.raw.Image"
          alt=""
          style="height: 60px; width: 60px; object-fit: cover"
        />
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
  <v-dialog v-model="isShowCreateMaterial" persistent width="600">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-2 py-2" v-if="materialInfo.MaterialName">
          Cập nhật thông tin vật liệu
        </h6>
        <h6 class="text-h6 px-2 py-2" v-else>Thêm vật liệu mới</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="Tên vật liệu"
              v-model="materialInfo.MaterialName"
            ></v-text-field>
            <v-text-field
              label="Đơn vị"
              v-model="materialInfo.Unit"
            ></v-text-field>
            <!-- <v-select
              :items="['Cái', 'Hộp']"
              label="Đơn vị"
              v-model="materialInfo.Unit"
            ></v-select> -->
            <v-text-field
              label="Ghi chú"
              hide-details
              v-model="materialInfo.Note"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="Giá nhập"
              v-model="imPriceFormatted"
            ></v-text-field>
            <v-text-field
              label="Giá bán"
              v-model="exPriceFormatted"
            ></v-text-field>
            <v-file-input
              v-model="imageMaterial"
              label="Hình ảnh"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon=""
              hide-details
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowCreateMaterial = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="btSaveUpdate" v-if="materialInfo.MaterialName">
          Lưu thông tin
        </v-btn>
        <v-btn @click="addMaterial" v-else> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowDelMaterial" width="400">
    <v-card>
      <v-toolbar
        class="pl-2"
        color="error"
        title="Xóa dịch vụ"
        center
      ></v-toolbar>
      <v-card-text>
        <div class="text-h5 pt-4">Có chắc bạn muốn xóa vật liệu này không?</div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="blue" variant="text" @click="isShowDelMaterial = false"
          >Đóng</v-btn
        >
        <v-btn variant="text" @click="delMaterial">Xóa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script>
import { GetMaterialLst, AddMaterial, DelMaterial } from "@/api/material";
import { urlUploadImageMaterial } from "./variable";
import Axios from "axios";
import { getClinicID } from "@/utils/auth";
export default {
  data() {
    return {
      isShowDelMaterial: false,
      isShowCreateMaterial: false,
      search: "",
      headers: [
        { title: "STT", sortable: false, key: "Key" },
        { title: "Mã vật liệu", key: "MaterialID", sortable: false },
        { title: "Tên vật liệu", key: "MaterialName", sortable: false },
        { title: "Giá nhập", key: "ImPrice", sortable: false },
        { title: "Giá bán", key: "ExPrice", sortable: false },
        { title: "Đơn vị", key: "Unit", sortable: false },
        { title: "Hình ảnh", key: "Image", sortable: false },
        { title: "Ghi chú", key: "Note", sortable: false },
        { title: "", key: "Action", sortable: false },
      ],
      desserts: [],
      materialInfo: {},
      materialLst: [],
      pageNumber: 1,
      rowspPage: 10,
      search: "",
      imPrice: null,
      exPrice: null,
      imageMaterial: null,
      itemDel: {},
    };
  },
  computed: {
    imPriceFormatted: {
      get: function () {
        return this.formatAsCurrency(this.imPrice, 0);
      },
      set: function (newValue) {
        if (newValue) {
          this.imPrice = Number(newValue?.replace(/[^0-9\.]/g, ""));
        } else {
          this.imPrice = null;
        }
      },
    },
    exPriceFormatted: {
      get: function () {
        return this.formatAsCurrency(this.exPrice, 0);
      },
      set: function (newValue) {
        if (newValue) {
          this.exPrice = Number(newValue?.replace(/[^0-9\.]/g, ""));
        } else {
          this.exPrice = null;
        }
      },
    },
  },
  methods: {
    btShowDel(data) {
      this.itemDel = { ...data };
      this.isShowDelMaterial = true;
    },
    delMaterial() {
      DelMaterial({
        MaterialID: this.itemDel.MaterialID,
      }).then((res) => {
        if (res) {
          this.isShowDelMaterial = false;
          this.getMaterialLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Xóa vật liệu thành công",
          });
        }
      });
    },
    btShowUpdate(data) {
      this.imageMaterial = null;
      this.materialInfo = data;
      this.imPriceFormatted = (data.ImPrice ?? 0).toString();
      this.exPriceFormatted = (data.ExPrice ?? 0).toString();
      this.isShowCreateMaterial = true;
    },
    btSaveUpdate() {
      AddMaterial({
        Data: {
          ...this.materialInfo,
          ImPrice: this.imPrice,
          ExPrice: this.exPrice,
        },
      }).then((res) => {
        if (res) {
          if (this.imageMaterial) {
            this.uploadImageMaterial(res.MaterialID, "Thêm");
          } else {
            this.getMaterialLst();
            notify({
              title: "Thành công",
              text: "Thêm thông tin vật liệu thành công",
              type: "success",
            });
          }
        }
      });
    },
    uploadImageMaterial(data, text) {
      const params = new FormData();
      params.append("file", this.imageMaterial[0]);

      Axios.post(urlUploadImageMaterial(data), params).then((res) => {
        if (res.data.RespCode == 0) {
          this.getMaterialLst();
          notify({
            title: "Thành công",
            text: text + " thông tin vật liệu thành công",
            type: "success",
          });
        } else {
          notify({
            title: "Lỗi",
            text: res.data.RespText,
            type: "error",
          });
        }
        this.isShowCreateMaterial = false;
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
    btCreateMedical() {
      this.isShowCreateMaterial = true;
      this.imageMaterial = null;
      this.imPriceFormatted = "";
      this.exPriceFormatted = "";
      this.materialInfo = {};
    },
    addMaterial() {
      AddMaterial({
        Data: {
          ...this.materialInfo,
          ImPrice: this.imPrice,
          ExPrice: this.exPrice,
        },
      }).then((res) => {
        if (res) {
          if (this.imageMaterial) {
            this.uploadImageMaterial(res.MaterialID, "Thêm");
          } else {
            this.getMaterialLst();
            notify({
              title: "Thành công",
              text: "Thêm thông tin vật liệu thành công",
              type: "success",
            });
          }
        }
      });
    },
    getMaterialLst() {
      GetMaterialLst({
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: this.search,
      }).then((res) => {
        if (res) {
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              Image:
                "http://202.191.56.172/PKPosAPI/File/GetImageMaterial?ClinicID=" +
                getClinicID() +
                "&MaterialID=" +
                item.MaterialID +
                "&Size=400?t=" +
                new Date().getTime(),
            };
          });
        }
      });
    },
  },
  created() {
    this.getMaterialLst();
  },
};
</script>

<style lang="scss" scoped>
.container-image {
  .teeth-adust {
    height: 50px;
  }
}
</style>
