<template>
  <v-card>
    <v-card-title class="text-h6 py-4"> Khách hàng </v-card-title>

    <v-data-table  no-data-text="Không có dữ liệu"
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
                <div style="position: relative; z-index: 1000000">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    class="custom-picker"
                  >
                    <template v-slot:activator="{ isActive }">
                      <v-text-field
                        v-model="computedDateFormatted"
                        label="Ngày sinh"
                        append-inner-icon="mdi-calendar"
                        persistent-hint
                        readonly
                        hide-details
                        @click="menu2 = !isActive"
                      ></v-text-field>
                    </template>
                    <VDatePicker2
                      v-model="patientInfo.Birthday"
                      no-title
                      @input="menu2 = false"
                    ></VDatePicker2>
                  </v-menu>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="patientInfo.City"
                  label="Tỉnh/TP"
                  hide-details
                  :items="cityLst"
                  :item-title="'City'"
                  :item-value="'City'"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="patientInfo.District"
                  :items="districtLst"
                  :item-title="'District'"
                  :item-value="'District'"
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
                  :item-title="'Commune'"
                  :item-value="'Commune'"
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
                <v-text-field
                  label="Nhân viên phụ trách"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
            </v-row>
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
import { GetPatientLst } from "@/api/patient";
import { formatDate } from "@/helpers/getTime";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict,
} from "@/api/default";
export default {
  data() {
    return {
      patientInfo: {},
      fromDateVal: "",
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
        { title: "Mã KH", key: "PatientID" },
        { title: "Tên KH", key: "PatientName" },
        { title: "SĐT", key: "Phone" },
        { title: "Địa chỉ", key: "Address" },
        { title: "NV phụ trách", key: "EmployCare" },
        { title: "Công nợ", key: "DebtNow" },
        { title: "Action", key: "" },
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
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDateShow(this.date);
    },
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
    formatDateShow(date) {
      if (!date) return null;
      const [year, month, day] = formatDate(date).split(" ")[0].split("-");
      return `${day}-${month}-${year}`;
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
  },
};
</script>

<style>
.custom-picker .v-overlay__content {
  position: absolute;
  top: calc(50% - 60px);
  left: calc(50% - 250px);
}
@media screen and (max-width: 598px) {
  .custom-picker .v-overlay__content {
    position: absolute;
    top: calc(50% - 60px);
    left: calc(50% - 125px);
  }
}
</style>
