<template>
  <v-row class="mb-3" style="padding: 32px">
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
    <v-col cols="12" class="pt-0">
      <div class="d-flex flex-wrap align-center ml-n2">
        <!-- <v-checkbox v-model="checkbox" color="primary" hide-details>
          <template v-slot:label>Remeber this Device</template>
        </v-checkbox> -->
        <div class="ml-sm-auto">
          <RouterLink
            to="/quen-mat-khau"
            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
            style="font-family: 'Open Sans', sans-serif"
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
  <notifications />
</template>
<script>
import {
  setToken,
  setUserName,
  setFullName,
  setPhoneNumber,
  setHotline,
  setEmail,
  setRole,
  setClinicID,
  setClinicName,
  setAddress,
  setCity,
  setDistrict,
  setCommune,
} from "@/utils/auth";
import { UserLogin } from "@/api/user";
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
      UserLogin({
        UserName: this.userName,
        Password: this.password,
      }).then((res) => {
        if (res) {
          console.log(res);
          setToken(res.Token);
          setUserName(res.UserInfo.PhoneNumber);
          setFullName(res.UserInfo.FullName);
          setPhoneNumber(res.UserInfo.PhoneNumber);
          setHotline(res.ClinicInfo.ContactNumber);
          setEmail(res.UserInfo.Email);
          setRole(res.UserInfo.Role);
          setClinicID(res.UserInfo.ClinicID);
          setClinicName(res.ClinicInfo.ClinicName);
          setAddress(res.ClinicInfo.Address);
          setCity(res.ClinicInfo.City);
          setDistrict(res.ClinicInfo.District);
          setCommune(res.ClinicInfo.Commune);

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
