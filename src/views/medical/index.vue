<template>
  <v-card>
    <v-card-title class="text-h6 py-4">Danh sách phiếu khám</v-card-title>
    <v-data-table-server
      :items-length="totalLength"
      @update:itemsPerPage="btRow"
      @update:page="btPage"
      no-data-text="Không có dữ liệu"
      :headers="headers"
      :items="desserts"
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
              clearable
            ></v-text-field>
          </span>

          <v-btn
            color="blue"
            variant="tonal"
            @click="btCreateMedical"
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
    </v-data-table-server>
  </v-card>
  <v-dialog v-model="isShowDelMedical" width="400">
    <v-card>
      <v-toolbar
        class="pl-2"
        color="error"
        title="Xóa phiếu khám"
        center
      ></v-toolbar>
      <v-card-text>
        <div class="text-h5 pt-4">
          Có chắc bạn muốn xóa phiếu khám này không?
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="blue" variant="text" @click="isShowDelMedical = false"
          >Đóng</v-btn
        >
        <v-btn variant="text" @click="delMedical">Xóa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script>
import { GetMedicalLst, DelMedical } from "@/api/medical";
import { formatDateUpload, formatDateDisplay } from "@/helpers/getTime";

export default {
  data() {
    return {
      isShowDelMedical: false,
      search: "",
      headers: [
        { title: "STT", sortable: false, key: "Key" },
        { title: "Mã phiếu", key: "MedicalID", sortable: false },
        { title: "Ngày lập", key: "TimeCreate", sortable: false },
        { title: "Khách hàng", key: "PatientName", sortable: false },
        {
          title: "Nhân viên phụ trách",
          key: "EmployCareName",
          sortable: false,
        },
        { title: "Ghi chú", key: "Note", sortable: false },
        { title: "", key: "Action", sortable: false, width: "80px" },
      ],
      desserts: [],
      pageNumber: 1,
      rowspPage: 10,
      search: "",
      timeStart: new Date(),
      timeEnd: new Date(),
      itemDel: {},
      totalLength: 0,
    };
  },
  watch: {
    timeStart() {
      this.getMedicalLst();
    },
    timeEnd() {
      this.getMedicalLst();
    },
    pageNumber() {
      this.getMedicalLst();
    },
    rowspPage() {
      this.getMedicalLst();
    },
    search(newValue) {
      if (newValue.length > 4 || newValue.length == 0) {
        this.getMedicalLst();
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
    btShowUpdate(data) {
      this.$router.push("/kham-benh/cap-nhat-phieu-kham/" + data.MedicalID);
    },
    btShowDel(data) {
      this.itemDel = { ...data };
      this.isShowDelMedical = true;
    },
    delMedical() {
      DelMedical({
        MedicalID: this.itemDel.MedicalID,
      }).then((res) => {
        if (res) {
          this.isShowDelMedical = false;
          this.getMedicalLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Xóa dịch vụ thành công",
          });
        }
      });
    },
    getMedicalLst() {
      GetMedicalLst({
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
          this.totalLength = res.TotalRows;
        }
      });
    },
    btCreateMedical() {
      this.$router.push("/kham-benh/tao-phieu-kham");
    },
  },
  created() {
    this.getMedicalLst();
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
