<template>
  <v-row>
    <v-col lg="8">
      <v-card>
        <v-card-title>
          <div style="display: flex; justify-content: space-between">
            <h6 class="text-h6 px-3 py-2">Cập nhật phiếu khám</h6>
            <v-btn>Chọn PKTQ</v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Khách hàng"
                v-model="medicalInfo.Title"
              ></v-text-field>
              <v-select
                v-model="medicalInfo.EmployCare"
                :items="employLst"
                label="Nhân viên phụ trách"
                item-title="Title"
                item-value="UserName"
              ></v-select>
              <VDatePicker2
                locale="vi"
                v-model="medicalInfo.TimeCreate"
                mode="date"
                :masks="masks"
              >
                <template #default="{ inputValue, inputEvents }">
                  <v-text-field
                    v-model="medicalInfo.TimeCreate"
                    :value="inputValue"
                    v-on="inputEvents"
                    label="Ngày khám"
                    append-inner-icon="mdi-calendar"
                  />
                </template>
              </VDatePicker2>
              <VDatePicker2
                locale="vi"
                v-model="medicalInfo.DateReturn"
                mode="date"
                :masks="masks"
              >
                <template #default="{ inputValue, inputEvents }">
                  <v-text-field
                    v-model="medicalInfo.DateReturn"
                    :value="inputValue"
                    v-on="inputEvents"
                    label="Tái khám"
                    append-inner-icon="mdi-calendar"
                  />
                </template>
              </VDatePicker2>
              <v-text-field
                label="Ghi chú"
                v-model="medicalInfo.Note"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <strong>Tiền sử bệnh toàn thân</strong>
              <v-row class="checkBox">
                <v-checkbox
                  v-model="item.CheckBox"
                  :label="item.Text"
                  v-for="item in pathAll"
                  :key="item.Text"
                ></v-checkbox>
              </v-row>
              <strong>Tiền sử bệnh răng miệng</strong>
              <v-row class="checkBox">
                <v-checkbox
                  v-model="item.CheckBox"
                  :label="item.Text"
                  v-for="item in pathTeeth"
                  :key="item.Text"
                ></v-checkbox>
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
              <v-btn value="1"> Dịch vụ </v-btn>
              <v-btn value="2"> Thuốc </v-btn>
            </v-btn-toggle>
            <span>
              <v-text-field
                v-model="search"
                label="Tìm kiếm dịch vụ/thuốc"
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
              v-for="item in serviceLst"
              :key="item"
              style="padding: 4px !important"
            >
              <v-card class="item" prepend-icon="mdi-tooth">
                <template v-slot:title>
                  <span style="font-size: 14px">{{ item.ServiceName }}</span>
                </template>
                <template v-slot:subtitle>
                  {{ new Intl.NumberFormat().format(item.Price) }}đ
                </template>
              </v-card>
            </v-col>
          </v-row>

          <v-data-table
            no-data-text="Không có dữ liệu"
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
            no-data-text="Không có dữ liệu"
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
      <v-card style="margin-left: -12px; width: calc(100% + 12px)">
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
      <v-row class="mt-3">
        <v-btn color="success" class="mr-2">In phiếu khám</v-btn>
        <v-btn color="success" class="mr-2">In đơn thuốc</v-btn>
        <v-btn>Lưu phiếu</v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { pathAll, pathTeeth } from "../../customer/variable";
import { GetMedicalByID } from "@/api/medical";
import { items } from "../variables";
import { GetEmployLst } from "@/api/user";
import { getRoleText } from "@/utils/role";
import { GetServiceLst } from "@/api/service";
export default {
  data() {
    return {
      pathAll: pathAll,
      pathTeeth: pathTeeth,
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
      medicalInfo: {},
      medicalID: "",
      masks: {
        input: "DD-MM-YYYY",
      },
      employLst: [],
      serviceLst: [],
    };
  },
  methods: {
    getServiceLst() {
      GetServiceLst({
        PageNumber: 1,
        RowspPage: 1000,
        Search: "",
      }).then((res) => {
        if (res) {
          this.serviceLst = res.Data;
        }
      });
    },
    getMedicalByID() {
      GetMedicalByID({
        MedicalID: this.medicalID,
      }).then((res) => {
        if (res) {
          this.medicalInfo = {
            ...res.Data,
            Title: res.Data.PatientName + " - " + res.Data.Phone,
          };
          if (this.medicalInfo.PathlogicalLst) {
            var dataPathAll = this.medicalInfo.PathlogicalLst.filter(
              (p) => p.Type == "Tiền sử bệnh toàn thân"
            );
            this.pathAll = [...pathAll];
            console.log(pathAll);
            for (var i = 0; i < dataPathAll.length; i++) {
              var item = dataPathAll[i];
              this.pathAll.find(
                (p) => p.Text == item.Pathological
              ).CheckBox = true;
            }
            var dataPathTeeth = this.medicalInfo.PathlogicalLst.filter(
              (p) => p.Type == "Tiền sử bệnh răng miệng"
            );
            this.pathTeeth = [...pathTeeth];
            for (var i = 0; i < dataPathTeeth.length; i++) {
              var item = dataPathTeeth[i];
              this.pathTeeth.find(
                (p) => p.Text == item.Pathological
              ).CheckBox = true;
            }
          }
        }
      });
    },
    getEmployLst() {
      GetEmployLst({
        PageNumber: 1,
        RowspPage: 10000,
        Search: "",
      }).then((res) => {
        if (res) {
          this.employLst = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              Title: item.FullName + " - " + getRoleText(item.Role),
            };
          });
        }
      });
    },
  },
  created() {
    this.medicalID = this.$route.params.id;
    this.getMedicalByID();
    this.getEmployLst();
    this.getServiceLst();
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
