<template>
  <v-card>
    <v-card-title>
      <h6 class="text-h6 px-2 py-2">
        Thông tin mua hàng - {{ placeID.PlaceID }} - {{ placeID.PlaceName }}
      </h6>
    </v-card-title>
    <v-card-text>
      <v-data-table-server
        no-data-text="Không có dữ liệu"
        :headers="headers"
        :items="productSales"
        items-per-page-text=""
        sort-asc-icon="mdi-menu-up"
        sort-desc-icon="mdi-menu-down"
        :items-length="dataLength"
        @update:itemsPerPage="btRow"
        @update:page="btPage"
        height="calc(100vh - 250px)"
        :loading="loadding"
        :items-per-page-options="[
          { value: 10, title: '10' },
          { value: 50, title: '50' },
          { value: 100, title: '100' },
          { value: 10000, title: 'All' },
        ]"
      >
        <template v-slot:item.UnitPrice="{ item }">
          {{ new Intl.NumberFormat().format(item.raw.UnitPrice) }}
        </template>
      </v-data-table-server>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="btClose">
        Đóng
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { GetProductSalesByPlaceID } from "@/api/crm";

export default {
  props: {
    placeID: String,
  },
  data() {
    return {
      productSales: [],
      dataLength: 0,
      loadding: false,
      headers: [
        {
          title: "STT",
          sortable: false,
          key: "Key",
          width: 50,
          align: "center",
        },
        { title: "Đơn hàng", key: "DocumentID", sortable: false },
        { title: "Mã sp", key: "ProductID", sortable: false },
        { title: "Sản phẩm", key: "ProductName", sortable: false },
        { title: "Đơn vị", key: "Unit", sortable: false, align: "center" },
        {
          title: "Số lượng",
          key: "Quantity",
          sortable: false,
          align: "center",
        },
        { title: "Giá", key: "UnitPrice", sortable: false, align: "center" },
        { title: "VAT", key: "VAT", sortable: false, align: "center" },
        { title: "NV", key: "EmName", sortable: false, align: "center" },
        { title: "Số NV", key: "EmPhone", sortable: false, align: "center" },
        {
          title: "Ngày đặt",
          key: "OrderDate",
          sortable: false,
          align: "center",
        },
      ],
      pageNumber: 1,
      rowspPage: 10,
      search: "",
    };
  },
  emits: ["btClose"],
  watch: {
    "placeID.PlaceID"() {
      this.getProductSalesByPlaceID();
    },
    pageNumber() {
      this.getProductSalesByPlaceID();
    },
    rowspPage() {
      this.getProductSalesByPlaceID();
    },
  },
  methods: {
    btPage(data) {
      this.pageNumber = data;
    },
    btRow(data) {
      this.rowspPage = data;
    },
    btClose() {
      this.$emit("btClose");
    },
    getProductSalesByPlaceID() {
      console.log("Chạy vào đây");
      this.loadding = true;
      GetProductSalesByPlaceID({
        PlaceID: this.placeID.PlaceID,
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: "",
      }).then((res) => {
        this.loadding = false;
        console.log(res);
        this.productSales = res.Data.map((item, index) => {
          return {
            ...item,
            Key: index + 1,
          };
        });
        this.dataLength = res.TotalRows;
      });
    },
  },
  created() {
    this.getProductSalesByPlaceID();
  },
};
</script>

<style></style>
