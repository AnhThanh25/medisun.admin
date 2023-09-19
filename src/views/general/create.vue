<template>
  <v-card>
    <v-card-title>
      <span class="text-h6 font-weight-semibold">Tạo phiếu khám tổng quát</span>
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
            <v-radio label="Hàm trẻ em" :value="2" color="secondary"></v-radio>
          </v-radio-group>
        </span>
      </v-row>
      <v-row>
        <TeethAdults v-if="typeTeeth == 1" />
        <TeethKids v-if="typeTeeth == 2" />
      </v-row>
      <v-data-table  no-data-text="Không có dữ liệu"
        :headers="teethHeaders"
        :items="teethDesserts"
        :search="search"
        sort-asc-icon="mdi-menu-up"
        sort-desc-icon="mdi-menu-down"
        :hide-default-footer="true"
        :disable-pagination="true"
        :items-per-page="-1"
        class="table-pres"
        style="margin-top: 12px"
      >
      </v-data-table>
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
};
</script>

<style></style>
