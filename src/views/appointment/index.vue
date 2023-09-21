<template>
  <v-card>
    <v-card-title class="text-h6 py-4">Danh sách lịch hẹn</v-card-title>

    <v-data-table
      no-data-text="Không có dữ liệu"
      :headers="headers"
      :items="desserts"
      :search="search"
      items-per-page-text="Số dòng 1 trang"
      sort-asc-icon="mdi-menu-up"
      sort-desc-icon="mdi-menu-down"
      :height="desserts.length < 4 ? 250 : ''"
    >
      <template v-slot:top>
        <div class="d-flex flex-wrap gap-2">
          <span>
            <VDatePicker2
              locale="vi"
              v-model="timeStart"
              mode="date"
              :masks="masks"
              style="z-index: 100000"
            >
              <template #default="{ inputValue, inputEvents }">
                <v-text-field
                  v-model="timeStart"
                  :value="inputValue"
                  v-on="inputEvents"
                  label="Bắt đầu"
                  append-inner-icon="mdi-calendar"
                  style="width: 150px"
                  class="ml-4"
                />
              </template>
            </VDatePicker2>
          </span>
          <span>
            <VDatePicker2
              locale="vi"
              v-model="timeEnd"
              mode="date"
              :masks="masks"
            >
              <template #default="{ inputValue, inputEvents }">
                <v-text-field
                  v-model="timeEnd"
                  :value="inputValue"
                  v-on="inputEvents"
                  label="Kết thúc"
                  append-inner-icon="mdi-calendar"
                  style="width: 150px"
                />
              </template>
            </VDatePicker2>
          </span>

          <span>
            <v-text-field
              v-model="search"
              label="Tìm kiếm"
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
            @click="isShowCreateAppointment = true"
            icon="mdi-note-plus"
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

        <v-icon color="primary" size="small" @click="btShowDel(item.raw)">
          mdi-delete
          <v-tooltip text="Xóa"> </v-tooltip>
        </v-icon>
      </template>
      <template v-slot:item.StatusText="{ item }">
        <v-chip :color="item.raw.ColorText">
          {{ item.raw.StatusText }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
  <v-dialog v-model="isShowCreateAppointment" persistent width="500">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Tạo lịch hẹn</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-model="appointmentInfo.PatientID"
              label="Khách hàng"
              :items="patientLst"
              item-title="Title"
              item-value="PatientID"
            ></v-autocomplete>
            <v-row>
              <v-col cols="6">
                <VDatePicker2
                  locale="vi"
                  v-model="appointmentInfo.AppointmentDate"
                  mode="date"
                  :masks="masks"
                >
                  <template #default="{ inputValue, inputEvents }">
                    <v-text-field
                      v-model="appointmentInfo.AppointmentDate"
                      :value="inputValue"
                      v-on="inputEvents"
                      label="Ngày hẹn/ tái khám"
                      append-inner-icon="mdi-calendar"
                    />
                  </template>
                </VDatePicker2>
              </v-col>
              <v-col cols="6">
                <VDatePicker2
                  locale="vi"
                  v-model="appointmentInfo.AppointmentDate"
                  mode="time"
                  is24hr
                  hide-time-header
                >
                  <template #default="{ inputValue, inputEvents }">
                    <v-text-field
                      v-model="appointmentInfo.AppointmentDate"
                      :value="inputValue"
                      v-on="inputEvents"
                      label="Giờ hẹn/ tái khám"
                      append-inner-icon="mdi-clock"
                    />
                  </template>
                </VDatePicker2>
              </v-col>
            </v-row>

            <v-select
              v-model="appointmentInfo.DentistID"
              :items="employLst"
              label="Người thực hiện"
              item-title="Title"
              item-value="UserName"
            ></v-select>
            <v-select
              v-model="appointmentInfo.AppointmentType"
              :items="['Lịch hẹn', 'Tái khám']"
              label="Loại lịch"
            ></v-select>
            <v-select
              v-model="appointmentInfo.ServiceID"
              :items="serviceLst"
              label="Thủ thuật"
              item-title="ServiceName"
              item-value="ServiceID"
            ></v-select>

            <v-text-field
              label="Ghi chú"
              v-model="appointmentInfo.Note"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowCreateAppointment = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="addAppointment"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowUpdateAppointment" persistent width="500">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Cập nhật lịch hẹn</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-model="appointmentUpdate.PatientID"
              label="Khách hàng"
              :items="patientLst"
              item-title="Title"
              item-value="PatientID"
            ></v-autocomplete>
            <v-row>
              <v-col cols="6">
                <VDatePicker2
                  locale="vi"
                  v-model="appointmentUpdate.AppointmentDate"
                  mode="date"
                  :masks="masks"
                >
                  <template #default="{ inputValue, inputEvents }">
                    <v-text-field
                      v-model="appointmentUpdate.AppointmentDate"
                      :value="inputValue"
                      v-on="inputEvents"
                      label="Ngày hẹn/ tái khám"
                      append-inner-icon="mdi-calendar"
                    />
                  </template>
                </VDatePicker2>
              </v-col>
              <v-col cols="6">
                <VDatePicker2
                  locale="vi"
                  v-model="appointmentUpdate.AppointmentDate"
                  mode="time"
                  is24hr
                  hide-time-header
                >
                  <template #default="{ inputValue, inputEvents }">
                    <v-text-field
                      v-model="appointmentUpdate.AppointmentDate"
                      :value="inputValue"
                      v-on="inputEvents"
                      label="Giờ hẹn/ tái khám"
                      append-inner-icon="mdi-clock"
                    />
                  </template>
                </VDatePicker2>
              </v-col>
            </v-row>

            <v-select
              v-model="appointmentUpdate.DentistID"
              :items="employLst"
              label="Người thực hiện"
              item-title="Title"
              item-value="UserName"
            ></v-select>
            <v-select
              v-model="appointmentUpdate.AppointmentType"
              :items="['Lịch hẹn', 'Tái khám']"
              label="Loại lịch"
            ></v-select>
            <v-select
              v-model="appointmentUpdate.ServiceID"
              :items="serviceLst"
              label="Thủ thuật"
              item-title="ServiceName"
              item-value="ServiceID"
            ></v-select>

            <v-text-field
              label="Ghi chú"
              v-model="appointmentUpdate.Note"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowUpdateAppointment = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="updateAppointment(appointmentUpdate, 2)">
          Lưu thông tin
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowDelAppointment" width="400">
    <v-card>
      <v-toolbar
        class="pl-2"
        color="error"
        title="Xóa lịch hẹn"
        center
      ></v-toolbar>
      <v-card-text>
        <div class="text-h5 pt-4">Có chắc bạn muốn xóa lịch hẹn này không?</div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="blue" variant="text" @click="isShowDelAppointment = false"
          >Đóng</v-btn
        >
        <v-btn variant="text" @click="updateAppointment(itemDel, 0)">Xóa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script>
import {
  GetAppointmentLst,
  AddAppointment,
  UpdateAppointment,
} from "@/api/appointment";
import { formatDateUpload, formatDateDisplay } from "@/helpers/getTime";
import { getStatusAppointment, appointmentStatusLst } from "./variable";
import { GetPatientLst } from "@/api/patient";
import { GetEmployLst } from "@/api/user";
import { getRoleText, roleLst } from "@/utils/role";
import { GetServiceLst } from "@/api/service";
import { formatDate } from "@/helpers/getTime";
export default {
  data() {
    return {
      timeStart: new Date(),
      timeEnd: new Date(),
      date: null,
      typeTeeth: 1,
      appointmentInfo: {},
      appointmentUpdate: {},
      isShowDelAppointment: false,
      isShowCreateAppointment: false,
      isShowUpdateAppointment: false,
      search: "",
      sortBy: [{ key: "calories", order: "asc" }],
      headers: [
        {
          title: "STT",
          align: "start",
          sortable: false,
          key: "Key",
        },
        { title: "Thời gian", key: "AppointmentDateShow" },
        { title: "Bác sĩ", key: "DentistName" },
        { title: "Khách hàng", key: "PatientName" },
        { title: "Số điện thoại", key: "Phone" },
        { title: "Dịch vụ", key: "ServiceName" },
        { title: "Ghi chú", key: "Note" },
        { title: "Trạng thái", key: "StatusText" },
        { title: "Action", key: "Action" },
      ],
      desserts: [],

      masks: {
        input: "DD-MM-YYYY",
      },
      patientLst: [],
      searchPatient: "",
      employLst: [],
      serviceLst: [],
      itemDel: {},
    };
  },
  watch: {
    timeStart() {
      this.getAppointmentLst();
    },
    timeEnd() {
      this.getAppointmentLst();
    },
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
    getPatientLst() {
      GetPatientLst({
        PageNumber: 1,
        RowspPage: 1000,
        Search: this.searchPatient,
      }).then((res) => {
        if (res) {
          this.patientLst = res.Data.map((item) => {
            return {
              ...item,
              Title: item.PatientName + " - " + item.Phone,
            };
          });
        }
      });
    },
    btShowDel(data) {
      this.isShowDelAppointment = true;
      this.itemDel = data;
    },
    btShowUpdate(data) {
      this.isShowUpdateAppointment = true;
      this.appointmentUpdate = data;
    },
    updateAppointment(data, status) {
      UpdateAppointment({
        Data: {
          ...data,
          PatientName: this.patientLst.find(
            (p) => p.PatientID == data.PatientID
          ).PatientName,
          AppointmentDate: formatDate(data.AppointmentDate),
          Status: status,
        },
      }).then((res) => {
        if (res) {
          this.isShowUpdateAppointment = false;
          this.isShowDelAppointment = false;
          this.getAppointmentLst();
          notify({
            type: "success",
            title: "Thành công",
            text:
              status == 0
                ? "Xóa lịch hẹn thành công"
                : "Cập nhật lịch hẹn mới thành công",
          });
        }
      });
    },
    addAppointment() {
      AddAppointment({
        Data: {
          ...this.appointmentInfo,
          PatientName: this.patientLst.find(
            (p) => p.PatientID == this.appointmentInfo.PatientID
          ).PatientName,
          AppointmentDate: formatDate(this.appointmentInfo.AppointmentDate),
        },
      }).then((res) => {
        if (res) {
          this.isShowCreateAppointment = false;
          this.getAppointmentLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Thêm lịch hẹn mới thành công",
          });
        }
      });
    },
    getAppointmentLst() {
      GetAppointmentLst({
        TimeStart: formatDateUpload(this.timeStart) + " 00:00:00",
        TimeEnd: formatDateUpload(this.timeEnd) + " 23:59:59",
      }).then((res) => {
        if (res) {
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              AppointmentDateShow: formatDateDisplay(item.AppointmentDate),
              StatusText: getStatusAppointment(item.Status).Text,
              ColorText: getStatusAppointment(item.Status).Color,
            };
          });
        }
      });
    },
  },
  created() {
    this.getAppointmentLst();
    this.getPatientLst();
    this.getEmployLst();
    this.getServiceLst();
  },
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
