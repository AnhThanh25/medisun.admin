<script setup lang="ts">
import { ref, watch } from "vue";
// import sidebarItems from "./sidebarItem";
import LogoDark from "../logo/LogoDark.vue";
import { constantRoutes } from "@/router/index";
const sidebarMenu = ref(constantRoutes);
</script>

<template>
  <div>
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
        <template v-for="(child, index) in sidebarMenu" :key="index">
          <!-- ---------------------------------------------- -->
          <!---Single Item-->
          <!-- ---------------------------------------------- -->

          <v-list-item :to="child.path" rounded="lg" class="mb-1">
            <v-list-item-avatar start class="v-list-item-avatar--start">
              <v-icon
                class="feather-sm v-icon v-icon--size-default"
                v-if="child.meta.icon"
                >{{ child.meta.icon }}</v-icon
              >
            </v-list-item-avatar>
            <v-list-item-title
              class="v-list-item__content"
              style="font-size: 14px; width: 100%"
              >{{ child.meta.title }}</v-list-item-title
            >
            <v-list-item-avatar end class="v-list-item__append">
              <v-icon class="feather-sm v-icon v-icon--size-default"
                >mdi-chevron-down</v-icon
              >
            </v-list-item-avatar>
          </v-list-item>
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
