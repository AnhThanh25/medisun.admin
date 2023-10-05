<script setup>
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
                <div class="logo">
                  <RouterLink to="/">
                    <img src="@/assets/images/logos/cpc1hn-logo.png" />
                  </RouterLink>
                </div>
              </div>
              <div class="text-center title" >
                Chăm sóc khách hàng
              </div>
              <LoginForm />
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style lang="scss" scoped>
.logo {
  display: flex;
  img {
    height: 60px;
  }
}
.title {
  font-size: 24px;
  text-decoration: none !important;
  color: rgb(var(--v-theme-primary));
  font-weight: 500;
  margin-left: 8px;
}
</style>
