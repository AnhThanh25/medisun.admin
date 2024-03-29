<script scoped>
import { GetRequestOrderLst, UpdateRequestOrder } from "@/api/requestOrderApi";
import DateField from "@/components/DateField.vue";
import { useDate } from "@/utils/date.js";
import { debounce } from "lodash";

const { formatDate } = useDate();
const { format } = useDate();

export default {
  components: { DateField },
  data() {
    return {
      dialogEdit: false,
      search: "",
      timeStart: "",
      timeEnd: "",
      page: 1,
      itemsPerPage: 10,
      headers: [
        { key: "RequestOrderID", title: "Mã YC", sortable: false },
        { key: "TimeCreate", title: "Ngày tạo", sortable: false, width: 116 },
        { key: "CustomerName", title: "Tên KH", sortable: false },
        { key: "CustomerPhone", title: "Liên hệ", sortable: false },
        { key: "Address", title: "Địa chỉ", sortable: false, width: 220 },
        { key: "LinkOrder", title: "Tiêu đề", sortable: false },
        { key: "Note", title: "Mô tả", sortable: false },
        { key: "Status", title: "Trạng thái", sortable: false },
      ],
      orders: [],
      selectedOrder: null,
      totalRows: 0,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalRows / this.itemsPerPage);
    },
  },
  watch: {
    page() {
      this.getOrderList();
    },
    itemsPerPage() {
      this.page = 1;
      this.getOrderList();
    },
    timeStart() {
      this.getOrderList();
    },
    timeEnd() {
      this.getOrderList();
    },
    search() {
      this.debouncedGetOrderList();
    },
  },
  mounted() {
    const TE = new Date();

    TE.setDate(TE.getDate() + 1);

    const TS = new Date(TE);

    TS.setDate(TS.getDate() - 14);
    this.timeStart = formatDate(TS, "YYYY-MM-DD");
    this.timeEnd = formatDate(TE, "YYYY-MM-DD");
  },
  created() {
    this.debouncedGetOrderList = debounce(this.getOrderList, 300);
  },
  methods: {
    getOrderList() {
      const df = useDate();

      this.timeStart = df.formatDate(this.timeStart, "yyyy-MM-DD 00:00:00");
      this.timeEnd = df.formatDate(this.timeEnd, "yyyy-MM-DD 23:59:59");
      GetRequestOrderLst({
        PageNumber: this.page,
        RowspPage: this.itemsPerPage,
        Search: this.search,
        TimeStart: this.timeStart,
        TimeEnd: this.timeEnd,
      }).then((res) => {
        if (res.RespCode == 0) {
          console.log(res);
          this.totalRows = res.TotalRows;

          this.orders = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
            };
          });
        }
      });
    },
    rowClicked(event, item) {
      this.dialogEdit = true;
      this.selectedOrder = item.item.selectable;
    },

    format(value, type) {
      return format(value, type);
    },
    handleConfirmOrder() {
      UpdateRequestOrder({ Data: { ...this.selectedOrder, Status: 2 } }).then(
        (res) => {
          if (res.RespCode == 0) {
            this.getOrderList();
            this.dialogEdit = false;
            notify({
              type: "success",
              title: "Thành công",
              text: "Xác nhận xử lý yêu cầu thành công",
            });
          } else {
            notify({
              type: "success",
              title: "Thành công",
              text: res.RespText,
            });
          }
        }
      );
    },
  },
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <div style="display: flex">
            <span>
              <DateField
                v-model:modelValue="timeStart"
                label="Từ ngày"
                density="compact"
                width="150px"
              />
            </span>
            <span>
              <DateField
                v-model:modelValue="timeEnd"
                label="Đến ngày"
                density="compact"
                width="150px"
              />
            </span>
            <span>
              <VTextField
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Tìm kiếm"
                density="compact"
                hide-details
                style="width:200px"
              />
            </span>
          </div>
        </VCardTitle>
        <VCardText>
          <VDataTable
            :headers="headers"
            :items="orders"
            :items-per-page="itemsPerPage"
            :loading="isLoading"
            fixed-header
            hover
            hide-default-footer
            @click:row="rowClicked"
          >
            <template #item.Address="{ item }">
              {{ item.selectable.Address }}, {{ item.selectable.Commune }},
              {{ item.selectable.District }},
              {{ item.selectable.City }}
            </template>
            <template #item.CustomerPhone="{ item }">
              <div>
                {{ item.selectable.CustomerPhone }}
              </div>
              <div>
                {{ item.selectable.CustomerEmail }}
              </div>
            </template>
            <template #item.LinkOrder="{ item }">
              <a :href="item.selectable.LinkOrder" target="_blank">
                {{ item.selectable.LinkOrder }}
              </a>
            </template>
            <template #item.TimeCreate="{ item }">
              <div>
                {{ format(item.selectable.TimeCreate, "DD-MM-YYYY") }}
              </div>
              <div>
                {{ format(item.selectable.TimeCreate, "HH:mm:ss") }}
              </div>
            </template>
            <template #item.Status="{ item }">
              <v-chip v-if="item.selectable.Status == 1" color="primary"
                >Mới tạo</v-chip
              >
              <v-chip v-if="item.selectable.Status == 2" color="success"
                >Đã xử lý</v-chip
              >
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VDialog v-model="dialogEdit" width="600">
    <VCard>
      <VCardItem>
        <VCardTitle>
          <div class="d-flex align-center justify-space-between">
            <span class="text-h5">
              Yêu cầu {{ selectedOrder.RequestOrderID }}</span
            >
            <VIcon class="cursor-pointer" @click="dialogEdit = false">
              mdi-close
            </VIcon>
          </div>
        </VCardTitle>
      </VCardItem>
      <VCardText>
        Có chắc bạn muốn xác nhận đã xử lý yêu cầu của khách hàng
        {{ selectedOrder.CustomerName }} không?
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn variant="tonal" @click="dialogEdit = false"> Đóng </VBtn>
        <VBtn variant="tonal" color="success" @click="handleConfirmOrder">
          Xác nhận
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
