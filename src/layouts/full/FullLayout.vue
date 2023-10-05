<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import SidebarVue from "./sidebar/Sidebar.vue";
import HeaderVue from "./header/Header.vue";
import { getFullName } from "@/utils/auth";
const drawer = ref(undefined || true);
const innerW = window.innerWidth;
const fullName = getFullName();

onMounted(() => {
  if (innerW < 950) {
    drawer.value = !drawer.value;
  }
});
</script>

<template>
  <v-app style="background: #f6f6f6">
    <!-- ---------------------------------------------- -->
    <!---Sidebar -->
    <!-- ---------------------------------------------- -->
    <v-navigation-drawer
      left
      :permanent="$vuetify.display.mdAndUp"
      elevation="10"
      app
      :temporary="$vuetify.display.mdAndDown"
      v-model="drawer"
      expand-on-hover
    >
      <SidebarVue />
    </v-navigation-drawer>
    <!-- ---------------------------------------------- -->
    <!---Header -->
    <!-- ---------------------------------------------- -->
    <v-app-bar elevation="0" class="v-topbar">
      <v-app-bar-nav-icon class="" @click="drawer = !drawer" />
      <v-spacer />
      <!-- ---------------------------------------------- -->
      <!-- User Profile -->
      <!-- ---------------------------------------------- -->
      <h6 class="text-h6" style="color: rgb(var(--v-theme-text))">
        {{ fullName }}
      </h6>
      <HeaderVue />
    </v-app-bar>

    <!-- ---------------------------------------------- -->
    <!---Page Wrapper -->
    <!-- ---------------------------------------------- -->

    <v-main style="--v-layout-top: 44px">
      <v-container fluid class="page-wrapper">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
