<template>
  <v-card>
    <v-card-title>
      <h6 class="text-h6 py-4">Danh sách phiếu khám tổng quát</h6>
    </v-card-title>
    <v-data-table  no-data-text="Không có dữ liệu"
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

          <v-btn
            color="secondary"
            size="large"
            @click="$router.push('/kham-benh/tao-phieu-tong-quat')"
            >Tạo phiếu</v-btn
          >
        </div>
      </template></v-data-table
    >
  </v-card>
</template>

<script>
export default {
  data() {
    return {
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
        { title: "Mã phiếu", key: "calories" },
        { title: "Ngày lập", key: "name" },
        { title: "Khách hàng", key: "carbs" },
        { title: "Nhân viên phụ trách", key: "protein" },
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
  methods: {},
};
</script>

<style lang="scss" scoped>
.container-image {
  .teeth-adust {
    height: 50px;
  }
}
</style>
