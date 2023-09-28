<template>
  <v-card>
    <v-card-title>
      <div style="display: flex; justify-content: space-between">
        <h6 class="text-h6 px-2 py-2">Phiếu đặt vật liệu Labo</h6>
        <div class="mt-2"></div>
        <!-- <v-btn>Chọn PKTQ</v-btn> -->
      </div>
    </v-card-title>
    <v-card-text>
      <v-data-table
        no-data-text="Không có dữ liệu"
        :headers="headers"
        :items="desserts"
        :search="search"
        sort-asc-icon="mdi-menu-up"
        sort-desc-icon="mdi-menu-down"
        :hide-default-footer="true"
        :disable-pagination="true"
        :items-per-page="-1"
        class="table-pres"
        style="border: none"
      >
        <template v-slot:top>
          <v-btn variant="tonal" color="blue" @click="btShowMaterial"
            >Đặt vật liệu</v-btn
          >
          <!-- <v-btn variant="tonal" class="ml-2">Thêm xưởng</v-btn> -->
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="btClose">
        Đóng
      </v-btn>
      <v-btn @click="addAccountClinic"> Lưu thông tin </v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="isShowAddMaterial" width="600">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-2 py-2">Thêm vật liệu đặt hàng</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-autocomplete
              v-model="materialInfo.MaterialID"
              label="Chọn vật liệu đặt"
              :items="materialLst"
              item-title="MaterialName"
              item-value="MaterialID"
            ></v-autocomplete>
            <v-text-field
              label="Số lượng"
              v-model="materialInfo.Quantity"
            ></v-text-field>
            <v-text-field
              label="Giá bán"
              v-model="exPriceFormatted"
            ></v-text-field>

            <v-autocomplete
              v-model="materialInfo.Workshop"
              label="Chọn xưởng đặt vật liệu"
              :items="materialLst"
              item-title="MaterialName"
              item-value="MaterialID"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-autocomplete
              v-model="materialInfo.EmployCare"
              label="Người thực hiện"
              :items="employLst"
              item-title="Title"
              item-value="UserName"
            ></v-autocomplete>
            <v-text-field
              label="Đơn vị"
              v-model="materialInfo.Unit"
            ></v-text-field>
            <v-text-field
              label="Giảm giá"
              v-model="discountFormatted"
            ></v-text-field>
            <v-text-field
              label="Ghi chú"
              hide-details
              v-model="materialInfo.Note"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowAddMaterial = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="btSaveUpdate" v-if="materialInfo.MaterialName">
          Lưu thông tin
        </v-btn>
        <v-btn @click="addMaterial" v-else> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { GetMaterialLst } from "@/api/material";
import { GetEmployLst } from "@/api/user";
import { getRoleText } from "@/utils/role";

export default {
  data() {
    return {
      isShowAddMaterial: false,

      headers: [
        {
          title: "STT",

          sortable: false,
          key: "Key",
        },
        { title: "Thủ thuật", key: "calories", sortable: false },
        { title: "Thực hiện", key: "name", sortable: false },
        { title: "SL", key: "carbs", sortable: false },
        { title: "Đơn giá", key: "protein", sortable: false },
        { title: "Giảm giá", key: "fat", sortable: false },
        { title: "Tổng", key: "fat", sortable: false },
        { title: "", key: "Action", sortable: false },
      ],
      desserts: [],
      search: "",
      materialInfo: {},
      materialLst: [],
      employLst: [],
      exPrice: null,
      discountPrice: null,
    };
  },
  emits: ["close"],
  computed: {
    exPriceFormatted: {
      get: function () {
        return this.formatAsCurrency(this.exPrice, 0);
      },
      set: function (newValue) {
        if (newValue) {
          this.exPrice = Number(newValue?.replace(/[^0-9\.]/g, ""));
        } else {
          this.exPrice = null;
        }
      },
    },
    discountFormatted: {
      get: function () {
        return this.formatAsCurrency(this.discountPrice, 0);
      },
      set: function (newValue) {
        if (newValue) {
          this.discountPrice = Number(newValue?.replace(/[^0-9\.]/g, ""));
        } else {
          this.discountPrice = null;
        }
      },
    },
  },
  methods: {
    btAddMaterial() {
      this.desserts.push({
        ...this.materialInfo,
        ExPrice: this.exPrice,
        MoneyDiscount: this.discountPrice,
      });
    },
    btClose() {
      this.$emit("close", false);
    },
    formatAsCurrency(value, dec) {
      dec = dec || 0;
      if (value === null) {
        return "";
      }
      return (
        "" + value?.toFixed(dec).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
      );
    },
    btShowMaterial() {
      this.isShowAddMaterial = true;
      this.getMaterialLst();
      this.getEmployLst();
    },
    getMaterialLst() {
      GetMaterialLst({
        PageNumber: 1,
        RowspPage: 100000,
        Search: "",
      }).then((res) => {
        if (res) {
          this.materialLst = res.Data;
        }
      });
    },
    getEmployLst() {
      GetEmployLst({
        PageNumber: 1,
        RowspPage: 1000,
        Search: "",
      }).then((res) => {
        if (res) {
          this.employLst = res.Data.map((item) => {
            return {
              ...item,
              Title: item.FullName + " - " + getRoleText(item.Role),
            };
          });
        }
      });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 0 !important;
  border-radius: 4px;
  background: #f7f7f7;
  &:hover {
    background: #03c9d718;
    color: #00b7c4;
    cursor: pointer;
  }
}
.input-custom {
  margin-bottom: -10px;
}
</style>
<style>
.item .v-card-item__prepend {
  width: 40px;
  margin-left: -8px;
}
.input-custom .v-field__outline {
  --v-field-border-opacity: 0;
}
</style>
