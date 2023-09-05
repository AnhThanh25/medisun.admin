<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict,
} from "@/api/default";
import { UserRegister, GetOTPCheck } from "@/api/user";
const checkbox = ref(true);
const cityLst = ref([]);
const districtLst = ref([]);
const communeLst = ref([]);
const isShowNotify = ref(false);
const reqUser = ref({});
const reqClinic = ref({});
const isShowOTP = ref(false);
var citySelect = ref(null);
var districtSelect = ref(null);
var communeSelect = ref(null);
const otp = ref("");

onMounted(() => {
  GetCity({}).then((res) => {
    cityLst.value = res.Data;
  });
});

watch(
  () => reqClinic.value.City,
  (newValue) => {
    GetDistrictByCity({ City: newValue }).then((res) => {
      districtLst.value = res.Data;
    });
  }
);

watch(
  () => reqClinic.value.District,
  (newValue) => {
    GetCommuneByCityAndDistrict({
      City: reqClinic.value.City,
      District: newValue,
    }).then((res) => {
      communeLst.value = res.Data;
    });
  }
);
function getOTP() {
  if (!reqClinic.value.ClinicName) {
    notify({
      type: "error",
      title: "Lỗi",
      text: "Vui lòng nhập tên phòng khám",
    });
    return;
  }
  if (!reqClinic.value.City) {
    notify({
      type: "error",
      title: "Lỗi",
      text: "Vui chọn Tỉnh/Thành phố",
    });
    return;
  }
  if (!reqClinic.value.District) {
    notify({
      type: "error",
      title: "Lỗi",
      text: "Vui chọn Quận/Huyện",
    });
    return;
  }
  if (!reqClinic.value.Commune) {
    notify({
      type: "error",
      title: "Lỗi",
      text: "Vui chọn Phường/Xã",
    });
    return;
  }
  if (!reqClinic.value.Address) {
    notify({
      type: "error",
      title: "Lỗi",
      text: "Vui nhập số nhà, địa chỉ cụ thể...",
    });
    return;
  }
  if (!reqUser.value.FullName) {
    notify({
      type: "error",
      title: "Lỗi",
      text: "Vui nhập tên chủ phòng khám",
    });
    return;
  }
  if (!reqUser.value.Phone) {
    notify({
      type: "error",
      title: "Lỗi",
      text: "Vui nhập số điện thoại",
    });
    return;
  } else {
    if (isPhoneNumber(reqUser.value.Phone)) {
    } else {
      notify({
        type: "error",
        title: "Lỗi",
        text: "Số điện thoại không hợp lệ",
      });
      return;
    }
  }
  if (!reqUser.value.Email) {
    notify({
      type: "error",
      title: "Lỗi",
      text: "Vui nhập Email",
    });
    return;
  } else {
    if (isEmail(reqUser.value.Email)) {
    } else {
      notify({
        type: "error",
        title: "Lỗi",
        text: "Email không hợp lệ",
      });
      return;
    }
  }
  if (!reqUser.value.Birthday) {
    notify({
      type: "error",
      title: "Lỗi",
      text: "Vui chọn ngày sinh",
    });
    return;
  }
  if (!reqUser.value.Password || !reqUser.value.PasswordConfirm) {
    notify({
      type: "error",
      title: "Lỗi",
      text: "Vui lòng nhập mật khẩu",
    });
    return;
  } else {
    if (reqUser.value.Password === reqUser.value.PasswordConfirm) {
    } else {
      notify({
        type: "error",
        title: "Lỗi",
        text: "Xác nhận mật khẩu không chính xác",
      });
      return;
    }
  }

  // isShowOTP.value = true;
  // return;
  GetOTPCheck({
    Email: reqUser.value.Email,
    PhoneNumber: reqUser.value.Phone,
  }).then((res) => {
    if (res) {
      isShowOTP.value = true;
      notify({
        type: "success",
        title: "Lấy OTP",
        text: "Mã OTP đã được gửi vào số điện thoại cá nhân của bạn đăng ký",
      });
    }
  });
}
function isPhoneNumber(input: string) {
  const phoneRegex = /^0[0-9]{9}$/;
  return phoneRegex.test(input);
}
function isEmail(input: string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailRegex.test(input);
}
function registerAccount() {
  UserRegister({
    UserInfo: reqUser.value,
    ClinicInfo: reqClinic.value,
    OTP: otp.value,
    Password: reqUser.value.Password,
  }).then((res) => {
    if (res) {
      isShowOTP.value = false;
      notify({
        type: "success",
        title: "Thành công",
        text: "Đăng ký phòng khám thành công",
      });
      $router.push('/login')
    }
  });
}
</script>

<template>
  <notifications position="top right" />
  <v-dialog v-model="isShowOTP" persistent width="400">
    <v-card>
      <v-card-title class="text-h5"> Mã OTP </v-card-title>
      <v-card-text>
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
        <v-btn @click="registerAccount"> Xác nhận </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-row class="d-flex mb-3">
    <v-col cols="12" lg="8">
      <v-text-field
        v-model="reqClinic.ClinicName"
        hide-details
        color="primary"
        placeholder="Nhập tên phòng khám"
        label="Tên phòng khám"
      ></v-text-field>
    </v-col>
    <v-col cols="12" lg="4">
      <v-text-field
        v-model="reqClinic.ContactNumber"
        hide-details
        color="primary"
        placeholder="Nhập số hotline"
        label="Hotline"
      ></v-text-field>
    </v-col>
    <v-col cols="12" lg="4">
      <v-select
        v-model="reqClinic.City"
        hide-details
        color="primary"
        label="Tỉnh/TP"
        placeholder="Chọn tỉnh/tp"
        :items="cityLst"
        :item-title="'City'"
        :item-value="'City'"
      ></v-select>
    </v-col>
    <v-col cols="12" lg="4">
      <v-select
        v-model="reqClinic.District"
        hide-details
        color="primary"
        label="Quận/Huyện"
        placeholder="Chọn quận/huyện"
        :items="districtLst"
        :item-title="'District'"
        :item-value="'District'"
        no-data-text="Vui lòng chọn tỉnh/thành phố"
      ></v-select>
    </v-col>
    <v-col cols="12" lg="4">
      <v-select
        v-model="reqClinic.Commune"
        hide-details
        color="primary"
        label="Phường/Xã"
        placeholder="Chọn phường/xã"
        :items="communeLst"
        :item-title="'Commune'"
        :item-value="'Commune'"
        no-data-text="Vui lòng chọn quận/huyện"
      ></v-select>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="reqClinic.Address"
        hide-details
        color="primary"
        label="Địa chỉ"
        placeholder="Nhập địa chỉ cụ thể"
      ></v-text-field>
    </v-col>
    <v-col cols="12" lg="4">
      <v-text-field
        v-model="reqUser.FullName"
        hide-details
        color="primary"
        label="Tên chủ phòng khám"
        placeholder="Nhập họ và tên"
      ></v-text-field>
    </v-col>
    <v-col cols="12" lg="4">
      <v-text-field
        v-model="reqUser.Phone"
        hide-details
        color="primary"
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
      ></v-text-field>
    </v-col>
    <v-col cols="12" lg="4">
      <v-text-field
        v-model="reqUser.Email"
        type="email"
        hide-details
        color="primary"
        label="Email"
        placeholder="Nhập email"
      ></v-text-field>
    </v-col>
    <v-col cols="12" lg="4">
      <v-text-field
        v-model="reqUser.Password"
        type="password"
        hide-details
        color="primary"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
      ></v-text-field>
    </v-col>
    <v-col cols="12" lg="4">
      <v-text-field
        v-model="reqUser.PasswordConfirm"
        type="password"
        hide-details
        color="primary"
        label="Nhập lại mật khẩu"
        placeholder="Nhập lại mật khẩu"
      ></v-text-field>
    </v-col>
    <v-col cols="12" lg="4">
      <v-text-field
        v-model="reqUser.Birthday"
        type="date"
        hide-details
        color="primary"
        label="Ngày sinh"
        placeholder="Chọn ngày sinh"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn color="primary" size="large" block flat @click="getOTP"
        >Đăng ký</v-btn
      >
    </v-col>
    <small class="ml-3"
      >Lưu ý: Số điện thoại là tài khoản đăng nhập của bạn.</small
    >
  </v-row>
</template>
