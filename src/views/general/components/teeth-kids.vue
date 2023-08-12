<template>
  <v-col cols="12" lg="6" md="6">
    <small>Hàm trên phải</small>
    <div class="container-image grid-right">
      <div></div>
      <div
        class="teeth"
        v-for="(item, index) in teethTopRightLst"
        :key="index"
        @click="btShowTeeth(item)"
      >
        <img
          :src="getImagePath(item.TextImage)"
          class="teeth-adults"
          :class="item.Selected ? 'select-teeth' : ''"
        />
        <div class="number">{{ item.Number }}</div>
      </div>
    </div>
  </v-col>
  <v-divider vertical="true"></v-divider>

  <v-col cols="12" lg="6" md="6">
    <div style="text-align: right">
      <small>Hàm trên trái</small>
    </div>
    <div class="container-image grid-left">
      <div
        class="teeth"
        v-for="(item, index) in teethTopLeftLst"
        :key="index"
        @click="btShowTeeth(item)"
      >
        <img
          :src="getImagePath(item.TextImage)"
          class="teeth-adults"
          :class="item.Selected ? 'select-teeth' : ''"
        />
        <div class="number">{{ item.Number }}</div>
      </div>
    </div>
    <div></div>
  </v-col>
  <v-divider></v-divider>
  <v-col cols="12" lg="6" md="6">
    <div class="container-image grid-right">
      <div></div>
      <div
        class="teeth"
        v-for="(item, index) in teethBottomRightLst"
        :key="index"
        @click="btShowTeeth(item)"
      >
        <div class="number">{{ item.Number }}</div>
        <img
          :src="getImagePath(item.TextImage)"
          class="teeth-adults"
          :class="item.Selected ? 'select-teeth' : ''"
        />
      </div>
    </div>
    <small>Hàm dưới phải</small>
  </v-col>
  <v-divider vertical="true"></v-divider>

  <v-col cols="12" lg="6" md="6">
    <div class="container-image grid-left">
      <div
        class="teeth"
        v-for="(item, index) in teethBottomLeftLst"
        :key="index"
        @click="btShowTeeth(item)"
      >
        <div class="number">{{ item.Number }}</div>
        <img
          :src="getImagePath(item.TextImage)"
          class="teeth-adults"
          :class="item.Selected ? 'select-teeth' : ''"
        />
      </div>
      <div></div>
    </div>
    <div style="text-align: right">
      <small>Hàm dưới trái</small>
    </div>
  </v-col>
  <v-dialog v-model="isShowTeethInfo" width="800">
    <v-card>
      <v-card-title> Bệnh lý răng số {{ teethInfo.Number }} </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            lg="4"
            md="4"
            sm="6"
            v-for="item in teethMefical"
            :key="item"
            class="checkTeeth"
          >
            <v-checkbox :label="item"></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowTeethInfo = false"
        >
          Đóng
        </v-btn>
        <v-btn color="primary" variant="text" @click="isShowTeethInfo = false">
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  teethMefical,
  teethTopRightLst,
  teethTopLeftLst,
  teethBottomLeftLst,
  teethBottomRightLst,
} from "./variables-kids";
export default {
  data() {
    return {
      teethTopRightLst: teethTopRightLst,
      teethTopLeftLst: teethTopLeftLst,
      teethBottomLeftLst: teethBottomLeftLst,
      teethBottomRightLst: teethBottomRightLst,
      isShowTeethInfo: false,
      teethInfo: {},

      teethMefical: teethMefical,
    };
  },
  methods: {
    getImagePath(number) {
      return `/assets/images/teeth/kids/${number}.png`;
    },
    btShowTeeth(data) {
      data.Selected = !data.Selected;
      this.teethInfo = data;
      this.isShowTeethInfo = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-image {
  display: grid;

  text-align: center;
  .teeth-adults {
    cursor: pointer;
    height: 70px;
    border-radius: 4px;
    // background: red;
    padding: 4px;
  }
  .number {
    font-size: 14px;
  }
}
.select-teeth {
  background: red;
}
.grid-right {
  grid-template-columns: auto 12.5% 12.5% 12.5% 12.5% 12.5%;
}
.grid-left {
  grid-template-columns: 12.5% 12.5% 12.5% 12.5% 12.5% auto;
}
</style>
