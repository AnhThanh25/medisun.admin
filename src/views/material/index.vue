<template>
  <v-card>
    <v-card-title class="text-h6 py-4"
      >Danh sách phiếu đặt mua vật liệu</v-card-title
    >
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
            @click="btCreateLabo"
            icon="mdi-tooth"
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
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
  <v-dialog v-model="isShowCreateLabo" width="800">
    <Create :dataUpdate="itemUpdate" @close="btClose" @success="btCreateSuccess" />
  </v-dialog>
  <v-dialog v-model="isShowDelLabo" width="400">
    <v-card>
      <v-toolbar
        class="pl-2"
        color="error"
        title="Xóa phiếu đặt vật liệu"
        center
      ></v-toolbar>
      <v-card-text>
        <div class="text-h5 pt-4">
          Có chắc bạn muốn xóa phiếu đặt vật liệu này không?
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="blue" variant="text" @click="isShowDelLabo = false"
          >Đóng</v-btn
        >
        <v-btn variant="text" @click="delLabo">Xóa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { GetOrderMaterialLst, DelOrderMaterial } from "@/api/material";
import Create from "./components/create.vue";
import { formatDateUpload, formatDateDisplay } from "@/helpers/getTime";
export default {
  components: {
    Create,
  },
  data() {
    return {
      isShowDelLabo: false,
      isShowCreateLabo: false,
      headers: [
        { title: "STT", sortable: false, key: "Key" },
        { title: "Mã phiếu", key: "OrderMaterialID" },
        { title: "Ngày lập", key: "TimeCreate" },
        { title: "Khách hàng", key: "PatientName" },
        { title: "NV phụ trách", key: "EmployCareName" },
        { title: "Ghi chú", key: "Note" },
        { title: "", key: "Action" },
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
      itemUpdate: {},
    };
  },
  methods: {
    btShowUpdate(data) {
      this.itemUpdate = data;
      this.isShowCreateLabo = true;
    },
    btCreateSuccess() {
      this.isShowCreateLabo = false;
      this.getOrderMaterialLst();
    },
    btShowDel(data) {
      this.isShowDelLabo = true;
      this.itemDel = data;
    },
    delLabo() {
      DelOrderMaterial({ OrderMaterialID: this.itemDel.OrderMaterialID }).then(
        (res) => {
          if (res) {
            this.isShowDelLabo = false;
            this.getOrderMaterialLst();
            notify({
              type: "success",
              title: "Thành công",
              text: "Xóa phiếu đặt thành công",
            });
          }
        }
      );
    },
    btClose() {
      this.isShowCreateLabo = false;
    },
    btCreateLabo() {
      this.isShowCreateLabo = true;
    },
    getOrderMaterialLst() {
      GetOrderMaterialLst({
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
    this.getOrderMaterialLst();
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
