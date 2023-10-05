<template>
  <v-card>
    <v-card-title class="text-h6 py-4"> Danh sách thuốc kê đơn </v-card-title>
    <v-data-table-server
      :items-length="totalLength"
      @update:itemsPerPage="btRow"
      @update:page="btPage"
      no-data-text="Không có dữ liệu"
      :headers="headers"
      :items="desserts"
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
            @click="isShowCreateProduct = true"
            icon="mdi-pill"
            style="height: 42px"
          ></v-btn>
        </div>
      </template>
      <template v-slot:item.Exprice="{ item }">
        {{ new Intl.NumberFormat().format(item.raw.Exprice) }}
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
    </v-data-table-server>
  </v-card>
  <v-dialog v-model="isShowCreateProduct" persistent width="500">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Thêm sản phẩm</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="productInfo.ProductName"
                  label="Tên sản phẩm"
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
                <v-text-field
                  label="Đơn vị bán"
                  v-model="productInfo.Unit"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Mô tả"
                  v-model="productInfo.Description"
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
          @click="isShowCreateProduct = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="addProduct"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowUpdateProduct" persistent width="500">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Cập nhật thông tin sản phẩm</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="productUpdate.ProductName"
                  label="Tên sản phẩm"
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
                <v-text-field
                  label="Đơn vị bán"
                  v-model="productUpdate.Unit"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Mô tả"
                  v-model="productUpdate.Description"
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
          @click="isShowUpdateProduct = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="updateProduct"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowDelProduct" width="400">
    <v-card>
      <v-toolbar
        class="pl-2"
        color="error"
        title="Xóa sản phẩm"
        center
      ></v-toolbar>
      <v-card-text>
        <div class="text-h5 pt-4">
          Có chắc bạn muốn xóa sản phẩm
          <span style="color: #1e88e5">{{ itemDel.ProductName }}</span> này
          không?
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="blue" variant="text" @click="isShowDelProduct = false"
          >Đóng</v-btn
        >
        <v-btn variant="text" @click="delProduct">Xóa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script>
import {
  PKGetProductLst,
  PKUpdateProductInfo,
  PKDelProductInfo,
} from "@/api/product";
export default {
  data() {
    return {
      show1: false,
      show2: false,
      productInfo: {},
      fromDateVal: "",
      isShowDelProduct: false,
      isShowUpdateProduct: false,
      isShowCreateProduct: false,
      search: "",
      headers: [
        {
          title: "STT",
          sortable: false,
          key: "Key",
          width: "60px",
        },
        { title: "Mã DV", key: "ProductID", width: "120px" },
        { title: "Tên DV", key: "ProductName" },
        { title: "Giá", key: "Exprice" },
        { title: "Đơn vị bán", key: "Unit" },
        { title: "Mô tả", key: "Description" },
        { title: "Action", key: "Action", width: "80px" },
      ],
      desserts: [],
      pageNumber: 1,
      rowspPage: 10,
      search: "",
      date: null,
      menu2: false,
      productUpdate: {},
      price: null,
      itemDel: {},
      totalLength: 0,
    };
  },
  watch: {
    pageNumber() {
      this.getProductLst();
    },
    rowspPage() {
      this.getProductLst();
    },
    search(newValue) {
      if (newValue.length > 4 || newValue.length == 0) {
        this.getProductLst();
      }
    },
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
      this.isShowDelProduct = true;
    },
    delProduct() {
      PKDelProductInfo({ ProductID: this.itemDel.ProductID }).then((res) => {
        if (res) {
          this.isShowDelProduct = false;
          this.getProductLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Xóa sản phẩm thành công",
          });
        }
      });
    },
    addProduct() {
      PKUpdateProductInfo({
        Data: { ...this.productInfo, Price: this.price },
      }).then((res) => {
        if (res) {
          this.isShowCreateProduct = false;
          this.getProductLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Thêm mới sản phẩm thành công",
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
      this.productUpdate = { ...data };
      this.isShowUpdateProduct = true;
      this.priceFormatted = this.productUpdate.Exprice.toString();
    },
    updateProduct() {
      PKUpdateProductInfo({
        Data: { ...this.productUpdate, Price: this.price },
      }).then((res) => {
        if (res) {
          this.isShowUpdateProduct = false;
          this.getProductLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Cập nhật sản phẩm thành công",
          });
        }
      });
    },
    getProductLst() {
      PKGetProductLst({
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
          this.totalLength = res.TotalRows;
        }
      });
    },
  },
  created() {
    this.getProductLst();
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
