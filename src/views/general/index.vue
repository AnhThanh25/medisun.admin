<template>
  <v-card>
    <v-card-title>
      <h6 class="text-h6 py-4">Danh sách phiếu khám tổng quát</h6>
    </v-card-title>
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
            @click="$router.push('/kham-benh/tao-phieu-tong-quat')"
            icon="mdi-note-plus-outline"
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
    </v-data-table>
  </v-card>
  <v-dialog v-model="isShowDelGeneral" width="400">
    <v-card>
      <v-toolbar
        class="pl-2"
        color="error"
        title="Xóa phiếu khám tổng quát"
        center
      ></v-toolbar>
      <v-card-text>
        <div class="text-h5 pt-4">
          Có chắc bạn muốn xóa phiếu khám tổng quát
          {{ itemDel.GeneraltyID }} này không?
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="blue" variant="text" @click="isShowDelGeneral = false"
          >Đóng</v-btn
        >
        <v-btn variant="text" @click="delGeneralty">Xóa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { GetGeneraltyLst, DelGeneralty } from "@/api/generalty";
import { formatDateUpload, formatDateDisplay } from "@/helpers/getTime";

export default {
  data() {
    return {
      isShowCreateCustomer: false,
      isShowDelGeneral: false,
      search: "",
      sortBy: [{ key: "calories", order: "asc" }],
      headers: [
        { title: "STT", sortable: false, key: "Key" },
        { title: "Mã phiếu", key: "GeneraltyID" },
        { title: "Ngày lập", key: "TimeCreate" },
        { title: "Khách hàng", key: "PatientName" },
        { title: "SĐT", key: "Phone" },
        { title: "NV phụ trách", key: "EmployCareName" },
        { title: "Lý do", key: "Reason" },
        { title: "Chức năng", key: "Action", sortable: false },
      ],
      desserts: [],
      pageNumber: 1,
      rowspPage: 10,
      search: "",
      timeStart: new Date(),
      timeEnd: new Date(),
      masks: {
        input: "DD-MM-YYYY",
      },
      itemDel: {},
    };
  },
  watch: {
    timeStart() {
      this.getGeneraltyLst();
    },
    timeEnd() {
      this.getGeneraltyLst();
    },
  },
  methods: {
    btShowUpdate(data) {
      this.$router.push(
        "/kham-benh/cap-nhat-phieu-tong-quat/" + data.GeneraltyID
      );
    },
    btShowDel(data) {
      this.itemDel = { ...data };
      this.isShowDelGeneral = true;
    },
    delGeneralty() {
      DelGeneralty({
        GeneraltyID: this.itemDel.GeneraltyID,
      }).then((res) => {
        if (res) {
          this.isShowDelGeneral = false;
          this.getGeneraltyLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Xóa dịch vụ thành công",
          });
        }
      });
    },
    getGeneraltyLst() {
      GetGeneraltyLst({
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: this.search,
        TimeStart: formatDateUpload(this.timeStart) + " 00:00:00",
        TimeEnd: formatDateUpload(this.timeEnd) + " 23:59:59",
      }).then((res) => {
        if (res) {
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              TimeCreate: formatDateDisplay(item.TimeCreate),
            };
          });
        }
      });
    },
  },
  created() {
    this.getGeneraltyLst();
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
