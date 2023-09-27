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
        </div> </template
    ></v-data-table>
  </v-card>
  <v-dialog v-model="isShowCreateMaterial" persistent width="600">
    <v-card>
      <v-card-title>
        <h6 class="text-h5 px-2 py-2">Thêm vật liệu mới</h6>
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
              v-model="materialInfo.LinkImage"
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
        <v-btn @click="addMaterial"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { GetMaterialLst, AddMaterial, DelMaterial } from "@/api/material";
export default {
  data() {
    return {
      isShowCreateMaterial: false,
      search: "",
      headers: [
        {
          title: "STT",
          align: "start",
          sortable: false,
          key: "Key",
        },
        { title: "Mã vật liệu", key: "calories" },
        { title: "Tên vật liệu", key: "name" },
        { title: "Giá nhập", key: "carbs" },
        { title: "Giá bán", key: "carbs" },
        { title: "Hình ảnh", key: "protein" },
        { title: "Ghi chú", key: "fat" },
        { title: "Chức năng", key: "" },
      ],
      desserts: [],
      materialInfo: {},
      materialLst: [],
      pageNumber: 1,
      rowspPage: 10,
      search: "",
      imPrice: null,
      exPrice: null,
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
          this.isShowCreateMaterial = false;
          this.getMaterialLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Xóa sản phẩm thành công",
          });
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
