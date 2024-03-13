<template>
  <v-card>
    <v-card-title>
      <div class="d-flex" style="justify-content: space-between">
        <h6 class="text-h6 py-2">Danh sách nhập hàng</h6>
        <v-btn
          color="primary"
          variant="tonal"
          icon="mdi-book-plus-multiple"
          style="height: 42px"
          @click="btShowCreateOdd"
        ></v-btn>
      </div>
    </v-card-title>
    <v-data-table-server
      no-data-text="Không có dữ liệu"
      :headers="headers"
      :items="desserts"
      items-per-page-text=""
      sort-asc-icon="mdi-menu-up"
      sort-desc-icon="mdi-menu-down"
      :items-length="dataLength"
      @update:itemsPerPage="btRow"
      @update:page="btPage"
      height="calc(100vh - 210px)"
      :loading="loadding"
      :items-per-page-options="[
        { value: 10, title: '10' },
        { value: 50, title: '50' },
        { value: 100, title: '100' },
        { value: 10000, title: 'All' },
      ]"
    >
      <template v-slot:top>
        <div class="d-flex flex-wrap gap-2">
          <span>
            <VDateField
              v-model:modelValue="timeStart"
              label="Bắt đầu"
            ></VDateField>
          </span>
          <span>
            <VDateField
              v-model:modelValue="timeEnd"
              label="Kết thúc"
            ></VDateField>
          </span>
          <span>
            <v-text-field
              v-model="search"
              style="width: 180px"
              placeholder="Tìm kiếm"
            ></v-text-field>
          </span>
          <v-btn
            color="secondary"
            variant="tonal"
            icon="mdi-magnify"
            style="height: 42px"
            @click="fetchData"
          ></v-btn>
          <v-btn
            color="success"
            variant="tonal"
            icon="mdi-plus"
            style="height: 42px"
            @click="btShowCreate"
          ></v-btn>
        </div>
      </template>
      <template v-slot:item.Key="{ item }">
        {{ item.raw.Key }}
        <v-icon
          color="error"
          size="small"
          class="me-2"
          @click="btShowDel(item.raw)"
          >mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.Ranking="{ item }">
        {{ getRank(item.raw.Ranking) }}
      </template>
      <template v-slot:item.Point="{ item }">
        {{ new Intl.NumberFormat().format(item.raw.Point) }}
      </template>
      <template v-slot:item.Register="{ item }">
        <v-icon v-if="item.raw.StatusCare == 4" color="success"
          >mdi-check-circle</v-icon
        >
        <v-icon v-else color="more">mdi-close-circle</v-icon>
      </template>
      <template v-slot:item.StatusText="{ item }">
        <v-chip :color="getStatus(item.raw.Status).color">
          {{ getStatus(item.raw.Status).text }}</v-chip
        >
      </template>
      <template v-slot:item.ItemLength="{ item }">
        <v-menu
          v-model="item.raw.Menu"
          :close-on-content-click="false"
          location="end"
        >
          <template v-slot:activator="{ props }">
            <v-btn variant="tonal" color="secondary" v-bind="props">
              {{ item.raw.TotalNumberBox }} Hộp
            </v-btn>
          </template>

          <v-card max-width="520">
            <v-card-item>
              <v-chip
                v-for="(stam, index) in item.raw.ItemLength"
                :key="index"
                class="mx-1 my-1"
              >
                <span
                  style="color: red"
                  v-if="item.raw.ItemLstOut.includes(stam)"
                >
                  {{ stam }}
                </span>
                <span v-else>{{ stam }}</span>
              </v-chip>
            </v-card-item>
          </v-card>
        </v-menu>
      </template>
    </v-data-table-server>
  </v-card>

  <v-dialog v-model="isShowCreate" persistent width="1000"
    ><Create @btClose="btClose" />
  </v-dialog>
  <v-dialog v-model="isShowCreateOdd" persistent width="1000"
    ><CreateOdd @btClose="btClose" />
  </v-dialog>
  <v-dialog v-model="isShowDel" persistent width="400">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">
          Xóa tem nhập hàng - {{ delInfo.StampID }}
        </h6>
      </v-card-title>
      <v-card-text>
        <div class="px-2">Có chắc bạn muốn xóa tem nhập hàng này không?</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="btClose">
          Đóng
        </v-btn>
        <v-btn @click="delLocalStoreIn"> Xác nhận </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script>
import {
  getPageNumber,
  setPageNumber,
  setRowspPage,
  getRowspPage,
} from "@/utils/auth";
import {
  formatDateDisplay,
  formatDateDisplayDDMMYY,
  formatDateUpload,
} from "@/helpers/getTime";

import Create from "./components/create.vue";
import CreateOdd from "./components/createOdd.vue";

import { GetLocalStoreInLst, DelLocalStoreIn } from "@/api/import";

export default {
  components: {
    Create,
    CreateOdd,
  },
  data() {
    return {
      loadding: false,
      headers: [
        { title: "STT", sortable: false, key: "Key", width: 50 },
        {
          title: "Trạng thái",
          key: "StatusText",
          sortable: false,
          align: "center",
        },
        { title: "Mã tem", key: "StampID", sortable: false },
        { title: "Sản phẩm", key: "ProductName", sortable: false },
        { title: "Số lô", key: "LotCode", sortable: false, align: "center" },
        {
          title: "Số lượng",
          key: "Quantity",
          sortable: false,
          align: "center",
        },
        {
          title: "Hạn dùng",
          key: "DateExpiredShow",
          sortable: false,
          align: "center",
        },
        {
          title: "Ngày nhập",
          key: "TimeCreateShow",
          sortable: false,
          align: "center",
        },
        {
          title: "Người tạo",
          key: "Creater",
          sortable: false,
          align: "center",
        },

        {
          title: "Hộp",
          key: "ItemLength",
          sortable: false,
          align: "center",
        },
      ],
      menu: false,
      desserts: [],
      pageNumber: 1,
      rowspPage: 10,
      search: "",
      dataLength: 0,
      timeStart: new Date(),
      timeEnd: new Date(),
      isShowCreate: false,
      isShowCreateOdd: false,
      isShowDel: false,
      delInfo: {},
    };
  },
  watch: {
    timeStart(newValue) {
      this.getLocalStoreInLst();
    },
    timeEnd(newValue) {
      this.getLocalStoreInLst();
    },
    pageNumber(newValue) {
      // setPageNumber(newValue);
      this.getLocalStoreInLst();
    },
    rowspPage(newValue) {
      setRowspPage(newValue);
      this.getLocalStoreInLst();
    },
    search(newValue) {
      if (newValue.length > 4 || newValue.length == 0) {
        this.getLocalStoreInLst();
      }
    },
  },
  methods: {
    btShowDel(data) {
      this.isShowDel = true;
      this.delInfo = data;
    },
    delLocalStoreIn() {
      DelLocalStoreIn({
        StampID: this.delInfo.StampID,
      }).then((res) => {
        if (res.RespCode == 0) {
          notify({
            type: "success",
            title: "Thành công",
            text: "Xóa tem nhập hàng thành công",
          });
          this.isShowDel = false;
          this.getLocalStoreInLst();
        } else {
          notify({
            type: "error",
            title: "Cảnh báo",
            text: res.RespText,
          });
          this.isShowDel = false;
        }
      });
    },
    btShowCreate() {
      this.isShowCreate = true;
    },
    btShowCreateOdd() {
      this.isShowCreateOdd = true;
    },
    getLocalStoreInLst() {
      GetLocalStoreInLst({
        TimeStart: this.timeStart
          ? formatDateUpload(this.timeStart) + " 00:00:00"
          : null,
        TimeEnd: this.timeEnd
          ? formatDateUpload(this.timeEnd) + " 23:59:00"
          : null,
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: this.search,
      }).then((res) => {
        this.desserts = res.Data.map((item, index) => {
          return {
            ...item,
            Menu: false,
            Key: index + 1,
            TotalNumberBox: item.ItemLst
              ? item.ItemLst.split(";").length - 1
              : 0,
            DateExpiredShow: formatDateDisplayDDMMYY(item.DateExpired),
            TimeCreateShow: formatDateDisplayDDMMYY(item.TimeCreate),
            ItemLength: item.ItemLst
              ? item.ItemLst.split("\u0000;").filter((p) => p != "")
              : [],
          };
        });
        console.log("this.dessert", this.desserts);
        this.dataLength = res.TotalRows;
      });
    },
    btClose() {
      this.isShowCreate = false;
      this.isShowDel = false;
      this.isShowCreateOdd = false;
      this.getLocalStoreInLst();
    },
    btPage(data) {
      this.pageNumber = data;
    },
    btRow(data) {
      this.rowspPage = data;
    },
    getStatus(status) {
      if (status == 0) {
        return { text: "Đã hủy", color: "error" };
      }
      if (status == 1) {
        return { text: "Mới nhập kho", color: "more" };
      }
      if (status == 2) {
        return { text: "Đã đóng kiện", color: "secondary" };
      }
      if (status == 3 || status == 4) {
        return { text: "Đã bốc hàng", color: "success" };
      }
    },
  },
  created() {
    if (getRowspPage()) {
      this.rowspPage = parseInt(getRowspPage());
    }
    // if (getPageNumber()) {
    //   this.pageNumber = parseInt(getPageNumber());
    // }
    this.getLocalStoreInLst();
  },
};
</script>

<style></style>
