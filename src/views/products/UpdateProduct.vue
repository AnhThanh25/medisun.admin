<template>
  <div class="container-product">
    <el-form class="create-product" ref="postRef" :model="product">
      <h2 style="margin-top: -12px">Chi tiết sản phẩm</h2>

      <v-text-field
        label="Tên sản phẩm"
        variant="outlined"
        v-model="product.ProductName"
        density="compact"
        hide-details
        class="mb-2"
      ></v-text-field>

      <VSelect
        v-model="product.Tag"
        :items="tagLst"
        density="compact"
        clearable
        class="mb-2"
        hide-details
        label="Phân loại"
      />
      <VSelect
        v-model="product.ProductType"
        label="Trạng thái"
        :items="productTypeLst"
        class="mb-2"
        hide-details
      />
      <VSelect
        v-model="product.Unit"
        label="Đơn vị"
        :items="unitLst"
        class="mb-2"
        hide-details
      />
      <v-textarea
        label="Mô tả ngắn"
        variant="outlined"
        v-model="product.Description"
        class="mb-2"
        hide-details
      ></v-textarea>

      <p class="create-post__title">Ảnh bài viết</p>
      <drag-and-drop-image
        :fileImg="this.linkImg"
        @onChange="onImageChange"
      ></drag-and-drop-image>

      <div class="divider col"></div>
      <div>Mô tả chi tiết</div>

      <div
        class="content-section"
        v-for="(content, index) in product.contents"
        :key="index"
      >
        <div class="content-section__delete">
          <div
            class="content-section__delete-button"
            @click="deleteContent(content, index)"
          >
            Xoá
          </div>
        </div>
        <v-text-field
          :label="'Tiêu đề ' + (index + 1)"
          variant="outlined"
          v-model="content.title"
          density="compact"
          class="mb-2"
        ></v-text-field>
        <editor
          api-key="6w0abawgyowzfiuqw8k55c3k1nnkmg6evr9u8219zn2kf9ob"
          v-model="content.desc"
          :init="editorConfig"
          style="z-index: 1000000"
        >
        </editor>
        <div class="content-section__title">Nội dung {{ index + 1 }}</div>
      </div>

      <v-btn variant="tonal" color="green" size="small" @click="addNewContent"
        >Thêm nội dung</v-btn
      >
      <div class="divider col"></div>

      <v-btn @click="updatePost" size="small">Lưu bài viết</v-btn>
    </el-form>

    <div class="product" ref="content">
      <h2 class="header">Xem trước</h2>
      <div style="background: #fff" v-if="product.LinkImage">
        <img :src="product.LinkImage" alt="" height="250" />
      </div>
      <h1 class="post__title">{{ product.ProductName }}</h1>
      <h1 class="post__tag" v-if="product.Tag">{{ product.Tag }}</h1>
      <div class="post__subtitle">{{ product.Description }}</div>
      <div class="product-content">
        <div v-for="(content, index) in product.contents" :key="index">
          <h2
            class="product-content__title"
            :ref="`Title${index}`"
            :id="`Title${index}`"
          >
            {{ content.title }}
          </h2>
          <div v-html="content.desc"></div>
        </div>
      </div>
    </div>
  </div>
  <notifications />
</template>

<script>
import DragAndDropImage from "@/components/DragAndDropImage.vue";
import Editor from "@tinymce/tinymce-vue";
import { getUserName, getToken, getStoreCode } from "@/utils/auth";
import { UpdateProductInfo, GetProductInfo } from "@/api/productAPI";
import { uploadImage } from "@/api/uploadFile";

export default {
  components: { DragAndDropImage, Editor },
  setup() {
    const username = getUserName();
    const token = getToken();
    const storeCode = getStoreCode();

    const editorConfig = {
      plugins:
        "fullscreen preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars image link table pagebreak nonbreaking insertdatetime advlist lists wordcount charmap emoticons",
      toolbar:
        "fullscreen | undo redo | styleselect |  bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | emoticons image media  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap  | fullscreen  preview save print | insertfile template link anchor codesample | ltr rtl",
      images_upload_url:
        "https://medisungroup.vn/api/File/UploadImageDes?UserName=" +
        username +
        "&Token=" +
        token,
      paste_block_drop: true,
      branding: false,
    };
    return { editorConfig, username, token, storeCode };
  },
  data() {
    return {
      fileHandle: null,
      tagLst: [
        "Máy siêu âm",
        "XQ+CT+MRI",
        "Nội soi tai mũi họng",
        "Nội soi tiêu hóa",
        "Xét nghiệm sinh hóa",
        "Xét nghiệm huyết học",
        "Xét nghiệm nước tiểu",
        "Xét nghiệm miễn dịch",
        "Điện giải",
        "Điện tim",
        "Điện não đồ",
      ],
      product: {
        contents: [
          {
            title: "",
            desc: "",
          },
          {
            title: "",
            desc: "",
          },
        ],
      },
    };
  },
  methods: {
    addNewContent() {
      this.product.contents.push({
        title: "",
        desc: "",
      });
    },
    validateTitle(value) {
      if (value) {
        return true;
      }
      return "Không được để trống";
    },

    deleteContent(content, index) {
      this.product.contents.splice(index, 1);
    },

    updatePost() {
      UpdateProductInfo({
        Data: {
          ...this.product,
          StoreCode: getStoreCode(),
          Detail: JSON.stringify(this.product.contents),
          UnitLst: [],
          ImgLst: [],
          Barcode: "",
        },
      }).then((res) => {
        if (res.RespCode == 0) {
          uploadImage(res.ProductID, this.fileHandle);

          notify({
            type: "success",
            title: "Thành công",
            text: "Cập nhật bài viết thành công",
          });
          this.product = {};
        } else {
          notify({
            type: "error",
            title: "Lỗi",
            text: res.RespText,
          });
        }
      });
    },

    onImageChange(file) {
      console.log("ảnh thay đổi");
      this.fileHandle = file;
      this.linkImg = file;
    },
    isJSON(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    },
    getProductInfo() {
      GetProductInfo({
        ProductID: this.$route.params.productID,
      }).then((res) => {
        console.log("res: ", res);
        if (res.RespCode == 0) {
          this.product = res.Data;
          if (this.isJSON(res.Data.Detail)) {
            this.product.contents = JSON.parse(res.Data.Detail);
          } else {
            this.product.contents = [
              {
                title: "",
                desc: res.Data.Detail,
              },
              {
                title: "",
                desc: "",
              },
            ];
          }

          this.linkImg = this.product.ImgLst[0].LinkImage;
        }
      });
    },
  },
  created() {
    this.getProductInfo();
  },
};
</script>

<style lang="scss" scoped>
.container-product {
  display: grid;
  grid-template-columns: 50% 50%;
}
.header {
  color: orange;
}

.create-product {
  padding: 1rem;
  background-color: #fff;
}

.create-post__title {
  font-size: 0.875rem;
  width: fit-content;
  margin-bottom: -8px;
}

.divider {
  border: none;
  border-top: 1px dashed rgb(1, 105, 173);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

//
.content-section {
  border: 1px dashed lightgrey;
  border-radius: 0.75rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: white;
  position: relative;
  padding-top: 40px;
}

.content-section__delete {
  position: absolute;
  right: 0;
  top: 0;
}

.content-section__delete-button {
  color: red;
  background-color: rgba($color: red, $alpha: 0.1);
  padding: 0.25rem 1rem;
  cursor: pointer;
  font-size: 12px;
  border-top-right-radius: 0.7rem;
  border-bottom-left-radius: 0.7rem;
}

.content-section__delete-button:hover {
  background-color: rgba($color: red, $alpha: 0.2);
}

.content-section__title {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.25rem 1rem;
  background-color: rgba($color: green, $alpha: 0.2);
  color: green;
  border-top-left-radius: 0.7rem;
  border-bottom-right-radius: 0.7rem;
  font-size: 12px;
}

.custom-input input {
  border-radius: 0.5rem;
}

//
.product-preview {
  background-color: white;
}

.product {
  background: white;
  width: 100%;
  padding: 0 1rem;
}

:deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2rem;
  color: #222222;
  color: #00573e;
  padding-bottom: 0.5rem;
  padding-top: 0.75rem;
}

:deep(h3) {
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 2rem;
  color: #222222;
  padding-bottom: 0.5rem;
}

:deep(p) {
  font-size: 1rem;
  line-height: 1.625rem;
  color: #334155;
  padding-bottom: 0.5rem;
}

:deep(li) {
  font-size: 1rem;
  line-height: 1.625rem;
  color: #334155;
  padding-bottom: 0.5rem;
}
.post__title {
  font-size: 1.75rem;
  color: #00573e;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.post__title {
  font-size: 1.25rem;
  color: #26a9e1;
  font-weight: bold;
  margin-bottom: 8px;
}
.post__subtitle {
  white-space: pre-wrap;
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.7;
  font-family: Roboto, sans-serif;
  padding-left: 16px;
}
.post__tag {
  border: 1px solid #26a9e1;
  padding: 4px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  background: #26a9e1;
  color: #fff;
  margin-bottom: 8px;
}
.product-content__title {
  margin-top: 0rem;
  padding-top: 0rem;
  font-size: 1.1rem;
}
</style>
<style lang="scss">
// .tox-tinymce-aux {
//   z-index: 1000000 !important;
// }
</style>
