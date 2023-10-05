<template>
  <v-card style="margin-bottom: 12px">
    <v-card-text class="pb-0">
      <div class="d-sm-flex align-center">
        <div>
          <h3 class="text-h6 pt-3">
            {{ titleAppointment }} hôm nay ({{ appointmentLst.length }})
          </h3>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-menu transition="scale-transition">
            <template v-slot:activator="{ props }">
              <v-btn
                class="mt-3"
                variant="text"
                icon="mdi-dots-horizontal"
                size="x-small"
                v-bind="props"
              ></v-btn>
            </template>
            <v-card width="100" class="mx-auto bg-secondary item-menu">
              <v-list>
                <v-list-item
                  v-for="n in ['Lịch hẹn', 'Tái khám']"
                  :key="n"
                  link
                  @click="titleAppointment = n"
                >
                  <v-list-item-title>{{ n }}</v-list-item-title>
                </v-list-item>
              </v-list></v-card
            >
          </v-menu>
        </div>
      </div>
    </v-card-text>

    <v-list>
      <v-list-item
        v-for="(item, index) in appointmentLst"
        :key="item.TimeCreate"
        link
        @click="btShowInfo(item)"
      >
        <v-list-item-title>
          <div class="d-flex justify-space-between">
            <div>
              <span class="text">{{ index + 1 }}.</span>
              <span class="text"
                >{{ item.PatientName }} - {{ item.Phone }}</span
              >
            </div>

            <span></span>
            <v-btn
              icon="mdi-check-circle-outline"
              size="x-small"
              variant="text"
              :color="item.Status == 3 ? 'success':'more'"
            ></v-btn></div
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
  <v-dialog v-model="isShowAppointInfo" width="400">
    <v-card>
      <v-card-text class="text-center pb-0 pt-10">
        <div class="text-h5">
          {{ appointInfo.PatientName ?? "Chưa lưu tên khách hàng" }}
        </div>
        <h6 class="text">{{ appointInfo.Phone }}</h6>

        <v-icon
          color="blue"
          icon="mdi-clock"
          size="medium"
          style="margin-bottom: 3px"
        ></v-icon>
        <p class="text">
          {{ appointInfo.AppointmentDateShow }} -
          {{ appointInfo.AppointmentType }}
        </p>
      </v-card-text>
      <v-card-item>
        <v-card-title>Dịch vụ: {{ appointInfo.ServiceName }}</v-card-title>

        <v-card-title> Bác sĩ: {{ appointInfo.DentistName }} </v-card-title>
        <v-card-title> Ghi chú: {{ appointInfo.Note }} </v-card-title>
      </v-card-item>

      <v-card-actions class="justify-end">
        <v-btn color="blue" variant="text" @click="isShowAppointInfo = false"
          >Đóng</v-btn
        >
        <v-btn variant="text" @click="confirmAppointment"
          >Xác nhận khách đến</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script>
import { GetAppointmentLst, UpdateAppointment } from "@/api/appointment";
import { formatDateUpload, formatDateHHMM } from "@/helpers/getTime";
export default {
  data() {
    return {
      timeStart: new Date(),
      timeEnd: new Date(),
      appointmentLst: [],
      expand1: false,
      titleAppointment: "Lịch hẹn",
      dataAll: [],
      isShowAppointInfo: false,
      appointInfo: {},
    };
  },
  watch: {
    titleAppointment(newValue) {
      if (newValue == "Lịch hẹn") {
        this.appointmentLst = this.dataAll.filter(
          (p) => p.AppointmentType == "Lịch hẹn"
        );
      }
      if (newValue == "Tái khám") {
        this.appointmentLst = this.dataAll.filter(
          (p) => p.AppointmentType == "Tái khám"
        );
        console.log("123");
      }
    },
  },
  methods: {
    confirmAppointment() {
      UpdateAppointment({
        Data: { ...this.appointInfo, Status: 3 },
      }).then((res) => {
        if (res) {
          this.isShowAppointInfo = false;
          this.getAppointmentLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Xác nhận khách hàng đã đến thành công",
          });
        }
      });
    },
    btShowInfo(data) {
      this.isShowAppointInfo = true;
      this.appointInfo = data;
    },
    getAppointmentLst() {
      GetAppointmentLst({
        TimeStart: formatDateUpload(this.timeStart) + " 00:00:00",
        TimeEnd: formatDateUpload(this.timeEnd) + " 23:59:59",
        PageNumber: 1,
        RowspPage: 1000,
        Search: "",
      }).then((res) => {
        if (res) {
          this.dataAll = res.Data.map((item) => {
            return {
              ...item,
              AppointmentDateShow: formatDateHHMM(item.AppointmentDate),
            };
          });
          this.appointmentLst = this.dataAll.filter(
            (p) => p.AppointmentType == "Lịch hẹn"
          );
        }
      });
    },
  },
  created() {
    this.getAppointmentLst();
  },
};
</script>

<style lang="scss" scoped>
.text {
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
  margin-right: 4px;
}
</style>
<style lang="scss">
.item-menu .v-list-item--density-default.v-list-item--one-line {
  min-height: 32px !important;
}
</style>
