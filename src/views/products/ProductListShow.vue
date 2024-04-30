<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="12" md="4">
              <VBtn class="mt-3" color="primary" @click="newProduct">
                Thêm sản phẩm
              </VBtn>
            </VCol>
            <VSpacer />

            <VCol cols="12" md="7">
              <VTextField
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                class="pa-2"
                label="Tìm kiếm"
                density="compact"
                hide-details
              />
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <VDataTable
            :items-per-page="-1"
            :headers="headers"
            :items="products"
            :loading="isLoading"
            fixed-header
            hover
            hide-default-footer
          >
            <template #item.imgList="{ item }">
              <div v-if="item.raw.ImgLst.length === 0">Không có ảnh</div>
              <img
                v-else
                :src="item.raw.ImgLst[0].LinkImage + '?' + new Date().getTime()"
                style="width: 50px; max-height: 50px; object-fit: cover"
              />
            </template>
            <template v-slot:item.Action="{ item }">
              <v-icon
                color="error"
                size="small"
                class="me-2"
                @click="btShowDel(item.raw)"
                >mdi-delete
              </v-icon>
            </template>
            <template v-slot:item.Key="{ item }">
              {{ item.raw.Key }}
              <v-icon
                color="primary"
                size="small"
                class="me-2"
                @click="rowClicked(item.raw)"
                >mdi-pencil
              </v-icon>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VDialog v-model="dialogAdd" persistent width="800">
    <CreateNewProduct
      v-model:modelValue="dialogAdd"
      @success="getProductList"
      @close="btClose"
    />
  </VDialog>
  <VDialog v-model="dialogEdit" persistent width="800">
    <ProductInfo :selected-product="selectedProduct" @btClose="btClose" />
  </VDialog>
  <v-dialog max-width="500" v-model="isShowDel">
    <v-card title="Xóa sản phẩm">
      <v-card-text>
        <div style="margin: 8px">Có chắc bạn muốn xóa sản phẩm này không?</div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Đóng" @click="isShowDel = false" color="more"></v-btn>
        <v-btn text="Xóa" @click="delProduct" color="success"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script scoped>
import { GetProductLst, DelProductInfo } from "@/api/productAPI";
import { debounce } from "lodash";
import CreateNewProduct from "./CreateNewProduct.vue";
import ProductInfo from "./ProductInfo.vue";

export default {
  components: { CreateNewProduct, ProductInfo },

  data() {
    return {
      dialogAdd: false,
      dialogEdit: false,
      search: "",
      page: 1,
      itemsPerPage: 10,
      headers: [
        {
          key: "Key",
          title: "STT",
          sortable: false,
          align: "center",
          width: "50",
        },
        {
          align: "start",
          key: "ProductName",
          title: "Tên sản phấm",
          sortable: false,
        },
        { key: "imgList", sortable: false, title: "Ảnh SP" },
        { key: "Description", sortable: false, title: "Mô tả" },
        { key: "Tag", sortable: false, title: "Loại" },
        // { key: "Detail", sortable: false, title: "Chi tiết" },
        { key: "Unit", sortable: false, title: "Đơn vị" },
        { key: "Action", sortable: false, title: "", width: 50 },
      ],
      products: [],
      selectedProduct: null,
      message: "",
      respData: "",
      error: "",
      isLoading: false,
      totalRows: 0,
      totalPages: 0,
      isShowDel: false,
      itemDel: {},
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalRows / this.itemsPerPage);
    },
  },
  watch: {
    itemsPerPage(value) {
      this.page = 1;
      this.getProductList();
    },
    page(value) {
      this.getProductList();
    },
    search(value) {
      this.debouncedGetProductList();
    },
    pageCount(value) {
      if (this.page > this.pageCount && this.pageCount > 0) {
        this.page = this.pageCount;
      }
    },
  },
  mounted() {
    this.getProductList();
  },
  created() {
    this.debouncedGetProductList = debounce(this.getProductList, 300);
  },
  methods: {
    delProduct() {
      DelProductInfo({
        ProductID: this.itemDel.ProductID,
      }).then((res) => {
        if (res.RespCode == 0) {
          this.isShowDel = false;
          notify({
            type: "success",
            title: "Thành công",
            text: "Xóa sản phẩm thành công",
          });
          this.getProductList();
        }
      });
    },
    btShowDel(data) {
      this.isShowDel = true;
      this.itemDel = data;
    },
    getProductList() {
      this.isLoading = true;
      GetProductLst({
        PageNumber: this.page,
        RowspPage: this.itemsPerPage,
        Search: this.search,
      }).then((res) => {
        this.isLoading = false;
        if (res.RespCode == 0) {
          this.products = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
            };
          });
          this.totalRows = res.TotalRows;
        }
      });
    },
    rowClicked(item) {
      // this.dialogEdit = true;
      this.selectedProduct = item;
      this.$router.push(
        "/san-pham/chi-tiet-san-pham/" + this.selectedProduct.ProductID
      );
    },
    newProduct() {
      // this.dialogAdd = true;
      this.$router.push("/san-pham/tao-san-pham");
    },
    btClose() {
      this.dialogAdd = false;
      this.dialogEdit = false;
      this.getProductList();
    },
  },
};
</script>
