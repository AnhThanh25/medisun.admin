<template>
  <v-card style="margin-bottom: 12px">
    <v-card-text class="pa-4">
      <div class="d-sm-flex align-center mb-2">
        <div>
          <h6 class="text-h6 px-1 pt-3">{{ title }}</h6>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-btn class="mt-3" variant="text" icon="mdi-dots-horizontal" size="x-small"></v-btn>
        </div>
      </div>

      <swiper
        :slides-per-view="4"
        :space-between="8"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="i in 10" :key="i"><ItemBox :type="type"/></swiper-slide>
      </swiper>
    </v-card-text>
  </v-card>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import ItemBox from "./item.vue";

export default {
  props: {
    title: String,
    type: Number
  },
  components: {
    Swiper,
    SwiperSlide,
    ItemBox,
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
  },
};
</script>
<style scoped>

</style>

