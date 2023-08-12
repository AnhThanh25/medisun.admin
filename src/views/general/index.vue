<template>
  <v-card>
    <v-card-title class="text-h6 py-4"
      >Danh sách phiếu khám tổng quát</v-card-title
    >

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
            >Tạo phiếu</v-btn
          >
        </div>
      </template></v-data-table
    >
  </v-card>
  <v-dialog v-model="isShowCreateCustomer" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Tạo phiếu khám tổng quát</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              type="date"
              label="Ngày tạo phiếu"
              required
            ></v-text-field>
            <v-select
              :items="['Anh Thành', 'Khách lẻ']"
              label="Khách hàng"
            ></v-select>
            <v-select
              :items="['Nguyễn Văn A']"
              label="Nhân viên phụ trách"
            ></v-select>
            <v-text-field label="Lý do khám" required></v-text-field>
            <v-text-field label="Ghi chú" required></v-text-field>
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
        <v-row style="margin-top: -20px">
          <small style="line-height: 40px; font-size: 16px; padding-right: 70px"
            >Sơ đồ hàm răng:</small
          >
          <span>
            <v-radio-group inline v-model="typeTeeth">
              <v-radio
                label="Hàm người lớn"
                :value="1"
                color="secondary"
              ></v-radio>
              <v-radio
                label="Hàm trẻ em"
                :value="2"
                color="secondary"
              ></v-radio>
            </v-radio-group>
          </span>
        </v-row>
        <v-row>
          <TeethAdults v-if="typeTeeth == 1" />
          <TeethKids v-if="typeTeeth == 2" />
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
import TeethAdults from "./components/teeth-adults.vue";
import TeethKids from "./components/teeth-kids.vue";

export default {
  components: {
    TeethAdults,
    TeethKids,
  },
  data() {
    return {
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
