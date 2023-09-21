<template>
  <v-col cols="12" lg="6" md="6" :key="updateTopRight">
    <small>Hàm trên phải</small>
    <div class="container-image">
      <div
        class="teeth"
        v-for="(item, index) in teethTopRightLst"
        :key="index"
        @click="btShowTeeth(item)"
      >
        <img
          :src="getImagePath(item.Number)"
          class="teeth-adults"
          :class="item.Selected ? 'select-teeth' : ''"
        />
        <div class="number">{{ item.Number }}</div>
      </div>
    </div>
  </v-col>
  <v-divider :vertical="true"></v-divider>

  <v-col cols="12" lg="6" md="6" :key="updateTopLeft">
    <div style="text-align: right">
      <small>Hàm trên trái</small>
    </div>
    <div class="container-image">
      <div
        class="teeth"
        v-for="(item, index) in teethTopLeftLst"
        :key="index"
        @click="btShowTeeth(item)"
      >
        <img
          :src="getImagePath(item.Number)"
          class="teeth-adults"
          :class="item.Selected ? 'select-teeth' : ''"
        />
        <div class="number">{{ item.Number }}</div>
      </div>
    </div>
  </v-col>
  <v-divider></v-divider>
  <v-col cols="12" lg="6" md="6" :key="updateBottomRight">
    <div class="container-image">
      <div
        class="teeth"
        v-for="(item, index) in teethBottomRightLst"
        :key="index"
        @click="btShowTeeth(item)"
      >
        <div class="number">{{ item.Number }}</div>
        <img
          :src="getImagePath(item.Number)"
          class="teeth-adults"
          :class="item.Selected ? 'select-teeth' : ''"
        />
      </div>
    </div>
    <small>Hàm dưới phải</small>
  </v-col>
  <v-divider :vertical="true"></v-divider>

  <v-col cols="12" lg="6" md="6" :key="updateBottomLeft">
    <div class="container-image">
      <div
        class="teeth"
        v-for="(item, index) in teethBottomLeftLst"
        :key="index"
        @click="btShowTeeth(item)"
      >
        <div class="number">{{ item.Number }}</div>
        <img
          :src="getImagePath(item.Number)"
          class="teeth-adults"
          :class="item.Selected ? 'select-teeth' : ''"
        />
      </div>
    </div>
    <div style="text-align: right">
      <small>Hàm dưới trái</small>
    </div>
  </v-col>
  <v-dialog v-model="isShowTeethInfo" width="800">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">
          Bệnh lý răng số {{ teethInfo.Number }}
        </h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            lg="4"
            md="4"
            sm="6"
            v-for="item in teethMefical"
            :key="item.Text"
            class="checkTeeth"
          >
            <v-checkbox :label="item.Text" v-model="item.CheckBox"></v-checkbox>
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
        <v-btn color="primary" variant="text" @click="btSave"> Lưu </v-btn>
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
} from "./variables-adults";
export default {
  props: {
    teethLst: Array,
  },
  data() {
    return {
      teethTopRightLst: teethTopRightLst,
      teethTopLeftLst: teethTopLeftLst,
      teethBottomLeftLst: teethBottomLeftLst,
      teethBottomRightLst: teethBottomRightLst,
      isShowTeethInfo: false,
      teethInfo: {},
      teethMefical: teethMefical,
      updateTopRight: 0,
      updateTopLeft: 0,
      updateBottomRight: 0,
      updateBottomLeft: 0,
    };
  },
  emits: ["saveReasonTeeth"],
  watch: {
    teethLst() {
      this.checkShowTeeth();
    },
  },
  methods: {
    getImagePath(number) {
      return `/assets/images/teeth/adults/${number}.png`;
    },
    btShowTeeth(data) {
      this.teethInfo = data;
      var lstReason = this.teethLst.filter(
        (p) => p.Teeth == this.teethInfo.Number
      );
      this.teethMefical = teethMefical.map((item) => {
        if (lstReason.find((re) => re.Reason == item.Text)) {
          return {
            ...item,
            CheckBox: true,
          };
        } else {
          return {
            ...item,
            CheckBox: false,
          };
        }
      });
      this.isShowTeethInfo = true;
    },
    btSave() {
      this.isShowTeethInfo = false;
      this.$emit(
        "saveReasonTeeth",
        this.teethInfo.Number,
        this.teethMefical.filter((p) => p.CheckBox)
      );
    },
    checkShowTeeth() {
      this.teethTopRightLst = this.teethTopRightLst.map((item) => {
        return {
          ...item,
          Selected: false,
        };
      });
      this.teethTopLeftLst = this.teethTopLeftLst.map((item) => {
        return {
          ...item,
          Selected: false,
        };
      });
      this.teethBottomLeftLst = this.teethBottomLeftLst.map((item) => {
        return {
          ...item,
          Selected: false,
        };
      });
      this.teethBottomRightLst = this.teethBottomRightLst.map((item) => {
        return {
          ...item,
          Selected: false,
        };
      });
      for (var i = 0; i < this.teethLst.length; i++) {
        var check1 = this.teethTopRightLst.find(
          (p) => this.teethLst[i].Teeth == p.Number
        );
        if (check1) {
          check1.Selected = true;
        }
        var check2 = this.teethTopLeftLst.find(
          (p) => this.teethLst[i].Teeth == p.Number
        );
        if (check2) {
          check2.Selected = true;
        }
        var check3 = this.teethBottomLeftLst.find(
          (p) => this.teethLst[i].Teeth == p.Number
        );
        if (check3) {
          check3.Selected = true;
        }
        var check4 = this.teethBottomRightLst.find(
          (p) => this.teethLst[i].Teeth == p.Number
        );
        if (check4) {
          check4.Selected = true;
        }
      }
    },
  },
  created() {
    this.checkShowTeeth();
  },
};
</script>

<style lang="scss" scoped>
.container-image {
  display: grid;
  grid-template-columns: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
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
</style>
