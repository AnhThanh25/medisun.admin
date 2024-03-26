<template>
  <VCard>
    <VCardItem>
      <VCardTitle>
        <div class="d-flex align-center justify-space-between">
          <span class="text-h5"> Thêm sản phẩm</span>
          <VIcon class="cursor-pointer" @click="onClose"> mdi-close </VIcon>
        </div>
      </VCardTitle>
    </VCardItem>
    <VCardText>
      <!-- 👉 Form -->
      <VForm ref="form" class="mt-6">
        <VRow>
          <VCol cols="12" md="6">
            <VTextField
              v-model="productInfo.Barcode"
              label="Mã vạch"
              type="text"
              append-inner-icon="mdi-barcode-scan"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="6">
            <VSelect
              v-model="productInfo.Tag"
              label="Phân loại"
              :items="tagLst"
              hide-details
            />
          </VCol>
          <VCol md="12" cols="12">
            <VTextField
              v-model="productInfo.ProductName"
              type="text"
              label="Tên sản phẩm"
              hide-details
            />
          </VCol>

          <VCol cols="12" md="12">
            <VTextarea
              v-model="productInfo.Description"
              label="Mô tả"
              type="text"
              hide-details
              :cols="2"
            />
          </VCol>
          <VCol cols="12" md="12">
            <VTextarea
              v-model="productInfo.Detail"
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
              clearable="true"
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
              v-model="productInfo.Unit"
              label="Đơn vị"
              :items="unitLst"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="4">
            <VSelect
              v-model="productInfo.ProductType"
              label="Trạng thái"
              :items="productTypeLst"
              hide-details
            />
          </VCol>
          <VCol col="12" md="12">
            <VAlert
              v-if="error"
              color="error"
              icon="$error"
              title="Thêm sản phẩm thất bại"
              :text="error.message"
            />
          </VCol>

          <VCol cols="12" class="d-flex flex-wrap gap-4">
            <v-spacer />
            <VBtn :loading="isLoadingUpdate" @click="updateProductInfo">
              Thêm sản phẩm
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>

  <notifications />
</template>

<script>
import { UpdateProductInfo } from "@/api/productAPI";
export default {
  data() {
    return {
      productInfo: {},
      tagLst: ["Giới thiệu sản phẩm"],
      productTypeLst: ["Public", "Private"],
      unitLst: ["Cái", "Hộp", "Túi", "Thùng"],
      imgList: [],
      previewImage: {},
      isLoadingUpdate: false,
    };
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
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
    updateProductInfo() {
      this.isLoadingUpdate = true;
      var req = {
        RowID: 1,
        StoreCode: "sample string 2",
        ProductID: "sample string 3",
        ProductName: "sample string 4",
        Imprice: 5.0,
        Exprice: 6.0,
        Barcode: "sample string 7",
        Quantity: 8,
        IsBatch: 9,
        ProductType: "sample string 10",
        Producer: "sample string 11",
        Tag: "sample string 12",
        Unit: "sample string 13",
        Description: "sample string 14",
        Favourite: 15,
        TimeCreate: "sample string 16",
        ModifyID: "sample string 17",
        TimeModify: "sample string 18",
        Creater: "sample string 19",
        Status: 20,
        Detail: "sample string 21",
      };
      UpdateProductInfo({
        Data: req,
      }).then((res) => {
        this.isLoadingUpdate = false;

        if (res.RespCode == 0) {
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
      });
    },
  },
};
</script>
