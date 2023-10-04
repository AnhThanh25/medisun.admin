<template>
  <v-card>
    <v-card-title>
      <h6 class="text-h6 px-3 py-2">Tạo phiếu khám tổng quát</h6>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-autocomplete
            v-model="generalInfo.PatientID"
            label="Số điện thoại - Khách hàng"
            :items="patientLst"
            item-title="Title"
            item-value="PatientID"
            @update:search="btFilter"
            no-data-text="Khách hàng chưa có trong hệ thống"
          >
            <template v-slot:append>
              <v-btn
                icon="mdi-plus"
                variant="tonal"
                color="secondary"
                @click="btShowCreate"
              ></v-btn>
            </template>
          </v-autocomplete>
          <v-select
            v-model="generalInfo.EmployCare"
            :items="employLst"
            label="Nhân viên phụ trách"
            item-title="Title"
            item-value="UserName"
          ></v-select>
          <v-text-field
            label="Lý do khám"
            v-model="generalInfo.Reason"
          ></v-text-field>
          <v-text-field
            label="Ghi chú"
            v-model="generalInfo.Note"
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
      <v-row style="margin-top: -20px">
        <small style="line-height: 40px; font-size: 16px; padding-right: 70px"
          >Sơ đồ hàm răng:</small
        >
        <span>
          <v-radio-group inline v-model="generalInfo.TypeTeeth">
            <v-radio
              label="Hàm người lớn"
              value="Hàm người lớn"
              color="secondary"
            ></v-radio>
            <v-radio
              label="Hàm trẻ em"
              value="Hàm trẻ em"
              color="secondary"
            ></v-radio>
          </v-radio-group>
        </span>
      </v-row>
      <v-row>
        <TeethAdults
          v-if="generalInfo.TypeTeeth == 'Hàm người lớn'"
          :teethLst="generalInfo.TeethLst"
          @saveReasonTeeth="saveReasonTeeth"
        />
        <TeethKids
          v-if="generalInfo.TypeTeeth == 'Hàm trẻ em'"
          :teethLst="generalInfo.TeethLst"
        />
      </v-row>
      <v-data-table
        v-if="generalInfo.TeethLst.length > 0"
        no-data-text="Không có dữ liệu"
        :headers="teethHeaders"
        :items="generalInfo.TeethLst"
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
      <v-btn @click="addGeneralty"> Lưu thông tin </v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="isShowCreateCustomer" persistent width="600">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">{{ patientInfo.Dialog }}</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
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
import TeethAdults from "./components/teeth-adults.vue";
import TeethKids from "./components/teeth-kids.vue";
import { AddGeneralty } from "@/api/generalty";
import { GetEmployLst } from "@/api/user";
import { getRoleText } from "@/utils/role";
import { GetPatientLst, AddPatientLst } from "@/api/patient";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict,
} from "@/api/default";
import { formatDate } from "@/helpers/getTime";
export default {
  components: {
    TeethAdults,
    TeethKids,
  },
  data() {
    return {
      pathAll: [
        {
          Text: "Gan",
          CheckBox: false,
        },
        {
          Text: "Tiểu đường",
          CheckBox: false,
        },
        {
          Text: "Thấp khớp",
          CheckBox: false,
        },
        {
          Text: "Thần kinh",
          CheckBox: false,
        },
        {
          Text: "Dị ứng",
          CheckBox: false,
        },
        {
          Text: "Tiêu hóa",
          CheckBox: false,
        },
        {
          Text: "Hô hấp",
          CheckBox: false,
        },
        {
          Text: "Tim mạch",
          CheckBox: false,
        },
        {
          Text: "Thận",
          CheckBox: false,
        },
        {
          Text: "Khác",
          CheckBox: false,
        },
      ],
      pathTeeth: [
        {
          Text: "Đã từng nhổ răng",
          CheckBox: false,
        },
        {
          Text: "Khớp thái dương hàm",
          CheckBox: false,
        },
        {
          Text: "Đã từng chỉnh nha",
          CheckBox: false,
        },
        {
          Text: "Đã từng đeo hàm",
          CheckBox: false,
        },
        {
          Text: "Khác",
          CheckBox: false,
        },
      ],
      typeTeeth: 1,
      generalInfo: {
        TypeTeeth: "Hàm người lớn",
        TeethLst: [],
      },
      teethHeaders: [
        { title: "STT", sortable: false, key: "Key" },
        { title: "Loại", key: "TypeTeeth" },
        { title: "Răng", key: "TeethShow" },
        { title: "Bệnh lý", key: "Reason" },
      ],
      masks: {
        input: "DD-MM-YYYY",
      },
      generalID: null,
      employLst: [],
      patientLst: [],
      patientInfo: {},
      isShowCreateCustomer: false,
      cityLst: [],
      districtLst: [],
      communeLst: [],
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
    addPatientLst() {
      AddPatientLst({
        Data: {
          ...this.patientInfo,
          Birthday: formatDate(this.patientInfo.Birthday),
          PathlogicalLst: [],
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
    btShowCreate() {
      this.isShowCreateCustomer = true;
      this.patientInfo = { Dialog: "Thêm khách hàng" };
    },
    btFilter(value) {
      this.getPatientLst(value);
    },
    getPatientLst(search) {
      GetPatientLst({
        PageNumber: 1,
        RowspPage: 10,
        Search: search,
      }).then((res) => {
        if (res) {
          this.patientLst = res.Data.map((item) => {
            return {
              ...item,
              Title: item.Phone + " - " + item.PatientName,
            };
          });
        }
      });
    },
    addGeneralty() {
      this.generalInfo.PathlogicalLst = [];
      for (var i = 0; i < this.pathAll.length; i++) {
        var item = this.pathAll[i];
        if (item.CheckBox) {
          var path = {
            Type: "Tiền sử bệnh toàn thân",
            Pathological: item.Text,
          };
          this.generalInfo.PathlogicalLst.push(path);
        }
      }
      for (var i = 0; i < this.pathTeeth.length; i++) {
        var item = this.pathTeeth[i];
        if (item.CheckBox) {
          var path = {
            Type: "Tiền sử bệnh răng miệng",
            Pathological: item.Text,
          };
          this.generalInfo.PathlogicalLst.push(path);
        }
      }
      AddGeneralty({
        Data: this.generalInfo,
      }).then((res) => {
        if (res) {
          notify({
            type: "success",
            title: "Thành công",
            text: "Thêm phiếu khám tổng quát thành công",
          });
          setTimeout(() => {
            this.$router.push("/kham-benh/tong-quat");
          }, 500);
        }
      });
    },

    saveReasonTeeth(number, data) {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var check = this.generalInfo.TeethLst.find(
            (p) => p.Teeth == number && p.Reason == data[i].Text
          );
          if (!check) {
            this.generalInfo.TeethLst.push({
              TypeTeeth: this.generalInfo.TypeTeeth,
              Teeth: number,
              TeethShow: "Răng số " + number,
              Reason: data[i].Text,
            });
          }
        }
      } else {
        this.generalInfo.TeethLst = this.generalInfo.TeethLst.filter(
          (p) => p.Teeth != number
        );
      }

      this.generalInfo.TeethLst = this.generalInfo.TeethLst.map(
        (item, index) => {
          return {
            ...item,
            Key: index + 1,
          };
        }
      );
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
    this.getEmployLst();
    this.getPatientLst("");
    this.getCity();
  },
};
</script>

<style></style>
