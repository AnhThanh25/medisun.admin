<template>
  <v-row class="mb-3" style="padding: 32px; padding-top: 16px">
    <v-col cols="12">
      <v-label class="font-weight-bold" style="font-size: 14px"
        >Số điện thoại</v-label
      >
      <v-text-field
        v-model="userName"
        hide-details
        color="secondary"
        placeholder="Nhập số điện thoại đã đăng ký"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold" style="font-size: 14px">Email</v-label>
      <v-text-field
        v-model="email"
        hide-details
        type="email"
        color="secondary"
        placeholder="Nhập email đã đăng ký"
      ></v-text-field>
    </v-col>

    <v-col cols="12" class="pt-6">
      <v-btn color="secondary" size="large" block flat @click="login"
        >Lấy mật khẩu</v-btn
      >
    </v-col>
  </v-row>
  <notifications />
  <v-dialog v-model="isShowOTP" persistent width="400">
    <v-card>
      <v-card-title class="text-h5"> Mật khẩu </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="password"
          :type="show2 ? 'text' : 'password'"
          :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="show2 = !show2"
          hide-details
          color="primary"
          placeholder="Nhập mật khẩu"
          label="Mật khẩu"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          :type="show1 ? 'text' : 'password'"
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="show1 = !show1"
          hide-details
          color="primary"
          placeholder="Xác nhận mật khẩu"
          label="Xác nhận mật khẩu"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          v-model="otp"
          hide-details
          color="primary"
          placeholder="Vui lòng nhập mã OTP"
          label="Nhập mã OTP"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="darken-1" variant="text" @click="isShowOTP = false">
          Hủy
        </v-btn>
        <v-btn @click="checkOTPLostPassword"> Xác nhận </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { LostPassword, CheckOTPLostPassword } from "@/api/user";
export default {
  data() {
    return {
      userName: "",
      email: "",
      isShowOTP: false,
      otp: "",
      password: "",
      passwordConfirm: "",
      show1: false,
      show2: false,
    };
  },
  methods: {
    isPhoneNumber(input) {
      const phoneRegex = /^0[0-9]{9}$/;
      return phoneRegex.test(input);
    },
    isEmail(input) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(input);
    },

    login() {
      // this.isShowOTP = true;
      // return;
      if (!this.isPhoneNumber(this.userName)) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Số điện thoại không chính xác",
        });
        return;
      }
      if (!this.isEmail(this.email)) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Email không chính xác",
        });
        return;
      }
      LostPassword({
        UserName: this.userName,
        Email: this.email,
      }).then((res) => {
        if (res) {
          this.isShowOTP = true;
          notify({
            type: "success",
            title: "Lấy OTP",
            text: "Mã OTP đã được gửi vào số điện thoại cá nhân của bạn đăng ký",
          });
        }
      });
    },
    checkOTPLostPassword() {
      if (!this.password || !this.passwordConfirm) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui lòng nhập mật khẩu",
        });
        return;
      } else {
        if (this.password === this.passwordConfirm) {
        } else {
          notify({
            type: "error",
            title: "Lỗi",
            text: "Xác nhận mật khẩu không chính xác",
          });
          return;
        }
      }
      if (!this.otp) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui lòng nhập OTP",
        });
        return;
      }
      CheckOTPLostPassword({
        UserName: this.userName,
        Email: this.email,
        Password: this.password,
        OTPCode: this.otp,
      }).then((res) => {
        if (res) {
          this.isShowOTP = false;
          notify({
            type: "success",
            title: "Thành công",
            text: "Lấy mật khẩu thành công",
          });
          setTimeout(this.$router.push("/"), 1000);
        }
      });
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap");
</style>
