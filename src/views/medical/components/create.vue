<template>
  <v-row>
    <v-col lg="8">
      <v-card>
        <v-card-title>
          <div style="display: flex; justify-content: space-between">
            <span class="text-h6">Tạo phiếu khám</span>
            <v-btn>Chọn PKTQ</v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="['Anh Thành', 'Khách lẻ']"
                label="Khách hàng"
              ></v-select>
              <v-text-field label="Số điện thoại" required></v-text-field>

              <v-select
                :items="['Nguyễn Văn A']"
                label="Nhân viên phụ trách"
              ></v-select>
              <v-text-field
                type="date"
                label="Ngày khám"
                required
              ></v-text-field>
              <v-text-field
                type="date"
                label="Tái khám"
                required
              ></v-text-field>
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
          <v-row style="padding: 0 12px">
            <v-btn-toggle
              v-model="tab"
              rounded="0"
              color="secondary"
              group
              style="margin-right: 8px"
              density="compact"
            >
              <v-btn value="1"> Thủ thuật </v-btn>
              <v-btn value="2"> Thuốc </v-btn>
            </v-btn-toggle>
            <span>
              <v-text-field
                v-model="search"
                label="Tìm kiếm thủ thuật/thuốc"
                class=""
                variant="outlined"
                hide-details
                density="compact"
                style="width: 312px !important"
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </span>
          </v-row>

          <v-row style="padding: 16px 8px">
            <v-col
              cols="6"
              lg="3"
              md="4"
              sm="6"
              v-for="item in 8"
              :key="item"
              style="padding: 4px !important"
            >
              <v-card class="item" prepend-icon="mdi-tooth">
                <template v-slot:title>
                  <span style="font-size: 16px">Niềng răng</span>
                </template>
                <template v-slot:subtitle> 10.000.000đ </template>
              </v-card>
            </v-col>
          </v-row>

          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            sort-asc-icon="mdi-menu-up"
            sort-desc-icon="mdi-menu-down"
            :hide-default-footer="true"
            :disable-pagination="true"
            :items-per-page="-1"
            class="table-pres"
          >
          </v-data-table>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            sort-asc-icon="mdi-menu-up"
            sort-desc-icon="mdi-menu-down"
            :hide-default-footer="true"
            :disable-pagination="true"
            :items-per-page="-1"
            class="table-pres"
            style="margin-top: 16px"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="4">
      <v-card>
        <v-card-title>
          <span class="text-h6">Hóa đơn</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <p class="text-left">Tổng</p>
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold">10.000.000đ</p>
            </v-col>

            <v-col cols="6">
              <p class="text-left">Giảm giá</p>
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold">0đ</p>
            </v-col>

            <v-col cols="6">
              <p class="text-left">Thuế</p>
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold">5%</p>
            </v-col>

            <v-col cols="6">
              <p class="text-left">Khách cần thanh toán</p>
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold">10.510.500đ</p>
            </v-col>

            <v-col cols="6">
              <v-btn
                class="text-left"
                color="secondary"
                style="margin-top: -8px"
                >Thanh toán</v-btn
              >
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold text-success">5.000.000đ</p>
            </v-col>

            <v-col cols="6">
              <p class="text-left">Hình thức thanh toán</p>
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold">Tiền mặt</p>
            </v-col>

            <v-col cols="6">
              <p class="text-left">Tính vào công nợ</p>
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold text-error">5.510.500đ</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <div
        style="display: flex; justify-content: space-between; margin-top: 8px"
      >
        <v-btn color="success">In phiếu khám</v-btn>
        <v-btn color="success">In đơn thuốc</v-btn>
        <v-btn>Lưu phiếu</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { items } from "../variables";
export default {
  data() {
    return {
      tab: "1",
      items: items,
      headers: [
        {
          title: "STT",
          align: "start",
          sortable: false,
          key: "Key",
        },
        { title: "Thủ thuật", key: "calories" },
        { title: "Thực hiện", key: "name" },
        { title: "Số lượng", key: "carbs" },
        { title: "Đơn giá", key: "protein" },
        { title: "Giảm giá", key: "fat" },
        { title: "Tổng", key: "fat" },
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
      ],
      search: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 0 !important;
  border-radius: 4px;
  background: #f7f7f7;
  &:hover {
    background: #03c9d718;
    color: #00b7c4;
    cursor: pointer;
  }
}
</style>
<style>
.item .v-card-item__prepend {
  width: 40px;
  margin-left: -8px;
}
</style>
