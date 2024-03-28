<template>
  <VCard title="Thông tin sản phẩm">
    <VCardText>
      <!-- 👉 Form -->
      <VForm style="margin-top: 8px">
        <VRow>
          <VCol cols="12" md="6">
            <VTextField
              v-model="product.Barcode"
              label="Mã vạch"
              type="text"
              append-inner-icon="mdi-barcode-scan"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="6">
            <VSelect
              v-model="product.Tag"
              label="Phân loại"
              :items="tagLst"
              hide-details
            />
          </VCol>
          <VCol md="12" cols="12">
            <VTextField
              v-model="product.ProductName"
              type="text"
              label="Tên sản phẩm"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="12">
            <VTextarea
              v-model="product.Description"
              label="Mô tả"
              type="text"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="12">
            <VTextarea
              v-model="product.Detail"
              label="Chi tiết"
              type="text"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="4">
            <VFileInput
              v-model:model-value="imgList"
              color="secondary"
              counter
              accept="image/*"
              label="Ảnh sản phẩm"
              placeholder="Ảnh sản phẩm"
              prepend-icon=""
              prepend-inner-icon="mdi-image"
              variant="outlined"
              :show-size="1000"
              persistent-clear="false"
              @change="pickImage"
            />

            <VRow>
              <VCol
                v-for="(image, index) in onlineImages"
                :key="image"
                cols="3"
              >
                <VCard
                  class="mx-auto"
                  max-width="200"
                  height="200"
                  :image="image"
                  theme="dark"
                >
                  <VBtn
                    variant="tonal"
                    color="error"
                    icon="mdi-trash"
                    class="mt-2 ms-2"
                    @click="removeImage(index)"
                  />
                </VCard>
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="12" md="4">
            <VSelect
              v-model="product.Unit"
              label="Đơn vị"
              :items="unitLst"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="4">
            <VSelect
              v-model="product.ProductType"
              label="Trạng thái"
              :items="productTypeLst"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="4">
            <!-- <VImg v-if="previewImageUrl" :src="previewImageUrl" />
            <VImg v-else-if="previewImage" :src="previewImage" /> -->
          </VCol>
          <VCol cols="12" class="d-flex flex-wrap gap-4">
            <VSpacer />
            <VBtn :loading="isLoadingUpdate" @click="updateProductInfo">
              Cập nhật thông tin
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
  <VBtn
    class="close-btn"
    variant="text"
    icon="mdi-close"
    rounded
    @click="btClose"
  />
  <notifications />
</template>
<script>
import { UpdateProductInfo } from "@/api/productAPI";
import { getStoreCode } from "@/utils/auth";
import { uploadImage } from "@/api/uploadFile";

export default {
  props: {
    selectedProduct: Object,
  },
  data() {
    return {
      product: {},
      tagLst: ["Giới thiệu sản phẩm"],
      productTypeLst: ["Public", "Private"],
      unitLst: ["Cái", "Hộp", "Túi", "Thùng"],
      imgList: [],
      previewImage: {},
      isLoadingUpdate: false,
      onlineImages: [],
    };
  },
  emits: ["btClose"],
  watch: {
    "selectedProduct.ProductID"() {
      console.log("anhthanhf", this.selectedProduct);
      this.product = this.selectedProduct;
    },
  },
  methods: {
    pickImage(e) {
      if (e.target.files) {
        this.imgList.value = [e.target.files[0]];

        const image = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(image);
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
      }
    },
    btClose() {
      this.$emit("btClose");
    },
    updateProductInfo() {
      this.isLoadingUpdate = true;
      UpdateProductInfo({
        Data: {
          ...this.product,
          StoreCode: getStoreCode(),
          UnitLst: [],
          ImgLst: [],
        },
      }).then((res) => {
        this.isLoadingUpdate = false;

        if (res.RespCode == 0) {
          uploadImage(res.ProductID, this.imgList[0]);
          notify({
            type: "success",
            title: "Thành công",
            text: "Cập nhật sản phẩm thành công",
          });
        } else {
          notify({
            type: "error",
            title: "Lỗi",
            text: res.RespText,
          });
        }
        this.btClose();
      });
    },
  },
  created() {
    this.product = this.selectedProduct;
  },
};
</script>
<style lang="scss" scoped>
.item-title {
  font-size: 16px;
  font-weight: 500;
}
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
