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
        <Now :title="'Đang khám (8)'" :type="1" />
        <Now :title="'Đang chờ (6)'" :type="2" />
        <Now :title="'Khám xong (10)'" :type="3" />
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
import OrderCalendar from "./components/order-calendar.vue";
import History from "./components/history.vue";
export default {
  components: {
    Now,
    OrderCalendar,
    History,
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
    box-shadow: #919eab4d 0 0 2px,#919eab1f 0 12px 24px -4px!important;
  }
}
</style>
