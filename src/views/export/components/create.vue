<template>
  <v-card>
    <v-card-title>
      <h6 class="text-h6 px-3 py-2">Đóng kiện</h6>
    </v-card-title>
    <v-card-text>
      <v-card-text> Số kiện: {{ billInfo.DocumentID }}</v-card-text>
      <v-card-text>
        Khách hàng: [{{ billInfo.CustomerID }}] -
        {{ billInfo.CustomerName }}</v-card-text
      >
      <v-card-text> Địa chỉ: {{ billInfo.CustomerAddress }}</v-card-text>
      <v-card-text> Ghi chú: {{ billInfo.Note }}</v-card-text>

      <div>
        <v-text-field
          label="Quét | Nhập mã tem"
          v-model="qrcodeScan"
          prepend-inner-icon="mdi-qrcode"
          clearable
        ></v-text-field>

        <v-data-table-server
          no-data-text="Không có dữ liệu"
          :headers="headers"
          :items="exportLst"
          sort-asc-icon="mdi-menu-up"
          sort-desc-icon="mdi-menu-down"
          :hide-default-footer="true"
          :disable-pagination="true"
          :items-per-page="-1"
          class="table-pres"
          style="border: none"
          :itemsLength="0"
        >
          <template v-slot:item.Key="{ item }">
            {{ item.raw.Key }}
            <v-icon
              color="error"
              size="small"
              class="me-2"
              @click="removeStamp(item.raw)"
              >mdi-delete
            </v-icon>
          </template>
          <template v-slot:item.TotalNumberBox="{ item }">
            <v-chip color="secondary">
              {{ item.raw.TotalNumberBox }} Hộp</v-chip
            >
          </template>
        </v-data-table-server>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="btClose">
        Đóng
      </v-btn>
      <v-btn @click="updateLocalStoreOutLst"> Lưu thông tin </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { formatDateDisplayDDMMYY, formatDateUpload } from "@/helpers/getTime";
import { GetStampExportByID, CreateLocalStoreOutLst } from "@/api/export";
export default {
  props: {
    billInfo: Object,
  },
  data() {
    return {
      placeInfo: {},
      headers: [
        { title: "STT", sortable: false, key: "Key", width: 50 },

        { title: "Mã tem", key: "StampID", sortable: false },
        { title: "Sản phẩm", key: "ProductName", sortable: false },
        { title: "Số lô", key: "LotCode", sortable: false, align: "center" },
        {
          title: "Số lượng",
          key: "TotalQuantity",
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
          title: "Hộp",
          key: "TotalNumberBox",
          sortable: false,
          align: "center",
        },
      ],
      qrcodeScan: "",
      exportLst: [],
      debounceTimer: null,

    };
  },
  emits: ["btClose"],
  watch: {
    qrcodeScan(value) {
      clearTimeout(this.debounceTimer);
      // Gọi debounce mới với giá trị của mã barcode
      this.debounceTimer = setTimeout(() => {
        if (value && value.length >= 12) {
          this.getStampExportByID(value);
        }
      }, 300);
    },
  },
  methods: {
    removeStamp(data) {
      this.exportLst = this.exportLst.filter((p) => p.Key != data.Key);
      this.exportLst = this.exportLst.map((item, index) => {
        return {
          ...item,
          Key: index + 1,
        };
      });
    },
    updateLocalStoreOutLst() {
      if (this.exportLst.length > 0) {
        console.log("export", this.exportLst);
        CreateLocalStoreOutLst({
          Data: this.exportLst.map((item) => {
            return {
              ...item,
              Quantity: item.TotalQuantity,
              NumberBox: item.TotalNumberBox,
              ItemLst: item.ItemLength ? item.ItemLength.join(";") : "",
            };
          }),
        }).then((res) => {
          if (res) {
            notify({
              type: "success",
              title: "Thành công",
              text: "Tạo kiện thành công",
            });
            this.btClose();
          }
        });
      } else {
        notify({
          type: "warn",
          title: "Nhắc nhở",
          text: "Chưa có tem nào trong kiện",
        });
      }
    },
    getStampExportByID(data) {
      GetStampExportByID({
        StampID: data,
      }).then((res) => {
        if (res.RespCode == 0) {
          var checkExist = this.exportLst.findIndex(
            (p) => p.StampID == res.Data.StampID
          );
          if (checkExist == -1) {
            this.exportLst.push({
              ...res.Data,
              DocumentID: this.billInfo.DocumentID,
              ItemLength: [res.Data.ItemLst],
            });
            this.exportLst = this.exportLst.map((item, index) => {
              return {
                ...item,
                Key: index + 1,
                DateExpiredShow: formatDateDisplayDDMMYY(item.DateExpired),
                TotalNumberBox: item.NumberBox ?? 0,
                TotalQuantity: item.Quantity ?? 0,
              };
            });
        
            this.qrcodeScan = "";
          } else {
            if (res.Data.NumberBox == 1) {
              var checkStampExist = this.exportLst[
                checkExist
              ].ItemLength.findIndex((p) => p == res.Data.ItemLst);
              if (checkStampExist == -1) {
                this.exportLst[checkExist].TotalNumberBox += res.Data.NumberBox;
                this.exportLst[checkExist].TotalQuantity += res.Data.Quantity;
                this.exportLst[checkExist].ItemLength.push(res.Data.ItemLst);
                this.qrcodeScan = "";
              } else {
                notify({
                  type: "warn",
                  title: "Nhắc nhở",
                  text: "Tem đã tồn tại trong phiếu",
                });
                this.qrcodeScan = "";
              }
            } else {
              notify({
                type: "warn",
                title: "Nhắc nhở",
                text: "Tem đã tồn tại trong phiếu",
              });
              this.qrcodeScan = "";
            }
          }
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
