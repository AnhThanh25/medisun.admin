<template>
  <v-card height="420px">
    <v-card-title>
      <h6 class="text-h6 px-2 py-2">
        Chi tiết tích điểm - {{ placeID.PlaceID }} - {{ placeID.PlaceName }}
      </h6>
    </v-card-title>
    <v-card-text>
      <v-timeline side="end" align="start" v-if="rankLst.length > 0">
        <v-timeline-item
          :dot-color="item.Status == 1 ? 'success' : 'pink'"
          size="small"
          v-for="(item, index) in rankLst"
          :key="index"
        >
          <template v-slot:opposite>
            <strong>Tháng {{ item.Month }} - {{ item.Year }}</strong>
          </template>
          <div class="d-flex">
            <strong class="me-4">{{ item.Point }} Điểm</strong>
            <div>
              <strong
                >{{ new Intl.NumberFormat().format(item.Amount) }} đ</strong
              >
              <div class="text-caption">
                Hạng: {{ item.Ranking }} - Hạng max: {{ item.RankMax }}
              </div>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
      <div v-else class="text-center text-red">
        <strong>Không có thông tin tích điểm</strong>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="btClose">
        Đóng
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { GetRankInfoLst } from "@/api/crm";

export default {
  props: {
    placeID: String,
  },
  data() {
    return {
      rankLst: {},
    };
  },
  emits: ["btClose"],
  watch: {
    "placeID.PlaceID"() {
      this.getRankInfoLst();
    },
  },
  methods: {
    btClose() {
      this.$emit("btClose");
    },
    getRankInfoLst() {
      GetRankInfoLst({
        PlaceID: this.placeID.PlaceID,
        PageNumber: 1,
        RowspPage: 1000,
      }).then((res) => {
        this.rankLst = res.Data;
      });
    },
  },
  created() {
    this.getRankInfoLst();
  },
};
</script>

<style></style>
