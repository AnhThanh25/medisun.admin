<template>
  <v-card>
    <v-card-title>
      <h6 class="text-h6 px-3 py-2">Thêm phiếu nhập kho</h6>
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Quét / Nhập mã tem"
        v-model="qrcodeImport"
        prepend-inner-icon="mdi-qrcode"
        clearable
      ></v-text-field>
      <v-data-table-server
        no-data-text="Không có dữ liệu"
        :headers="headers"
        :items="dataStampLst"
        sort-asc-icon="mdi-menu-up"
        sort-desc-icon="mdi-menu-down"
        :hide-default-footer="true"
        :disable-pagination="true"
        :items-per-page="-1"
        class="table-pres"
        style="border: none"
        :loading="loading"
      >
        <template v-slot:item.Key="{ item }">
          {{ item.raw.Key }}
          <v-icon
            color="error"
            size="small"
            class="me-2"
            @click="removeCustomer(item.raw)"
            >mdi-delete
          </v-icon>
        </template>
        <template v-slot:item.Action="{ item }"> </template>
      </v-data-table-server>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="btClose">
        Đóng
      </v-btn>
      <v-btn @click="createLocalStoreIn"> Lưu thông tin </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { GetPlaceByID, UpdatePlaceByID } from "@/api/crm";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict,
} from "@/api/default";
import { getToken } from "@/utils/auth";
import { GetStampProduct, CreateLocalStoreIn } from "@/api/import";
import { formatDateDisplayDDMMYY, formatDateUpload } from "@/helpers/getTime";
export default {
  data() {
    return {
      headers: [
        { title: "STT", sortable: false, key: "Key", width: 90 },
        { title: "Mã", key: "StampID", sortable: false },
        {
          title: "Sản phẩm",
          key: "ProductName",
          sortable: false,
          align: "center",
        },
        { title: "Lô", key: "LotCode", sortable: false, align: "center" },
        {
          title: "Hạn",
          key: "DateExpiredShow",
          sortable: false,
          align: "center",
        },
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
          title: "Ghi chú",
          key: "Note",
          sortable: false,
          align: "center",
        },
      ],
      qrcodeImport: "",
      dataStampLst: [],
      loading: false,
    };
  },
  emits: ["btClose"],
  watch: {
    qrcodeImport(value) {
      if (value.length == 12) {
        this.getStampProduct(value);
      }
    },
  },
  methods: {
    getStampProduct(data) {
      this.loading = true;
      GetStampProduct({
        StampID: data,
      }).then((res) => {
        this.loading = false;

        if (res.RespCode == 0) {
          var checkExist = this.dataStampLst.findIndex(
            (p) => p.StampID == res.Data.StampID
          );
          if (checkExist == -1) {
            this.dataStampLst.push({
              ...res.Data,
              DateExpiredShow: formatDateDisplayDDMMYY(res.Data.DateExpired),
            });
            this.dataStampLst = this.dataStampLst.map((item, index) => {
              return {
                ...item,
                Key: index + 1,
              };
            });
            this.qrcodeImport = "";
          } else {
            notify({
              type: "warn",
              title: "Nhắc nhở",
              text: "Tem đã tồn tại trong phiếu",
            });
            this.qrcodeImport = "";
          }
        } else {
          notify({
            type: "warn",
            title: "Nhắc nhở",
            text: res.RespText,
          });
          this.qrcodeImport = "";
        }
      });
    },
    createLocalStoreIn() {
      CreateLocalStoreIn({
        Data: this.dataStampLst,
      }).then((res) => {
        if (res.RespCode == 0) {
          notify({
            type: "success",
            title: "Thành công",
            text: "Tạo phiếu nhập kho thành công",
          });
          this.btClose();
        }
      });
    },
    btClose() {
      this.$emit("btClose");
    },
  },
  created() {},
};
</script>

<style></style>
