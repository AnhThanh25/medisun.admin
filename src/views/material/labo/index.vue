<template>
  <v-card>
    <v-card-title class="text-h6 py-4">Danh sách vật liệu labo</v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
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
              class="mx-4"
              variant="outlined"
              hide-details
              density="compact"
              style="width: 250px !important"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </span>

          <v-btn color="secondary" size="large" @click="btCreateMedical"
            >Thêm vật liệu</v-btn
          >
        </div>
      </template></v-data-table
    >
  </v-card>
  <v-dialog v-model="isShowCreateCustomer" persistent width="678">
    <v-card>
      <v-card-title>
        <span class="text-h5 text-center">Thêm vật liệu mới</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field label="Tên vật liệu" required></v-text-field>
            <v-select :items="['Cái', 'Hộp']" label="Đơn vị"></v-select>
            <v-text-field label="Ghi chú" required></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field label="Giá nhập" required></v-text-field>
            <v-text-field label="Giá bán" required></v-text-field>
            <v-file-input
              label="Hình ảnh"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon=""
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowCreateCustomer = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="isShowCreateCustomer = false"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import TeethAdults from "./components/teeth-adults.vue";
// import TeethKids from "./components/teeth-kids.vue";

export default {
  components: {
    // TeethAdults,
    // TeethKids,
  },
  data() {
    return {
      date: new Date(),
      typeTeeth: 1,
      isShowCreateCustomer: false,
      search: "",
      sortBy: [{ key: "calories", order: "asc" }],
      headers: [
        {
          title: "STT",
          align: "start",
          sortable: false,
          key: "Key",
        },
        { title: "Mã vật liệu", key: "calories" },
        { title: "Tên vật liệu", key: "name" },
        { title: "Giá nhập", key: "carbs" },
        { title: "Giá bán", key: "carbs" },
        { title: "Hình ảnh", key: "protein" },
        { title: "Ghi chú", key: "fat" },
        { title: "Chức năng", key: "" },
      ],
      desserts: [
        {
          Key: 1,
          name: "Frozen Yogurt",
          calories: 200,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          Key: 1,

          name: "Ice cream sandwich",
          calories: 200,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          Key: 1,

          name: "Eclair",
          calories: 300,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          Key: 1,

          name: "Cupcake",
          calories: 300,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          Key: 1,

          name: "Gingerbread",
          calories: 400,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          Key: 1,

          name: "Jelly bean",
          calories: 400,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          Key: 1,

          name: "Lollipop",
          calories: 400,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
      ],
    };
  },
  methods: {
    btCreateMedical() {
      this.isShowCreateCustomer = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-image {
  .teeth-adust {
    height: 50px;
  }
}
</style>
