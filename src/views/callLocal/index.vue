<template>
  <v-card>
    <v-card-title></v-card-title>
  </v-card>
</template>

<script>
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
  },
  created() {},
};
</script>

<style>
.callLocal .v-data-table-footer {
  display: none;
}
</style>
