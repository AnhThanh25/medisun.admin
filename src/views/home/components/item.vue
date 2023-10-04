<template>
  <div class="item">
    <div class="line" :class="'line-color' + type">{{ object.PatientID }}</div>
    <div class="top">
      <img src="/assets/images/products/1.jpg" alt="" class="img" />
      <div class="right">
        <div class="name">{{ object.PatientName }}</div>
        <div class="phone">{{ object.Phone }}</div>
      </div>
    </div>
    <div class="bt" v-if="object.Status != 1">
      <v-btn
        icon="mdi-clipboard-text"
        size="x-small"
        variant="tonal"
        class="ml-1"
        :color="
          object.Status == 2 ? 'error' : object.Status == 3 ? 'success' : 'more'
        "
        @click="btUpdateDash(object.RowID, 1)"
      ></v-btn>
      <v-btn
        icon="mdi-clipboard-plus"
        size="x-small"
        variant="tonal"
        class="ml-1"
        :color="
          object.Status == 2 ? 'error' : object.Status == 3 ? 'success' : 'more'
        "
        @click="btUpdateDash(object.RowID, 2)"
      ></v-btn>
      <v-btn
        icon="mdi-folder"
        size="x-small"
        variant="tonal"
        class="ml-1"
        :color="
          object.Status == 2 ? 'error' : object.Status == 3 ? 'success' : 'more'
        "
      ></v-btn>

      <v-menu transition="scale-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-dots-horizontal"
            size="x-small"
            variant="tonal"
            class="ml-1"
            :color="
              object.Status == 2
                ? 'error'
                : object.Status == 3
                ? 'success'
                : 'more'
            "
            v-bind="props"
          ></v-btn>
        </template>
        <v-card width="110" class="mx-auto bg-secondary item-menu">
          <v-list>
            <v-list-item
              v-for="(n, index) in optionDot"
              :key="index"
              link
              @click="btUpdateDash(object.RowID, n.Value)"
            >
              <v-list-item-title>{{ n.Title }}</v-list-item-title>
            </v-list-item>
          </v-list></v-card
        >
      </v-menu>
    </div>
    <div class="bt-wait" v-else>
      <v-btn size="small" variant="tonal" @click="btUpdateDash(object.RowID, 3)"
        >Vào khám</v-btn
      >
      <v-btn
        icon="mdi-folder"
        size="small"
        variant="tonal"
        class="ml-1"
        style="height: 28px"
      ></v-btn>
      <!-- <v-icon icon="mdi-folder icon"></v-icon> -->
    </div>
    <div class="bottom" :class="'color' + type" v-if="object.DentistName">
      <div>
        <span style="color: #64748b">Bác sĩ:</span> {{ object.DentistName }}
      </div>
    </div>
  </div>
</template>

<script>
import { UpdateDashHomeLst } from "@/api/dashHome";
export default {
  props: {
    type: Number,
    object: Object,
  },
  data() {
    return {
      optionDot: [
        { Title: "Khám xong", Value: 4 },
        { Title: "Hủy khám", Value: 0 },
      ],
    };
  },
  emits: ["reloadData"],
  methods: {
    btUpdateDash(rowid, type) {
      UpdateDashHomeLst({
        RowID: rowid,
        Type: type,
      }).then((res) => {
        if (res) {
          if (type == 0 || type == 3 || type == 4) {
            this.$emit("reloadData");
          }
          if (type == 1) {
            this.$router.push(
              "/kham-benh/cap-nhat-phieu-tong-quat/" + res.CodeID
            );
          }
          if (type == 2) {
            this.$router.push("/kham-benh/cap-nhat-phieu-kham/" + res.CodeID);
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  background: #f2f5f8;
  padding: 8px;
  padding-bottom: 8px;
  width: calc(100% - 12px);
  //   margin-right: 24px;
  border-radius: 8px;
  position: relative;
  height: 100% !important;
  .line {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 22px;

    border-radius: 8px 8px 0 0;
    padding-left: 8px;
    padding-top: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #f2f5f8;
  }

  .top {
    display: flex;
    padding-top: 30px;
    .img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    .right {
      margin-left: 8px;
      .name {
        font-weight: 600;
        font-size: 14px;
      }
      .phone {
        font-size: 12px;
      }
    }
  }
  .bt-wait {
    display: grid;
    grid-template-columns: 78% 20%;
    padding-top: 10px;
    padding-bottom: 5px;
    .icon {
      margin: auto;
      color: #64748b;
      font-size: 24px;
      cursor: pointer;
      &:hover {
        color: rgb(var(--v-theme-primary));
      }
    }
  }
  .bt {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 8px;
    .icon {
      margin: auto;
      color: #64748b;
      cursor: pointer;
      &:hover {
        color: rgb(var(--v-theme-secondary));
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin-top: 4px;
    font-weight: bold;
    // color: rgb(var(--v-theme-accent));
  }
}
.line-color1 {
  background: rgb(var(--v-theme-error));
}
.line-color2 {
  background: rgb(var(--v-theme-primary));
}
.line-color3 {
  background: rgb(var(--v-theme-success));
}
.line-color4 {
  background: rgb(var(--v-theme-more));
}
.color1 {
  color: rgb(var(--v-theme-error));
}
.color2 {
  color: rgb(var(--v-theme-primary));
}
.color3 {
  color: rgb(var(--v-theme-success));
}
.color4 {
  color: rgb(var(--v-theme-more));
}
</style>
