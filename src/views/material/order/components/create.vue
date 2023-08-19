<template>
  <v-row>
    <v-col lg="8">
      <v-card>
        <v-card-title>
          <div style="display: flex; justify-content: space-between">
            <span class="text-h6">Phiếu đặt vật liệu Labo</span>
            <!-- <v-btn>Chọn PKTQ</v-btn> -->
          </div>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="['Anh Thành', 'Khách lẻ']"
                label="Khách hàng"
              ></v-select>
              <v-text-field
                type="date"
                label="Ngày đặt"
                required
              ></v-text-field>
              <v-text-field
                type="date"
                label="Hạn bảo hành"
                required
              ></v-text-field>

              <v-row>
                <v-col cols="8">
                  <v-select
                    :items="['Xưởng hà nội']"
                    label="Xưởng sản xuất"
                  ></v-select>
                  </v-col
                >
                <v-col cols="4"><v-btn size="large">Thêm xưởng</v-btn></v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select :items="['Nguyễn Văn A']" label="Nhân viên"></v-select>
              <v-text-field
                type="date"
                label="Ngày nhận"
                required
              ></v-text-field>
              <v-select :items="['Đã nhận']" label="Trạng thái"></v-select>
              <v-row>
                <v-col cols="8">
                  <v-select :items="['Đã nhận']" label="Vật liệu"></v-select
                ></v-col>
                <v-col cols="4"
                  ><v-btn size="large">Thêm vật liệu</v-btn></v-col
                >
              </v-row>
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
            <template v-slot:item.calories="{ item }">
              <v-text-field
                v-model="item.calories"
                variant="underlined"
                class="input-custom"
                 label="Last name"
              ></v-text-field>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="4">
      <v-card>
        <v-card-title>
          <span class="text-h6">Hóa đơn phiếu đặt</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <p class="text-left">Tổng tiền</p>
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
              <p class="text-left">Phải trả xưởng</p>
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold">3.000.000đ</p>
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
            <!-- <v-col cols="6">
              <p class="text-left">Khách cần thanh toán</p>
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold">10.510.500đ</p>
            </v-col> -->

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
.input-custom {
  margin-bottom: -10px;
}
</style>
<style>
.item .v-card-item__prepend {
  width: 40px;
  margin-left: -8px;
}
.input-custom .v-field__outline {
  --v-field-border-opacity: 0;
}
</style>
