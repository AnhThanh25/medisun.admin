<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          Danh sách bài viết
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
            <template #item.LinkImage="{ item }">
              <img
                :src="item.selectable.LinkImage"
                alt=""
                style="height: 80px; border-radius: 10px"
              />
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
   <notifications />
</template>

<script scoped>
// import { toCurrency, toNumber } from '@/api/number-format.js'
import { CreatePost, GetPostLst } from "@/api/postApi";
import DateField from "@/components/DateField.vue";
import { useDate } from "@/utils/date.js";

const { formatDate } = useDate();
const { format } = useDate();
import CreatePostForm from "./CreatePost.vue";
export default {
  components: { DateField, CreatePostForm },
  data() {
    return {
      dialogEdit: false,
      search: "",
      timeStart: "",
      timeEnd: "",
      page: 1,
      itemsPerPage: 10,
      headers: [
        { key: "PostID", title: "Mã bài viết", sortable: false },
        { key: "LinkImage", title: "Ảnh", sortable: false, width: 220 },
        { key: "TimeCreate", title: "Ngày tạo", sortable: false, width: 116 },
        { key: "Title", title: "Tiêu đề", sortable: false },
        { key: "SubTitle", title: "Mô tả ngắn", sortable: false },
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

    search() {
      this.debouncedGetOrderList();
    },
  },

  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      GetPostLst({
        PageNumber: this.page,
        RowspPage: this.itemsPerPage,
        Search: this.search,
        Type: "",
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
      // this.dialogEdit = true
      this.selectedOrder = item.item.selectable;
      this.$router.push("/bai-viet/" + this.selectedOrder.PostID);
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
              type: "error",
              title: "Lỗi",
              text: res.RespText,
            });
          }
        }
      );
    },
  },
};
</script>
