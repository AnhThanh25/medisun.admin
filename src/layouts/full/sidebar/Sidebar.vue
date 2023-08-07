<script>
// import sidebarItems from "./sidebarItem";
import LogoDark from "../logo/LogoDark.vue";
import { constantRoutes } from "@/router/index";
import { useRoute } from "vue-router";
export default {
  data() {
    return {
      sidebarMenu: [...constantRoutes],
    };
  },
  components: {
    LogoDark,
  },
  methods: {
    isRouteActive(item) {
      return item.path === useRoute().fullPath;
    },
    isRouteActivePath(item) {
      return useRoute().fullPath.includes(item.path);
    },
    isShowItemSidebar(item) {
      if (item.hidden) {
        return false;
      }
      return true;
    },
    singlePathActice(item) {
      if (item.children) {
        if (item.children.filter((p) => p.hidden != true).length == 1) {
          return item.children[0].path;
        }
      } else {
        return item.path;
      }
      return item.path;
    },
  },
};
</script>

<template>
  <div style="height: 100vh">
    <!-- ---------------------------------------------- -->
    <!---Logo part -->
    <!-- ---------------------------------------------- -->
    <div class="pa-4">
      <LogoDark />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div class="scrollnavbar" style="font-size: 16px">
      <!-- <div>{{ item.meta.title }}</div> -->
      <v-list class="pa-4" color="transparent">
        <!-- ---------------------------------------------- -->
        <!---Menu Loop -->
        <!-- ---------------------------------------------- -->
        <template v-for="(item, index) in sidebarMenu" :key="index">
          <!-- ---------------------------------------------- -->
          <!---Single Item-->
          <!-- ---------------------------------------------- -->
          <div v-if="isShowItemSidebar(item)" class="subSidebar">
            <v-list-group
              class="v-list-group__header"
              v-if="item.children && item.children.length > 1"
            >
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" style="margin-bottom:4px">
                  <template v-slot:prepend>
                    <v-icon
                      class="feather-sm v-icon v-icon--size-default"
                      v-if="item.meta.icon"
                      style="font-size: 20px"
                      >{{ item.meta.icon }}</v-icon
                    >
                  </template>
                  <v-list-item-title
                    class="v-list-item__content"
                    style="font-size: 14px; width: 100%; font-weight: 500"
                    v-text="item.meta.title"
                  ></v-list-item-title>
                </v-list-item>
              </template>
              <!-- </v-list-item> -->
              <!-- <div class="item-custom"> -->
              <v-list-item
                :to="child.path"
                rounded="lg"
                class="mb-1 "
                v-for="(child, i) in item.children"
                :key="i"
                :active="isRouteActive(child)"
              >
                <template v-slot:prepend>
                  <v-icon
                    class="feather-sm v-icon v-icon--size-default"
                    style="font-size: 14px; margin-left: 10px"
                    >mdi-crosshairs-gps</v-icon
                  >
                </template>
                <v-list-item-title
                  class="v-list-item__content"
                  style="font-size: 14px; width: 100%"
                  >{{ child.meta.title }}</v-list-item-title
                >
              </v-list-item>
              <!-- </div> -->
            </v-list-group>
            <v-list-item
              :to="singlePathActice(item)"
              rounded="lg"
              class="mb-1"
              v-else
            >
              <template v-slot:prepend>
                <v-icon
                  class="feather-sm v-icon v-icon--size-default"
                  style="font-size: 20px"
                  v-if="item.meta.icon"
                  >{{ item.meta.icon }}</v-icon
                >
              </template>
              <v-list-item-title
                class="v-list-item__content"
                style="font-size: 14px; width: 100%; font-weight: 500"
                >{{ item.meta.title }}</v-list-item-title
              >
            </v-list-item>
          </div>
        </template>
      </v-list>
    </div>
    <!-- <div class="pa-4 ma-4 bg-light-primary rounded-lg text-center">
      <img src="@/assets/images/sidebar-buynow-bg.svg" />
      <h4 class="font-weight-regular mb-3">Get Template for Free</h4>
      <v-btn class="mb-2" href="https://www.wrappixel.com/templates/flexy-vuejs-admin-free/" block>Download Free</v-btn>
      <v-btn
        color="info"
        href="https://www.wrappixel.com/templates/flexy-vuetify-dashboard/"
        block
        >Check Pro</v-btn
      >
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
.scrollnavbar {
  height: calc(100vh - 77px);
  overflow-y: auto;
  &::-webkit-scrollbar-track-piece {
    background: #ffffff;
    padding-right: 2px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 20px;
  }
}
</style>
