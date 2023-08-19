<template>
  <v-card style="margin-bottom: 12px">
    <v-card-text class="pa-4">
      <div class="d-sm-flex align-center mb-2">
        <div>
          <h3 class="text-h6 title font-weight-medium">{{ title }}</h3>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <div class="d-flex align-center">
            <!-- <div class="d-flex align-center px-2">
              <span class="text-primary">
                <span class="text-overline">
                  <i class="mdi mdi-brightness-1 mx-1"></i>
                </span>
                <span class="font-weight-regular">Ample</span>
              </span>
            </div> -->
            <div class="d-flex align-center px-2">
              <span class="text-secondary">
                <!-- <span class="text-overline">
                  <i class="mdi mdi-brightness-1 mx-1"></i>
                </span> -->
                <!-- <span class="font-weight-regular">Xem tất cả >> </span> -->
                <v-icon icon="mdi-dots-horizontal icon"></v-icon>
              </span>
            </div>
          </div>
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
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
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

<style lang="scss" scoped>
// .row-now {
//   display: flex;
//   overflow-x: scroll;
//   &::-webkit-scrollbar-track-piece {
//     background: #ffffff;
//     padding-right: 2px;
//   }

//   &::-webkit-scrollbar {
//     width: 6px;
//     height: 6px;
//   }

//   &::-webkit-scrollbar-thumb {
//     background: #c6c6c7;
//     border-radius: 20px;
//   }
// }
</style>
