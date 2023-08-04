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
          <div v-if="isShowItemSidebar(item)">
            <v-list-item-group
              v-if="item.children.length > 1"
              class="v-list-group__header"
            >
              <v-list-item
                rounded="lg"
                class="mb-1"
                @click="
                  () => {
                    if (item.childrens) {
                      item.childrens = null;
                    } else {
                      item.childrens = item.children;
                    }
                  }
                "
                :active="isRouteActivePath(item)"
              >
                <v-list-item-avatar start class="v-list-item-avatar--start">
                  <v-icon
                    class="feather-sm v-icon v-icon--size-default"
                    v-if="item.meta.icon"
                    >{{ item.meta.icon }}</v-icon
                  >
                </v-list-item-avatar>
                <v-list-item-title
                  class="v-list-item__content"
                  style="font-size: 16px; width: 100%; font-weight: 500"
                  >{{ item.meta.title }}</v-list-item-title
                >
                <v-list-item-avatar end class="v-list-item__append">
                  <v-icon
                    class="feather-sm v-icon v-icon--size-default"
                    v-if="item.childrens"
                    >mdi-chevron-down</v-icon
                  >
                  <v-icon class="feather-sm v-icon v-icon--size-default" v-else
                    >mdi-chevron-up</v-icon
                  >
                </v-list-item-avatar>
              </v-list-item>
              <div class="item-custom">
                <v-list-item
                  :to="child.path"
                  rounded="lg"
                  class="mb-1"
                  v-for="(child, i) in item.childrens"
                  :key="i"
                  :active="isRouteActive(child)"
                >
                  <v-list-item-avatar start class="v-list-item-avatar--start">
                    <v-icon
                      class="feather-sm v-icon v-icon--size-default"
                      style="font-size: 14px; margin-left: 10px"
                      >mdi-crosshairs-gps</v-icon
                    >
                  </v-list-item-avatar>
                  <v-list-item-title
                    class="v-list-item__content"
                    style="font-size: 14px; width: 100%"
                    >{{ child.meta.title }}</v-list-item-title
                  >
                </v-list-item>
              </div>
            </v-list-item-group>
            <v-list-item :to="item.path" rounded="lg" class="mb-1" v-else>
              <v-list-item-avatar start class="v-list-item-avatar--start">
                <v-icon
                  class="feather-sm v-icon v-icon--size-default"
                  v-if="item.meta.icon"
                  >{{ item.meta.icon }}</v-icon
                >
              </v-list-item-avatar>
              <v-list-item-title
                class="v-list-item__content"
                style="font-size: 16px; width: 100%; font-weight: 500"
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
