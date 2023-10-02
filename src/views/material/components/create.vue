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
      <v-row>
        <v-col cols="6">
          <v-autocomplete
            v-model="patientID"
            label="Khách hàng"
            :items="patientLst"
            item-title="PatientName"
            item-value="PatientID"
            @update:search="btFilter"
            hide-no-data
          ></v-autocomplete>
        </v-col>
        <v-col cols="6">
          <v-autocomplete
            v-model="employCare"
            label="Người thực hiện"
            :items="employLst"
            item-title="Title"
            item-value="UserName"
            hide-details
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field label="Ghi chú" v-model="note"></v-text-field>
        </v-col>
      </v-row>

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
            >Thêm vật liệu đặt hàng</v-btn
          >
        </template>
        <template v-slot:item.Total="{ item }">
          {{ new Intl.NumberFormat().format(item.raw.Total) }}
        </template>
        <template v-slot:item.ExPrice="{ item }">
          {{ new Intl.NumberFormat().format(item.raw.ExPrice) }}
        </template>
        <template v-slot:item.MoneyDiscount="{ item }">
          {{ new Intl.NumberFormat().format(item.raw.MoneyDiscount) }}
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="btClose">
        Đóng
      </v-btn>
      <v-btn @click="addOrderMaterial"> Lưu thông tin </v-btn>
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
              :items="workShopLst"
              item-title="Value"
              item-value="Value"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" sm="6" md="6">
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
        <!-- <v-btn @click="btSaveUpdate" v-if="materialInfo.MaterialID">
          Lưu thông tin
        </v-btn> -->
        <v-btn @click="btAddMaterial"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { GetMaterialLst, AddOrderMaterial } from "@/api/material";
import { GetEmployLst } from "@/api/user";
import { getRoleText } from "@/utils/role";
import { GetDefaultValue } from "@/api/default";
import { GetPatientLst } from "@/api/patient";

export default {
  props: {
    dataUpdate: Object,
  },
  data() {
    return {
      isShowAddMaterial: false,
      headers: [
        { title: "STT", sortable: false, key: "Key" },
        { title: "Vật liệu", key: "MaterialName", sortable: false },
        { title: "SL", key: "Quantity", sortable: false },
        { title: "Giá", key: "ExPrice", sortable: false },
        { title: "Giảm giá", key: "MoneyDiscount", sortable: false },
        { title: "Tổng", key: "Total", sortable: false },
        { title: "", key: "Action", sortable: false },
      ],
      desserts: [],
      search: "",
      materialInfo: {},
      materialLst: [],
      employLst: [],
      exPrice: null,
      discountPrice: null,
      workShopLst: [],
      searchPatient: "",
      patientLst: [],
      patientID: "",
      employCare: "",
      note: "",
    };
  },
  emits: ["close", "success"],
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
  watch: {
    "materialInfo.MaterialID"(newValue) {
      this.materialInfo.Unit = this.materialLst.find(
        (p) => p.MaterialID == newValue
      ).Unit;
      this.materialInfo.MaterialName = this.materialLst.find(
        (p) => p.MaterialID == newValue
      ).MaterialName;
      this.exPriceFormatted = this.materialLst
        .find((p) => p.MaterialID == newValue)
        .ExPrice.toString();
    },
  },
  methods: {
    addOrderMaterial() {
      AddOrderMaterial({
        Data: {
          OrderMaterialID: this.dataUpdate.OrderMaterialID,
          PatientID: this.patientID,
          EmployCare: this.employCare,
          Note: this.note,
          Data: this.desserts,
        },
      }).then((res) => {
        if (res) {
          this.$emit("success");
        }
      });
    },
    btFilter(value) {
      this.getPatientLst(value);
    },
    getPatientLst(search) {
      GetPatientLst({
        PageNumber: 1,
        RowspPage: 10,
        Search: search,
      }).then((res) => {
        if (res) {
          this.patientLst = res.Data.map((item) => {
            return {
              ...item,
              Title: item.PatientName + " - " + item.Phone,
            };
          });
        }
      });
    },
    getDefaultValue() {
      GetDefaultValue({ Table: "Xưởng" }).then((res) => {
        if (res) {
          this.workShopLst = res.Data;
        }
      });
    },
    btAddMaterial() {
      this.desserts.push({
        ...this.materialInfo,
        ExPrice: this.exPrice,
        MoneyDiscount: this.discountPrice,
        Total:
          this.exPrice * parseInt(this.materialInfo.Quantity) -
          this.discountPrice,
      });
      this.desserts = this.desserts.map((item, index) => {
        return {
          ...item,
          Key: index + 1,
        };
      });
      this.isShowAddMaterial = false;
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
      this.getDefaultValue();
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
  created() {
    this.getPatientLst("");
    this.getEmployLst();
    if (this.dataUpdate.OrderMaterialID) {
      this.patientID = this.dataUpdate.PatientID;
      this.employCare = this.dataUpdate.EmployCare;
      this.note = this.dataUpdate.Note;
      this.desserts = this.dataUpdate.Data.map((item, index) => {
        return {
          ...item,
          Key: index + 1,
          Total: item.Quantity * item.ExPrice - item.MoneyDiscount,
        };
      });
    }
  },
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
