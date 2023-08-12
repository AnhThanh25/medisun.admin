<template>
  <v-card>
    <v-card-title class="text-h6 py-4"> Khách hàng </v-card-title>

    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
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
            @click="isShowCreateCustomer = true"
            >Thêm KH</v-btn
          >
        </div>
      </template></v-data-table
    >
  </v-card>
  <v-dialog v-model="isShowCreateCustomer" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Thêm khách hàng</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field label="Tên khách hàng" required></v-text-field>
            <v-text-field label="Số điện thoại"></v-text-field>
            <v-select
              :items="['Nam', 'Nữ', 'Không xác định']"
              label="Giới tính"
            ></v-select>
            <v-text-field type="date" label="Ngày sinh" required></v-text-field>
            <v-text-field label="Địa chỉ" required></v-text-field>
            <v-text-field label="Nghề nghiệp" required></v-text-field>
            <v-text-field label="Nhân viên phụ trách" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <strong>Tiền sử bệnh toàn thân</strong>
            <v-row class="checkBox">
              <v-checkbox label="Gan"></v-checkbox>
              <v-checkbox label="Tiểu đường"></v-checkbox>
              <v-checkbox label="Thấp khớp"></v-checkbox>
              <v-checkbox label="Thần kinh"></v-checkbox>
              <v-checkbox label="Dị ứng"></v-checkbox>
              <v-checkbox label="Tiêu hóa"></v-checkbox>
              <v-checkbox label="Hô hấp"></v-checkbox>
              <v-checkbox label="Tim mạch"></v-checkbox>
              <v-checkbox label="Thận"></v-checkbox>
              <v-checkbox label="Khác"></v-checkbox>
            </v-row>
            <strong>Tiền sử bệnh răng miệng</strong>
            <v-row class="checkBox">
              <v-checkbox label="Đã từng nhổ răng"></v-checkbox>
              <v-checkbox label="Khớp thái dương hàm"></v-checkbox>
              <v-checkbox label="Đã từng chỉnh nha"></v-checkbox>
              <v-checkbox label="Đã từng đeo hàm"></v-checkbox>
              <v-checkbox label="Khác"></v-checkbox>
            </v-row>
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
        { title: "Mã khách hàng", key: "calories" },
        { title: "Tên khách hàng", key: "name" },
        { title: "Số điện thoại", key: "carbs" },
        { title: "Địa chỉ", key: "protein" },
        { title: "NV phụ trách", key: "fat" },
        { title: "Công nợ", key: "iron" },
        { title: "Action", key: "" },
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

<style></style>
