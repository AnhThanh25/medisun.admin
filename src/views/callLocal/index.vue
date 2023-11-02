<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-data-table-server
      no-data-text="Không có dữ liệu"
      :headers="headers"
      :items="desserts"
      items-per-page-text=""
      sort-asc-icon="mdi-menu-up"
      sort-desc-icon="mdi-menu-down"
      height="calc(100vh - 116px)"
      :loading="loadding"
      fixed-header
      :hide-default-footer="true"
      class="callLocal"
    >
      <template v-slot:top>
        <div class="d-flex flex-wrap gap-2">
          <span>
            <v-select
              v-model="regionNow"
              :items="regionLst"
              label="Miền"
              item-title="text"
              item-value="value"
              style="width: 140px !important"
              hide-details
            ></v-select>
          </span>
          <span>
            <v-select
              v-model="yearNow"
              :items="yearLst"
              label="Tháng"
              item-title="text"
              item-value="value"
              class="ml-1"
              style="width: 140px !important"
              hide-details
            ></v-select>
          </span>
          <span>
            <v-select
              v-model="monthNow"
              :items="monthLst"
              label="Tháng"
              item-title="text"
              item-value="value"
              class="ml-1"
              style="width: 140px !important"
              hide-details
            ></v-select>
          </span>

          <v-btn
            color="info"
            variant="tonal"
            icon="mdi-magnify"
            style="height: 42px"
            @click="getCallLocalLst"
          ></v-btn>
        </div>
      </template>
      <template v-slot:item.Key="{ item }">
        {{ item.raw.Key }}
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script>
import { GetCallLocalLst } from "@/api/callLocal";
import { monthLst, regionLst, yearLst } from "@/utils/variable";
export default {
  data() {
    return {
      headers: [],
      desserts: [],
      loadding: false,
      monthLst: monthLst,
      monthNow: new Date().getMonth() + 1,
      regionNow: "MB",
      regionLst: regionLst,
      yearLst: yearLst,
      yearNow: new Date().getFullYear(),
    };
  },
  methods: {
    showBorder(item) {
      if (item.name === "Eclair") {
        return { borderLeft: "thick solid hsl(0, 100%, 50%)" };
      }
    },
    getCallLocalLst() {
      this.loadding = true;
      GetCallLocalLst({
        Year: this.yearNow,
        Month: this.monthNow,
        Region: this.regionNow,
      }).then((res) => {
        if (res) {
          var listCity = res.Data.map((item) => {
            var total = res.Data.filter((p) => p.City == item.City).reduce(
              (a, b) => {
                return a + b.EmployeeCount;
              },
              0
            );
            return {
              title: item.City + "(" + total + ")",
              key: item.City,
              sortable: false,
              width: 100,
              align: "center",
            };
          }).filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.title === value.title)
          );
          this.headers = [
            {
              title: "STT",
              sortable: false,
              key: "Key",
              width: 40,
              align: "center",
              fixed: true,
            },
            {
              title: "Tên NV",
              sortable: false,
              key: "EmployeeName",
              width: 140,
              fixed: true,
            },
          ].concat(listCity);
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              [item.City]: item.EmployeeCount,
              Key: index + 1,
            };
          });
        }
        this.loadding = false;
      });
    },
  },
  created() {
    this.getCallLocalLst();
  },
};
</script>

<style>
.callLocal .v-data-table-footer {
  display: none;
}
</style>
