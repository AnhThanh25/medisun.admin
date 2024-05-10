<template>
  <div class="container-post">
    <el-form class="create-post" ref="postRef" :model="post">
      <h2 style="margin-top: -12px; margin-bottom:8px">Cập nhật bài viết</h2>
      <v-text-field
        label="Tiêu đề"
        variant="outlined"
        v-model="post.Title"
        density="compact"
        class="mb-2"
      ></v-text-field>
      <!-- <v-text-field
        label="Loại bài viết"
        variant="outlined"
        v-model="post.Type"
        density="compact"
        class="mb-2"
      ></v-text-field> -->
      <VSelect
        v-model="post.Type"
        :items="typeNewLst"
        density="compact"
        clearable
        class="mb-2"
        label="Loại bài viết"
      />
      <v-textarea
        label="Mô tả ngắn"
        variant="outlined"
        v-model="post.SubTitle"
        class="mb-2"
      ></v-textarea>

      <p class="create-post__title">Ảnh bài viết</p>
      <drag-and-drop-image
        :fileImg="this.linkImg"
        @onChange="onImageChange"
      ></drag-and-drop-image>

      <div class="divider col"></div>
      <div>Nội dung bài viết</div>

      <div
        class="content-section"
        v-for="(content, index) in post.contents"
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
      <v-btn @click="delPost" size="small" class="ml-2" color="error"
        >Xóa</v-btn
      >
    </el-form>

    <div class="post" ref="content">
      <h2 class="header">Xem trước</h2>
      <h1 class="post__title">{{ post.Title }}</h1>
      <span class="post__type">{{ post.Type }}</span>
      <p class="post__subtitle">{{ post.SubTitle }}</p>
      <div style="background: #fff" v-if="post.LinkImage">
        <img :src="post.LinkImage" alt="" height="250" />
      </div>

      <div class="post-content">
        <div v-for="(content, index) in post.contents" :key="index">
          <h2
            class="post-content__title"
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
import axios from "axios";

import DragAndDropImage from "@/components/DragAndDropImage.vue";

import { GetPostByID, UpdatePost } from "@/api/postApi";
import Editor from "@tinymce/tinymce-vue";
import { getUserName, getToken, getStoreCode } from "@/utils/auth";

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
        "http://202.191.56.71/MediAPI/File/UploadImageDes?UserName=" +
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
      elInputSize: "large",
      deleteDialog: false,
      fileHandle: null,
      post: {
        Title: "",
        SubTitle: "",
        Type: "",
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
      selectedContent: null,
      selectedIndex: null,
      typeNewLst: ["Giới thiệu sản phẩm"],
    };
  },
  methods: {
    addNewContent() {
      this.post.contents.push({
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
      this.post.contents.splice(index, 1);
    },
    generatePostInfo() {
      const desc = this.post.contents;

      const postInfo = {
        ...this.post,
        Title: this.post.Title,
        SubTitle: this.post.SubTitle,
        Type: this.post.Type,
        Description: desc,
      };
      return postInfo;
    },
    updatePost() {
      const postInfo = this.generatePostInfo();
      postInfo.Description = JSON.stringify(postInfo.Description);
      UpdatePost({
        Data: postInfo,
      }).then((res) => {
        if (res.RespCode == 0) {
          this.postInfo = {};
          this.uploadImg(postInfo.PostID);
          notify({
            type: "success",
            title: "Thành công",
            text: "Cập nhật bài viết thành công",
          });
          window.location.reload();
        } else {
          notify({
            type: "error",
            title: "Lỗi",
            text: newValue.RespText,
          });
        }
      });
    },
    delPost() {
      const postInfo = this.generatePostInfo();
      postInfo.Description = JSON.stringify(postInfo.Description);
      UpdatePost({
        Data: {
          ...postInfo,
          Status: 0,
        },
      }).then((res) => {
        if (res.RespCode == 0) {
          this.postInfo = {};
          this.uploadImg(postInfo.PostID);
          notify({
            type: "success",
            title: "Thành công",
            text: "Cập nhật bài viết thành công",
          });
          this.$router.push("/bai-viet");
        } else {
          notify({
            type: "error",
            title: "Lỗi",
            text: newValue.RespText,
          });
        }
      });
    },
    onImageChange(file) {
      console.log("ảnh thay đổi");
      this.fileHandle = file;
      this.linkImg = file;
    },
    uploadImg(postID) {
      const formData = new FormData();
      formData.append("image", this.fileHandle);
      axios
        .post(
          `http://202.191.56.71/MediAPI/File/UploadImagePost?UserName=${this.username}&Token=${this.token}&StoreCode=${this.storeCode}&PostID=${postID}`,
          formData
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    },
    getPostByID() {
      GetPostByID({
        PostID: this.$route.params.tab,
      }).then((res) => {
        console.log("res: ", res);
        if (res.RespCode == 0) {
          this.post = res.Data;
          this.post.contents = JSON.parse(res.Data.Description);
          this.linkImg = this.post.LinkImage;
        }
      });
    },
  },
  created() {
    this.getPostByID();
  },
};
</script>

<style lang="scss" scoped>
.container-post {
  display: grid;
  grid-template-columns: 50% 50%;
}
.header {
  color: orange;
}

.create-post {
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
.post-preview {
  background-color: white;
}

.post {
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
.post__subtitle {
  color: #000;
  font-size: 1.25rem;
  margin-top: 1rem;
}
.post-content__title {
  margin-top: 0rem;
  padding-top: 0rem;
}
.post__type {
  background: #e6e6e6;
  border-radius: 50px;
  padding: 6px 10px;
  color: #00573e;
  margin-top: -8px;
  margin-bottom: 8px;
  font-size: 12px;
}
</style>
<style lang="scss">
// .tox-tinymce-aux {
//   z-index: 1000000 !important;
// }
</style>
