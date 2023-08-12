<template>
  <v-row class="mb-3" style="padding: 32px;">
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1" style="font-size:14px">Tài khoản</v-label>
      <v-text-field
        variant="outlined"
        hide-details
        color="secondary"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1" style="font-size:14px">Mật khẩu</v-label>
      <v-text-field
        hide-details
        color="secondary"
        variant="outlined"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="pt-0">
      <div class="d-flex flex-wrap align-center ml-n2">
        <!-- <v-checkbox v-model="checkbox" color="primary" hide-details>
          <template v-slot:label>Remeber this Device</template>
        </v-checkbox> -->
        <div class="ml-sm-auto">
          <RouterLink
            to="/"
            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
            style="font-family: 'Open Sans', sans-serif;"
            >Quên mật khẩu ?</RouterLink
          >
        </div>
      </div>
    </v-col>
    <v-col cols="12" class="pt-0">
      <v-btn to="/" color="secondary" size="large" block flat @click="login"
        >Đăng nhập</v-btn
      >
    </v-col>
  </v-row>
</template>
<script>
import { setToken } from "@/utils/auth";

export default {
  methods: {
    login() {
      setToken("ABC1234");
      this.$router.push("/");
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');

</style>

