<template>
  <v-row class="mb-3" style="padding: 22px">
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1" style="font-size: 14px"
        >Tài khoản</v-label
      >
      <v-text-field
        v-model="userName"
        hide-details
        color="secondary"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1" style="font-size: 14px"
        >Mật khẩu</v-label
      >
      <v-text-field
        v-model="password"
        hide-details
        color="secondary"
        :type="show1 ? 'text' : 'password'"
        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="show1 = !show1"
      ></v-text-field>
    </v-col>

    <v-col cols="12" class="pt-8">
      <v-btn to="/" color="secondary" size="large" block flat @click="login"
        >Đăng nhập</v-btn
      >
    </v-col>
  </v-row>
  <notifications />
</template>
<script>
import {
  setToken,
  setUserName,
  setFullName,
  setPhoneNumber,
  setEmployCode,
  setEmail,
  setStoreCode,
} from "@/utils/auth";
import { Login } from "@/api/user";
export default {
  data() {
    return {
      userName: "",
      password: "",
      show1: false,
    };
  },
  methods: {
    login() {
      Login({
        UserName: this.userName,
        Password: this.password,
      }).then((res) => {
        if (res) {
          setToken(res.Token);
          setUserName(res.Info.UserName);
          setFullName(res.Info.FullName);
          setPhoneNumber(res.Info.UserName);
          setEmployCode(res.Info.UserName);
          setEmail(res.Info.Email);
          setStoreCode(res.Info.StoreCode);
          this.$router.push("/");
        }
      });
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap");
</style>
