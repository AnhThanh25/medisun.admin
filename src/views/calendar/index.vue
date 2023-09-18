<template>
  <v-card>
    <v-card-title class="text-h6 py-4">Danh sách lịch hẹn</v-card-title>

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

          <v-btn
            color="secondary"
            size="large"
            @click="isShowCreateCustomer = true"
            >Tạo lịch hẹn</v-btn
          >
        </div>
      </template></v-data-table
    >
  </v-card>
  <v-dialog v-model="isShowCreateCustomer" persistent width="678">
    <v-card>
      <v-card-title>
        <span class="text-h5 text-center">Tạo lịch hẹn</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field label="Tên khách hàng" required></v-text-field>
            <v-select
              :items="['Anh Thành', 'Bác sĩ A']"
              label="Bác sĩ"
            ></v-select>
            <v-select
              :items="['Lịch hẹn', 'Tái khám']"
              label="Loại lịch"
            ></v-select>
            <v-text-field type="date" label="Ngày hẹn / tái khám" required></v-text-field>
            <v-row>
              <v-col cols="6">
                Từ
                <VDatePicker2
                  v-model="date"
                  mode="time"
                  rules="auto"
                  is24hr
                  hide-time-header
                />
              </v-col>
              <v-col cols="6">
                Đến
                <VDatePicker2
                  v-model="date"
                  mode="time"
                  rules="auto"
                  is24hr
                  hide-time-header
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field label="Số điện thoại" required></v-text-field>

            <v-select
              :items="['Nguyễn Văn A']"
              label="Nhân viên phụ trách"
            ></v-select>
            <v-select :items="['Niềng răng']" label="Thủ thuật"></v-select>

            <v-text-field label="Ghi chú" required></v-text-field>
            <v-select :items="['Mới tạo']" label="Trạng thái"></v-select>
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
        { title: "Thời gian", key: "calories" },
        { title: "Bác sĩ", key: "name" },
        { title: "Khách hàng", key: "carbs" },
        { title: "Số điện thoại", key: "protein" },
        { title: "Thủ thuật", key: "fat" },
        { title: "Trạng thái", key: "" },
        { title: "Ghi chú", key: "" },
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
      teethHeaders: [
        {
          title: "STT",
          align: "start",
          sortable: false,
          key: "Key",
        },
        { title: "Loại", key: "calories" },
        { title: "Răng", key: "name" },
        { title: "Bệnh lý", key: "carbs" },
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
<style>
.vc-time-picker {
  padding: 0;
  border: none;
}
.vc-time-select-group {
  padding: 5px 8px;
  border-color: rgba(0, 0, 0, 0.3);
  background: #fff;
}
.vc-bordered {
  border: none;
  /* border: 2px solid; */
}
</style>
