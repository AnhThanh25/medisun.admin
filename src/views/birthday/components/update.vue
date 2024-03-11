<template>
  <v-card>
    <v-card-title>
      <h6 class="text-h6 px-3 py-2">
        Câp nhật thông tin hóa đơn - {{ billDocumentID }}
      </h6>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Mã hóa đơn"
            v-model="billInfo.DocumentID"
          ></v-text-field>
          <v-text-field
            label="Mã khách hàng"
            v-model="billInfo.CustomerID"
          ></v-text-field>
          <v-text-field
            label="Địa chỉ"
            v-model="billInfo.CustomerAddress"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-date-field
            v-model:modelValue="billInfo.PostingDate"
            label="Ngày nhập"
            width="100%"
          ></v-date-field>
          <v-text-field
            label="Tên khách hàng"
            v-model="billInfo.CustomerName"
          ></v-text-field>

          <v-text-field label="Ghi chú" v-model="billInfo.Note"></v-text-field>
        </v-col>
      </v-row>
      <v-data-table-server
        no-data-text="Không có dữ liệu"
        :headers="headers"
        :items="billInfo.StampLst"
        sort-asc-icon="mdi-menu-up"
        sort-desc-icon="mdi-menu-down"
        :hide-default-footer="true"
        :disable-pagination="true"
        :items-per-page="-1"
        class="table-pres"
        style="border: none"
        :items-length="0"
      >
        <template v-slot:item.Key="{ item }">
          {{ item.raw.Key }}
          <v-icon
            color="primary"
            size="small"
            class="me-2"
            @click="btShowInfoCustomer(item.raw)"
            >mdi-pencil
          </v-icon>
        </template>
        <template v-slot:item.Action="{ item }">
          <v-icon
            color="error"
            size="small"
            class="me-2"
            @click="removeCustomer(item.raw)"
            >mdi-delete
          </v-icon>
        </template>
      </v-data-table-server>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="btClose">
        Đóng
      </v-btn>
      <v-btn @click="updateInvoiceInfo"> Lưu thông tin </v-btn>
    </v-card-actions>
  </v-card>
  <!-- <v-dialog v-model="isShowCustomer" persistent width="500">
    <v-card height="400">
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Cập nhật khách hàng cá nhân</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="customerInfo.CustomerName"
              label="Tên khách hàng"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <VDatePicker2
              locale="vi"
              v-model="customerInfo.Birthday"
              mode="date"
              :masks="masks"
            >
              <template #default="{ inputValue, inputEvents }">
                <v-text-field
                  v-model="customerInfo.Birthday"
                  :value="inputValue"
                  v-on="inputEvents"
                  label="Sinh nhật"
                  append-inner-icon="mdi-calendar"
                  hide-details
                />
              </template>
            </VDatePicker2>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              label="Số điện thoại"
              v-model="customerInfo.CustomerContact"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              label="Vị trí"
              v-model="customerInfo.Position"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowCustomer = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="addInfoCus"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> -->
</template>

<script>
import { GetInvoiceInfo, UpdateInvoiceInfo } from "@/api/invoice";
import { formatDateDisplayDDMMYY } from "@/helpers/getTime";

export default {
  props: {
    billDocumentID: String,
  },
  data() {
    return {
      headers: [
        { title: "STT", sortable: false, key: "Key", width: 50 },

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
          title: "ĐVT",
          key: "Unit",
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
      ],
      billInfo: {},
    };
  },
  emits: ["btClose"],
  watch: {
    billDocumentID(value) {
      this.getInvoiceInfo();
    },
  },
  methods: {
    btClose() {
      this.$emit("btClose");
    },
    updateInvoiceInfo() {
      UpdateInvoiceInfo({
        Data: this.billInfo,
      }).then((res) => {
        if (res) {
          notify({
            type: "success",
            title: "Thành công",
            text: "Cập nhật hóa đơn thành công",
          });
          this.billInfo = {};
          this.btClose();
        }
      });
    },
    getInvoiceInfo() {
      GetInvoiceInfo({
        ID: this.billDocumentID,
      }).then((res) => {
        if (res) {
          this.billInfo = res.Data;
          this.billInfo.StampLst = this.billInfo.StampLst.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              TimeCreateShow: formatDateDisplayDDMMYY(item.TimeCreate),
              DateExpiredShow: formatDateDisplayDDMMYY(item.DateExpired),
            };
          });
        }
      });
    },
  },
  created() {
    this.getInvoiceInfo();
  },
};
</script>

<style></style>
