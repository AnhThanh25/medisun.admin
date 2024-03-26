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
            @click:row="rowClicked"
          >
            <template #item.imgList="{ item }">
              <!-- {{ item.columns.imgList[0].LinkImage }} -->
              <div v-if="item.columns.imgList.length === 0">Không có ảnh</div>
              <img
                v-else
                :src="
                  item.columns.imgList[0].LinkImage + '?' + new Date().getTime()
                "
                style="width: 50px; max-height: 50px; object-fit: cover"
              />
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VDialog v-model="dialogAdd" persistent width="800">
    <CreateNewProduct
      v-if="dialogAdd"
      v-model:modelValue="dialogAdd"
      @success="getProductList"
      @close="btClose"
    />
  </VDialog>
  <!-- <ProductInfo
    v-if="dialogEdit"
    v-model:dialog="dialogEdit"
    :selected-product="selectedProduct"
    @success="getProductList"
    @delete="getProductList"
  /> -->
</template>

<script scoped>
import { GetProductLst } from "@/api/productAPI";
import { debounce } from "lodash";
import CreateNewProduct from "./CreateNewProduct.vue";
// import ProductInfo from "./ProductInfo.vue";

export default {
  components: { CreateNewProduct },

  data() {
    return {
      dialogAdd: false,
      dialogEdit: false,
      search: "",
      page: 1,
      itemsPerPage: 10,
      headers: [
        {
          align: "start",
          key: "name",
          title: "Tên sản phấm",
          sortable: false,
        },
        { key: "imgList", sortable: false, title: "Ảnh SP" },
        { key: "exprice", sortable: false, title: "Giá bán" },
        { key: "tag", sortable: false, title: "Loại hàng" },
        { key: "quantity", sortable: false, title: "Tồn kho" },
        { key: "unit", sortable: false, title: "Đơn vị" },
      ],
      products: [],
      selectedProduct: null,
      message: "",
      respData: "",
      error: "",
      isLoading: false,
      totalRows: 0,
      totalPages: 0,
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
    getProductList() {
      this.isLoading = true;
      GetProductLst({
        PageNumber: this.page,
        RowspPage: this.itemsPerPage,
        Search: this.search,
      }).then((res) => {
        this.isLoading = false;
        if (res.RespCode == 0) {
          this.products = res.Data;
          this.totalRows = res.TotalRows;
        }
      });
    },
    rowClicked(event, item) {
      this.dialogEdit = true;
      this.selectedProduct = item;
    },
    newProduct() {
      this.dialogAdd = true;
    },
    btClose() {
      this.dialogAdd = false;
    },
  },
};
</script>
