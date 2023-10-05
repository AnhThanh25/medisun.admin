<template>
  <v-card>
    <v-card-title>
      <div class="d-flex" style="justify-content: space-between">
        <h6 class="text-h6 py-2">Khách hàng</h6>
        <div>
          <v-btn
            color="primary"
            variant="tonal"
            icon="mdi-account-search"
            style="height: 42px"
            class="mr-1"
          ></v-btn>
          <v-btn
            color="success"
            variant="tonal"
            icon="mdi-microsoft-excel"
            style="height: 42px"
            class="mr-1"
          ></v-btn>
          <v-btn
            color="error"
            variant="tonal"
            icon="mdi-face-agent"
            style="height: 42px"
          ></v-btn>
        </div>
      </div>
    </v-card-title>
    <v-data-table-server
      no-data-text="Không có dữ liệu"
      :headers="headers"
      :items="desserts"
      items-per-page-text=""
      sort-asc-icon="mdi-menu-up"
      sort-desc-icon="mdi-menu-down"
      :items-length="totalLength"
      @update:itemsPerPage="btRow"
      @update:page="btPage"
    >
      <template v-slot:top>
        <div class="d-flex flex-wrap gap-2">
          <span>
            <v-select
              v-model="placeName"
              :items="placeLst"
              label="Địa bàn"
              item-title="City"
              item-value="City"
              class="ml-4"
              style="width: 220px !important"
            ></v-select>
          </span>
          <span>
            <v-select
              v-model="placeName"
              :items="placeLst"
              label="Loại tổ chức"
              item-title="City"
              item-value="City"
              style="width: 200px !important"
            ></v-select>
          </span>
          <span>
            <v-select
              v-model="placeName"
              :items="placeLst"
              label="Trạng thái"
              item-title="City"
              item-value="City"
              style="width: 200px !important"
            ></v-select>
          </span>
          <span>
            <v-select
              v-model="placeName"
              :items="placeLst"
              label="Hạng KH"
              item-title="City"
              item-value="City"
              style="width: 200px !important"
            ></v-select>
          </span>

          <v-btn
            color="blue"
            variant="tonal"
            icon="mdi-clock-plus"
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
    </v-data-table-server>
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
import { GetCRMLstByCity, GetCRMLstByLevel, GetPlaceLstByID } from "@/api/crm";
import { formatDate } from "@/helpers/getTime";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict,
} from "@/api/default";
import { getRoleText, roleLst } from "@/utils/role";
import { pathAll, pathTeeth } from "./variable";
export default {
  data() {
    return {
      isShowCreateCustomer: false,
      isShowUpdateCustomer: false,
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
      placeName: "",
      totalLength: 0,
      placeLst: [],
    };
  },
  watch: {
    placeName() {
      this.getCRMLstByCity();
    },
    pageNumber() {
      this.getCRMLstByCity();
    },
    rowspPage() {
      this.getCRMLstByCity();
    },
    search(newValue) {
      if (newValue.length > 4 || newValue.length == 0) {
        this.getCRMLstByCity();
      }
    },
  },
  methods: {
    btPage(data) {
      this.pageNumber = data;
    },
    btRow(data) {
      this.rowspPage = data;
    },
    getPlaceLstByID() {
      GetPlaceLstByID({}).then((res) => {
        this.placeLst = res.Data;
      });
    },
    getCRMLstByCity() {
      GetCRMLstByCity({
        City: this.placeName,
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        Search: "",
        PlaceType: this.placeType,
        Product: this.productName,
      }).then((res) => {
        this.desserts = res.Data.map((item, index) => {
          return {
            ...item,
            Key: index + 1,
          };
        });
        this.dataLength = res.TotalRows;
      });
    },
  },
  created() {
    this.getPlaceLstByID();
  },
};
</script>

<style></style>
