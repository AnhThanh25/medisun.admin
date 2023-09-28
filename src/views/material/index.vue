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
        </div> </template
    ></v-data-table>
  </v-card>
  <v-dialog v-model="isShowCreateLabo" width="800">
    <Create @close="btClose" />
  </v-dialog>
</template>

<script>
import {
  GetOrderMaterialLst,
  AddOrderMaterial,
  DelOrderMaterial,
} from "@/api/material";
import Create from "./components/create.vue";
export default {
  components: {
    Create,
  },
  data() {
    return {
      isShowCreateLabo: false,
      headers: [
        {
          title: "STT",
          align: "start",
          sortable: false,
          key: "Key",
        },
        { title: "Mã phiếu", key: "calories" },
        { title: "Ngày lập", key: "name" },
        { title: "Khách hàng", key: "carbs" },
        { title: "Nhân viên phụ trách", key: "protein" },
        { title: "Ghi chú", key: "fat" },
        { title: "Chức năng", key: "" },
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
  methods: {
    btClose() {
      this.isShowCreateLabo = false;
    },
    btCreateLabo() {
      this.isShowCreateLabo = true;
    },
    getOrderMaterialLst() {
      GetOrderMaterialLst({
        PageNumber: 4,
        RowspPage: 5,
        Search: "",
        TimeStart: "sample string 7",
        TimeEnd: "sample string 8",
      }).then((res) => {});
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
