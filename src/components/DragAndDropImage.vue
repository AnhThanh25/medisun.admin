<template>
  <div v-if="file" class="image-preview">
    <img :src="newImage" alt="" />
    <button
      class="image-preview__close"
      icon="mdi-close"
      circle
      @click="handleRemoveImage"
    >
      x
    </button>
  </div>
  <div
    v-else
    class="drag"
    :class="{ 'drag--over': isDraggingOver }"
    @drop="handleDrop"
    @dragover.prevent="dragOverHandler"
    @dragenter="dragEnterHandler"
    @dragleave="dragLeaveHandler"
  >
    <h4 class="drag__title">Drag & Drop ảnh ở đây</h4>
    <p class="drag__subtitle">Ảnh có kích thước 1024px 796px, nhỏ hơn 500KB.</p>
    <p class="drag__subtitle">Hỗ trợ file: JPEG, JPG, PNG.</p>
    <p class="drag__or">Hoặc</p>
    <input
      type="file"
      id="pick-image"
      :accept="accept"
      @change="onSelectFile"
      class="d-none"
      :disabled="disabled"
    />
    <label for="pick-image">
      <div class="select-image" :class="{ 'select-image--disabled': disabled }">
        Chọn ảnh
      </div>
    </label>
  </div>
</template>

<script>
export default {
  emits: ["onChange", "filetest"],
  props: {
    accept: {
      type: String,
      default: "image/*",
    },
    id: {
      type: String,
      required: true,
    },
    imageCount: {
      type: Number,
      default: 0,
    },
    numberImageMax: {
      type: Number,
      default: 5,
    },
    fileImg: String,
  },
  data() {
    return {
      isDraggingOver: false,
      file: null,
      newImage: "",
    };
  },
  computed: {
    disabled() {
      return this.imageCount >= this.numberImageMax;
    },
  },
  watch: {
    fileImg() {
      if (this.fileImg === null) {
        this.file = null;
      } else {
        this.file = "img";
        this.newImage = this.fileImg;
      }
    },
  },
  methods: {
    onSelectFile(event) {
      let maxSize = 500 * 1024;
      let widthImage = 1024;
      let heightImage = 796;
      let files = event.target.files;
      let flag = false;
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        img.src = readerEvent.target.result;
        img.onload = () => {
          //   if (img.width != widthImage || img.height != heightImage) {
          //     flag = true
          //     const toast = useCustomToast()
          //     toast.showErrorToast('Hãy sử dụng ảnh có kích thước 1024px 796px')
          //   }
          if (flag == false) {
            if (files[0].size > maxSize) {
              notify({
                type: "warning",
                title: "Cảnh báo",
                text: "Ảnh quá lớn! Hãy giảm xuống dưới 500KB",
              });
            } else {
              if (files && files.length > 0) {
                this.handleFile(files[0]);
              }
            }
          }
        };
      };
      reader.readAsDataURL(files[0]);
    },
    dragOverHandler(event) {
      event.preventDefault();
    },
    dragEnterHandler() {
      this.isDraggingOver = true;
    },
    dragLeaveHandler() {
      this.isDraggingOver = false;
    },
    handleDrop(event) {
      this.isDraggingOver = false;
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    },
    handleFile(file) {
      this.file = file;
      this.previewFile(file);
      this.$emit("onChange", this.file);
    },
    handleRemoveImage() {
      this.file = null;
      this.$emit("onChange", this.file);
    },
    previewFile(file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        this.newImage = await reader.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/colors";

.drag {
  background-color: $ink100;
  border: 1px dashed $ink200;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.drag--over {
  background-color: $blue100;
}

.drag__title {
  margin-top: 1rem;
  font-size: 1.25rem;
  color: $ink500;
  margin-bottom: 0.25em;
}

.drag__subtitle {
  color: $ink400;
  font-size: 0.75rem;
}

.drag__or {
  color: $ink400;
  margin: 0;
}

.select-image {
  padding: 0.25rem 1.25rem;
  background-color: $primary-color;
  color: white;
  text-transform: none;
  font-size: 0.875rem;
  height: fit-content;
  width: fit-content;
  border-radius: 10rem;
  box-shadow: none;
  cursor: pointer;
}

.select-image--disabled {
  background-color: $ink200;
  color: $ink400;
}
.image-preview {
  position: relative;
}

.image-preview img {
  width: 100%;
  border-radius: 0.5rem;
  max-height: 16rem;
  // max-width: 16rem;
  border: 0.5px solid #ccc;
}

.image-preview__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #f3f5f7;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: red;
}
</style>
