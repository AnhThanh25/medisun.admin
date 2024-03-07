<template>
  <v-card>
    <v-card-title>
      <h6 class="text-h6 px-3 py-2">Nhập thông tin hóa đơn</h6>
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
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="btClose">
        Đóng
      </v-btn>
      <v-btn @click="updateInvoiceInfo"> Lưu thông tin </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { formatDateUpload } from "@/helpers/getTime";
import { UpdateInvoiceInfo } from "@/api/invoice";
export default {
  data() {
    return {
      billInfo: {},
    };
  },
  emits: ["btClose"],
  watch: {},
  methods: {
    btClose() {
      this.$emit("btClose");
    },
    updateInvoiceInfo() {
      if (
        this.billInfo.DocumentID &&
        this.billInfo.CustomerID &&
        this.billInfo.CustomerName &&
        this.billInfo.PostingDate &&
        this.billInfo.CustomerAddress
      ) {
        UpdateInvoiceInfo({
          Data: {
            ...this.billInfo,
            PostingDate:
              formatDateUpload(this.billInfo.PostingDate) + " 00:00:00",
          },
        }).then((res) => {
          notify({
            type: "success",
            title: "Thành công",
            text: "Nhập hóa đơn thành công",
          });
          this.billInfo = {};
          this.btClose();
        });
      } else {
        notify({
          type: "warn",
          title: "Nhắc nhở",
          text: "Vui lòng nhập đầy đủ thông tin",
        });
      }
    },
  },
  created() {},
};
</script>

<style></style>
