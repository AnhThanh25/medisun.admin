<template>
  <div class="container">
    <div class="top">
      <v-row>
        <v-col cols="8" sm="8">
          <v-text-field
            v-model="search"
            label="Tìm kiếm"
            class=""
            variant="outlined"
            hide-details
            density="compact"
            style="width: 300px !important"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <v-col cols="4" sm="4">
          <v-row>
            <v-col cols="6" sm="6">
              <v-btn>Lịch hẹn: 10</v-btn>
            </v-col>
            <v-col cols="6" sm="6">
              <v-btn color="secondary">Tái khám: 10</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col cols="8" sm="8">
        <Now
          :title="'Đang khám (' + nowLst.length + ')'"
          :type="1"
          :data="nowLst"
          @reloadData="reloadData"
        />
        <Now
          :title="'Đang chờ (' + waitingLst.length + ')'"
          :type="2"
          :data="waitingLst"
          @reloadData="reloadData"
        />
        <Now
          :title="'Khám xong (' + finishedLst.length + ')'"
          :type="3"
          :data="finishedLst"
          @reloadData="reloadData"
        />
         <Now
          :title="'Hủy khám (' + cancelLst.length + ')'"
          :type="4"
          :data="cancelLst"
          @reloadData="reloadData"
        />
      </v-col>
      <v-col cols="4" sm="4">
        <OrderCalendar />
        <History />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Now from "./components/now.vue";
import OrderCalendar from "./components/appointment.vue";
import History from "./components/history.vue";
import { GetDashHomeLst, AddDashHomeLst } from "@/api/dashHome";
import { formatDateUpload } from "@/helpers/getTime";
export default {
  components: {
    Now,
    OrderCalendar,
    History,
  },
  data() {
    return {
      timeGet: new Date(),
      finishedLst: [],
      waitingLst: [],
      nowLst: [],
      cancelLst:[]
    };
  },
  methods: {
    reloadData() {
      this.getDashHomeLst();
    },
    getDashHomeLst() {
      GetDashHomeLst({
        TimeGet: formatDateUpload(this.timeGet) + " 00:00:00",
      }).then((res) => {
        if (res) {
          this.finishedLst = res.Data.filter((p) => p.Status == 3);
          this.nowLst = res.Data.filter((p) => p.Status == 2);
          this.waitingLst = res.Data.filter((p) => p.Status == 1);
          this.cancelLst = res.Data.filter((p) => p.Status == 0);
        }
      });
    },
  },
  created() {
    this.getDashHomeLst();
  },
};
</script>

<style lang="scss" scoped>
.container {
  // background: red;
  margin: auto;
  max-width: 1400px;
  .top {
    background: #fff;
    padding: 16px;
    margin-bottom: 12px;
    border-radius: 7px;
    margin-top: -16px;
    box-shadow: #919eab4d 0 0 2px, #919eab1f 0 12px 24px -4px !important;
  }
}
</style>
