<script setup lang="ts">
import Logo from "@/layouts/full/logo/LogoDark.vue";
/* Login form */
import LoginForm from "@/components/auth/LoginForm.vue";
</script>
<template>
  <div class="authentication" style="background: #e7edf6">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
          <v-card
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 withbg mx-auto"
            max-width="500"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4">
                <Logo />
              </div>
              <div class="text-center mb-3" style="letter-spacing:2px; font-weight:600">Quản lý phòng khám</div>
              <LoginForm />
              <h6
                class="text-h6 text-muted font-weight-medium d-flex justify-center align-center mt-3"
           
              >
                Chưa có tài khoản?
                <RouterLink
                  to="/dang-ky"
                  class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2"
                >
                  Tạo tài khoản</RouterLink
                >
              </h6>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
