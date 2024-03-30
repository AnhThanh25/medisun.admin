<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <div class="d-flex" style="justify-content: space-between">
            <h6 class="text-h6 py-2">Danh sách banner</h6>
            <v-btn
              color="secondary"
              variant="tonal"
              icon="mdi-image-plus"
              style="height: 42px"
              @click="dialogValue = true"
            ></v-btn>
          </div>
        </VCardTitle>
        <VCardText>
          <VDataTable
            :headers="headers"
            :items="orders"
            :items-per-page="itemsPerPage"
            :loading="isLoading"
            fixed-header
            hover
            hide-default-footer
          >
            <template #item.LinkImage="{ item }">
              <img
                :src="item.selectable.LinkImage"
                alt=""
                style="height: 400px; border-radius: 10px; max-width: 100%"
              />
            </template>
            <template #item.Action="{ item }">
              <v-btn
                color="error"
                variant="text"
                icon="mdi-delete"
                @click="delBanner(item.selectable)"
              ></v-btn>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VDialog v-model="dialogValue" width="800">
    <VCard>
      <VCardTitle>
        <div class="d-flex align-center justify-space-between">
          <span class="text-h5"> Thêm banner </span>
          <VIcon class="cursor-pointer" @click="() => (dialogValue = false)">
            mdi-close
          </VIcon>
        </div>
      </VCardTitle>
      <VCardText>
        <p class="create-post__title">Hình ảnh banner</p>
        <drag-and-drop-image
          :fileImg="this.linkImg"
          @onChange="onImageChange"
        ></drag-and-drop-image>
      </VCardText>
      <!-- </VCard> -->
      <VCardActions>
        <VSpacer />

        <VBtn
          text="Xác nhận"
          variant="tonal"
          color="green"
          size="small"
          :loading="isUploading"
          @click="btUploadImageBanner"
        />
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script scoped>
import { TGetBannerLst, TDelBanner } from "@/api/bannerApi";
import DragAndDropImage from "@/components/DragAndDropImage.vue";
import axios from "axios";
import { getUserName, getToken, getStoreCode } from "@/utils/auth";

export default {
  components: { DragAndDropImage },
  data() {
    return {
      dialogValue: false,
      search: "",
      timeStart: "",
      timeEnd: "",
      page: 1,
      itemsPerPage: 10,
      headers: [
        { key: "LinkImage", title: "Ảnh", sortable: false },

        { key: "Action", title: "", sortable: false },
      ],
      orders: [],
      totalRows: 0,
      fileHandle: {},
      linkImg: {},
      isUploading: false,
    };
  },
  setup() {
    const username = getUserName();
    const token = getToken();
    const storeCode = getStoreCode();

    return { username, token, storeCode };
  },
  created() {
    this.getBannerLst();
  },
  methods: {
    onImageChange(file) {
      console.log("ảnh thay đổi");
      this.fileHandle = file;
      this.linkImg = file;
    },
    btUploadImageBanner() {
      this.isUploading = true;
      const formData = new FormData();
      formData.append("image", this.fileHandle);
      axios
        .post(
          `http://202.191.56.71/MediAPI/File/UploadImageBanner?UserName=${this.username}&Token=${this.token}&StoreCode=${this.storeCode}`,
          formData
        )
        .then((res) => {
          if (res.data.RespCode == 0) {
            this.isUploading = false;
            this.dialogValue = false;
            notify({
              type: "success",
              title: "Thành công",
              text: "Thêm banner thành công'",
            });
            this.getBannerLst();
          } else {
            this.isUploading = false;
            notify({
              type: "error",
              title: "Lỗi",
              text: res.data.RespText,
            });
          }
        })
        .catch((error) => {
          this.isUploading = false;
          console.error("Error uploading image:", error);
        });
    },
    getBannerLst() {
      TGetBannerLst({}).then((res) => {
        if (res.RespCode == 0) {
          this.orders = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
            };
          });
        }
      });
    },
    delBanner(data) {
      TDelBanner({
        BannerID: data.BannerID,
      }).then((res) => {
        if (res.RespCode == 0) {
          notify({
            type: "success",
            title: "Thành công",
            text: "Xóa banner thành công",
          });
          this.getBannerLst();
        }
      });
    },
  },
};
</script>
