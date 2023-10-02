<template>
  <v-card>
    <v-card-text class="pb-0">
      <div class="d-sm-flex align-center">
        <div>
          <h3 class="text-h6 pt-3">Nhật ký hoạt động</h3>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-btn
            class="mt-3"
            variant="text"
            icon="mdi-dots-horizontal"
            size="x-small"
          ></v-btn>
        </div>
      </div>
    </v-card-text>
    <v-list>
      <v-list-item v-for="(item, index) in dataLogLst" :key="index" >
        <div class="item">
          <div class="icon">
            <v-icon icon="mdi-check"></v-icon>
          </div>
          <div class="text">
            <div class="title">{{ item.FullName }} {{ item.Feature }}</div>
            <div class="time">{{ item.TimeCreate }}</div>
          </div>
        </div>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { GetLogLst } from "@/api/log";
import { formatDateDisplay } from "@/helpers/getTime";
export default {
  data() {
    return {
      dataLogLst: [],
      pageNumber: 1,
      rowspPage: 5,
      search: "",
    };
  },
  methods: {
    getLogLst() {
      GetLogLst({
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: this.search,
      }).then((res) => {
        this.dataLogLst = res.Data.map((item, index) => {
          return {
            ...item,
            TimeCreate: formatDateDisplay(item.TimeCreate),
          };
        });
      });
    },
  },
  created() {
    this.getLogLst();
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  // margin-top: 12px;
  .icon {
    font-size: 16px;
    background: rgb(var(--v-theme-success), 0.1);
    color: rgb(var(--v-theme-success));
    padding: 8px;
    width: 40px;
    height: 42px;
    border-radius: 8px;
  }
  .text {
    margin-left: 16px;
    margin-bottom: 12px;
    .title {
      font-size: 14px;
      font-weight: 600;
      margin-top: -4px;
    }
    .time {
      font-size: 12px;
    }
  }
}
</style>
