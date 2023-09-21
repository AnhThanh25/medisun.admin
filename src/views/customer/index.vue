<template>
  <v-card>
    <v-card-title class="text-h6 py-4"> Khách hàng </v-card-title>

    <v-data-table
      no-data-text="Không có dữ liệu"
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
              class="ml-4"
              variant="outlined"
              hide-details
              density="compact"
              style="width: 250px !important"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </span>
          <v-btn
            color="blue"
            variant="tonal"
            @click="btShowCreate"
            icon="mdi-account-plus"
            style="height: 42px"
          ></v-btn>
        </div>
      </template>
      <template v-slot:item.Action="{ item }">
        <v-icon
          color="primary"
          size="small"
          class="me-2"
          @click="btShowUpdate(item.raw)"
          >mdi-pencil
        </v-icon>
      </template>
      <template v-slot:item.DebtNow="{ item }">
        {{ new Intl.NumberFormat().format(item.raw.DebtNow) }}
      </template>
    </v-data-table>
  </v-card>
  <v-dialog v-model="isShowCreateCustomer" persistent width="1024">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">{{ patientInfo.Dialog }}</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="patientInfo.PatientName"
                  label="Tên khách hàng"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Số điện thoại"
                  v-model="patientInfo.Phone"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="patientInfo.Sex"
                  :items="['Nam', 'Nữ', 'Không xác định']"
                  hide-details
                  label="Giới tính"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <VDatePicker2
                  locale="vi"
                  v-model="patientInfo.Birthday"
                  mode="date"
                  :masks="masks"
                >
                  <template #default="{ inputValue, inputEvents }">
                    <v-text-field
                      v-model="patientInfo.Birthday"
                      :value="inputValue"
                      v-on="inputEvents"
                      label="Ngày sinh"
                      append-inner-icon="mdi-calendar"
                      hide-details
                    />
                  </template>
                </VDatePicker2>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="patientInfo.City"
                  label="Tỉnh/TP"
                  hide-details
                  :items="cityLst"
                  item-title="City"
                  item-value="City"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="patientInfo.District"
                  :items="districtLst"
                  item-title="District"
                  item-value="District"
                  label="Quận/Huyện"
                  hide-details
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="patientInfo.Commune"
                  :items="communeLst"
                  item-title="Commune"
                  item-value="Commune"
                  label="Phường/Xã"
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="patientInfo.Address"
                  label="Địa chỉ"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="patientInfo.Job"
                  label="Nghề nghiệp"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="patientInfo.EmployCare"
                  :items="employLst"
                  item-title="Title"
                  item-value="UserName"
                  label="Nhân viên phụ trách"
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
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
        <v-btn @click="addPatientLst"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <notifications />
</template>

<script>
import { GetPatientLst, AddPatientLst } from "@/api/patient";
import { formatDate } from "@/helpers/getTime";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict,
} from "@/api/default";
import { GetEmployLst } from "@/api/user";
import { getRoleText, roleLst } from "@/utils/role";
import { pathAll, pathTeeth } from "./variable";
export default {
  data() {
    return {
      pathAll: pathAll,
      pathTeeth: pathTeeth,
      patientInfo: {},

      isShowCreateCustomer: false,
      isShowUpdateCustomer: false,
      search: "",
      headers: [
        { title: "STT", sortable: false, key: "Key" },
        { title: "Mã KH", key: "PatientID" },
        { title: "Tên KH", key: "PatientName" },
        { title: "SĐT", key: "Phone" },
        { title: "Địa chỉ", key: "Address" },
        { title: "NV phụ trách", key: "EmployCare" },
        { title: "Công nợ", key: "DebtNow" },
        { title: "Action", key: "Action" },
      ],
      desserts: [],
      pageNumber: 1,
      rowspPage: 10,
      search: "",
      date: null,
      menu2: false,
      cityLst: [],
      districtLst: [],
      communeLst: [],
      employLst: [],
      masks: {
        input: "DD-MM-YYYY",
      },
    };
  },
  watch: {
    "patientInfo.City"() {
      this.getDistrictByCity();
    },
    "patientInfo.District"() {
      this.getCommuneByCityAndDistrict();
    },
  },
  methods: {
    btShowCreate() {
      this.isShowCreateCustomer = true;
      this.patientInfo = { Dialog: "Thêm khách hàng" };
    },
    btShowUpdate(data) {
      this.patientInfo = { ...data, Dialog: "Chỉnh sửa thông tin khác hàng" };
      if (this.patientInfo.PathlogicalLst) {
        var dataPathAll = this.patientInfo.PathlogicalLst.filter(
          (p) => p.Type == "Tiền sử bệnh toàn thân"
        );
        this.pathAll = [...pathAll];
        console.log(pathAll);
        for (var i = 0; i < dataPathAll.length; i++) {
          var item = dataPathAll[i];
          this.pathAll.find((p) => p.Text == item.Pathological).CheckBox = true;
        }
        var dataPathTeeth = this.patientInfo.PathlogicalLst.filter(
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

      this.isShowCreateCustomer = true;
    },
    getEmployLst() {
      GetEmployLst({
        PageNumber: 1,
        RowspPage: 1000,
        Search: "",
      }).then((res) => {
        if (res) {
          this.employLst = res.Data.map((item) => {
            return {
              ...item,
              Title: item.FullName + " - " + getRoleText(item.Role),
            };
          });
        }
      });
    },
    addPatientLst() {
      this.patientInfo.PathlogicalLst = [];
      for (var i = 0; i < this.pathAll.length; i++) {
        var item = this.pathAll[i];
        if (item.CheckBox) {
          var path = {
            Type: "Tiền sử bệnh toàn thân",
            Pathological: item.Text,
          };
          this.patientInfo.PathlogicalLst.push(path);
        }
      }
      for (var i = 0; i < this.pathTeeth.length; i++) {
        var item = this.pathTeeth[i];
        if (item.CheckBox) {
          var path = {
            Type: "Tiền sử bệnh răng miệng",
            Pathological: item.Text,
          };
          this.patientInfo.PathlogicalLst.push(path);
        }
      }
      AddPatientLst({
        Data: {
          ...this.patientInfo,
          Birthday: formatDate(this.patientInfo.Birthday),
        },
      }).then((res) => {
        if (res) {
          this.isShowCreateCustomer = false;
          this.getPatientLst();
          if (this.patientInfo.Dialog == "Thêm khách hàng") {
            notify({
              type: "success",
              title: "Thành công",
              text: "Thêm khách hàng mới thành công",
            });
          } else {
            notify({
              type: "success",
              title: "Thành công",
              text: "Cập nhật khách hàng thành công",
            });
          }
        }
      });
    },
    getCity() {
      GetCity({}).then((res) => {
        if (res) {
          this.cityLst = res.Data;
        }
      });
    },
    getDistrictByCity() {
      if (this.patientInfo.City) {
        GetDistrictByCity({ City: this.patientInfo.City }).then((res) => {
          if (res) {
            this.districtLst = res.Data;
          }
        });
      }
    },
    getCommuneByCityAndDistrict() {
      if (this.patientInfo.City && this.patientInfo.District) {
        GetCommuneByCityAndDistrict({
          City: this.patientInfo.City,
          District: this.patientInfo.District,
        }).then((res) => {
          if (res) {
            this.communeLst = res.Data;
          }
        });
      }
    },

    getPatientLst() {
      GetPatientLst({
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: this.search,
      }).then((res) => {
        if (res) {
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
            };
          });
        }
      });
    },
  },
  created() {
    this.getPatientLst();
    this.getCity();
    this.getEmployLst();
  },
};
</script>

<style></style>
