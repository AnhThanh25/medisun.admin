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
            <span style="width: calc(50% - 12px)">
              <v-text-field
                v-model="search"
                label="Tìm kiếm dịch vụ/thuốc"
                class=""
                variant="outlined"
                hide-details
                density="compact"
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </span>
            <v-btn-toggle
              v-model="typeTab"
              color="primary"
              group
              style="padding-left: 24px"
              density="compact"
            >
              <v-btn :value="true"> Dịch vụ </v-btn>
              <v-btn :value="false"> Thuốc </v-btn>
            </v-btn-toggle>
          </v-row>
          <v-row v-if="serviceLst.Odd">
            <swiper
              v-if="serviceLst.Odd.length > 0"
              class="mySwiper swiper-pk"
              :modules="modules"
              :slides-per-view="4"
              :space-between="8"
              @swiper="onSwiper"
              @slideChange="onSlideChange"
              :pagination="{ clickable: true }"
            >
              <swiper-slide v-for="(item, index) in serviceLst.Odd" :key="index"
                ><v-card
                  class="item-service"
                  @click="btShowService(serviceLst.Odd[index])"
                >
                  <template v-slot:title>
                    <span style="font-size: 14px">{{
                      serviceLst.Odd[index].ServiceName
                    }}</span>
                  </template>
                  <template v-slot:subtitle>
                    {{
                      new Intl.NumberFormat().format(
                        serviceLst.Odd[index].Price
                      )
                    }}đ
                  </template>
                </v-card>
                <v-card
                  class="item-service"
                  v-if="serviceLst.Even[index]"
                  @click="btShowService(serviceLst.Even[index])"
                >
                  <template v-slot:title>
                    <span style="font-size: 14px">{{
                      serviceLst.Even[index].ServiceName
                    }}</span>
                  </template>
                  <template v-slot:subtitle>
                    {{
                      new Intl.NumberFormat().format(
                        serviceLst.Even[index].Price
                      )
                    }}đ
                  </template>
                </v-card>
              </swiper-slide>
            </swiper>
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
  <v-dialog v-model="isShowAddService" persistent width="500">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Thêm sản phẩm</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="serviceInfo.ServiceName"
                  label="Tên sản phẩm"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Giá"
                  hide-details
                  v-model="priceFormatted"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Đơn vị bán"
                  v-model="serviceInfo.Unit"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Số lượng"
                  v-model="serviceInfo.Quantity"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Giảm giá"
                  v-model="serviceInfo.Discount"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Mô tả"
                  v-model="serviceInfo.Description"
                  hide-details
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowAddService = false"
        >
          Đóng
        </v-btn>
        <v-btn> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { pathAll, pathTeeth } from "../../customer/variable";
import { GetMedicalByID } from "@/api/medical";
import { items } from "../variables";
import { GetEmployLst } from "@/api/user";
import { getRoleText } from "@/utils/role";
import { GetServiceLst } from "@/api/service";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      pathAll: pathAll,
      pathTeeth: pathTeeth,
      typeTab: true,
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
      serviceLst: {},
      modules: [Pagination],
      isShowAddService: false,
      serviceInfo: {},
    };
  },
  methods: {
    btShowService(data) {
      console.log(data);
      this.isShowAddService = true;
      this.serviceInfo = data;
    },
    getServiceLst() {
      GetServiceLst({
        PageNumber: 1,
        RowspPage: 1000,
        Search: "",
      }).then((res) => {
        if (res) {
          var data = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
            };
          });
          console.log("124");
          this.serviceLst.Even = data.filter((p) => p.Key % 2 == 0);
          this.serviceLst.Odd = data.filter((p) => p.Key % 2 != 0);
          console.log(this.serviceLst);
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

<style lang="scss">
.table-pres {
  margin-top: 20px;
}
.swiper-pk {
  margin-top: 10px;
  width: calc(100% - 20px);
  .swiper-pagination {
    margin-bottom: -10px;
  }
  .item-service {
    margin-bottom: 0 !important;
    border-radius: 4px;
    background: #f7f7f7;
    height: calc(50% - 10px);
    margin-top: 8px;
    .v-card-item {
      .v-card-title {
        line-height: 16px;
        white-space: normal;
      }
    }
    .v-card-subtitle {
      color: rgb(var(--v-theme-primary));
      opacity: 1;
    }
    &:hover {
      background: #03c9d718;
      color: #00b7c4;
      cursor: pointer;
    }
  }
}
</style>
