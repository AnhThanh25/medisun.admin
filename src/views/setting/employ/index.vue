<template>
  <v-card>
    <v-card-title class="text-h6 py-4"> Danh sách nhân sự </v-card-title>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      items-per-page-text="Số dòng 1 trang"
      sort-asc-icon="mdi-menu-up"
      sort-desc-icon="mdi-menu-down"
    >
      <template v-slot:top>
        <div class="d-flex flex-wrap gap-2">
          <span>
            <v-text-field
              v-model="search"
              label="Tìm kiếm"
              class="mx-4"
              variant="outlined"
              hide-details
              density="compact"
              style="width: 250px !important"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </span>

          <v-btn
            color="secondary"
            size="large"
            @click="isShowCreateEmploy = true"
            >Thêm nhân sự</v-btn
          >
        </div>
      </template>
      <template v-slot:item.Action="{ item }">
        <v-btn
          variant="text"
          @click="btShowUpdate(item)"
          icon="mdi-pencil-circle-outline"
        ></v-btn>
      </template>
    </v-data-table>
  </v-card>
  <v-dialog v-model="isShowCreateEmploy" persistent width="600">
    <v-card>
      <v-card-title>
        <h6 class="text-h6">Thêm nhân sự</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="employInfo.FullName"
                  label="Tên nhân sự"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Số điện thoại"
                  v-model="employInfo.PhoneNumber"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="employInfo.Sex"
                  :items="['Nam', 'Nữ', 'Không xác định']"
                  hide-details
                  label="Giới tính"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div style="position: relative; z-index: 1000000">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    class="custom-picker"
                  >
                    <template v-slot:activator="{ isActive }">
                      <v-text-field
                        v-model="computedDateFormatted"
                        label="Ngày sinh"
                        append-inner-icon="mdi-calendar"
                        persistent-hint
                        readonly
                        hide-details
                        @click="menu2 = true"
                        @click:appendInner="menu2 = true"
                      ></v-text-field>
                    </template>
                    <VDatePicker2
                      v-model="employInfo.DateOfBirth"
                      no-title
                      @input="menu2 = false"
                    ></VDatePicker2>
                  </v-menu>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="employInfo.Email"
                  label="Email"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="employInfo.Address"
                  label="Địa chỉ"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-file-input
                  v-model="employInfo.Avatar"
                  label="Hình ảnh"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon=""
                  hide-details
                ></v-file-input>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="employInfo.Role"
                  :items="roleLst"
                  :item-title="'text'"
                  :item-value="'value'"
                  label="Chức vụ"
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="employInfo.Password"
                  label="Mật khẩu"
                  hide-details
                  required
                  :type="show1 ? 'text' : 'password'"
                  :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="employInfo.PasswordConfirm"
                  label="Xác nhận mật khẩu"
                  hide-details
                  required
                  :type="show2 ? 'text' : 'password'"
                  :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="show2 = !show2"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowCreateEmploy = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="addAccountClinic"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowUpdateEmploy" persistent width="600">
    <v-card>
      <v-card-title>
        <h6 class="text-h6">Cập nhật thông tin nhân sự</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="employUpdate.FullName"
                  label="Tên nhân sự"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Số điện thoại"
                  v-model="employUpdate.PhoneNumber"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="employUpdate.Sex"
                  :items="['Nam', 'Nữ', 'Không xác định']"
                  hide-details
                  label="Giới tính"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div style="position: relative; z-index: 1000000">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    class="custom-picker"
                  >
                    <template v-slot:activator="{ isActive }">
                      <v-text-field
                        v-model="computedDateFormattedUpdate"
                        label="Ngày sinh"
                        append-inner-icon="mdi-calendar"
                        persistent-hint
                        readonly
                        hide-details
                        @click="menu2 = true"
                        @click:appendInner="menu2 = true"
                      ></v-text-field>
                    </template>
                    <VDatePicker2
                      v-model="employUpdate.DateOfBirth"
                      no-title
                      @input="menu2 = false"
                    ></VDatePicker2>
                  </v-menu>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="employUpdate.Email"
                  label="Email"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="employUpdate.Address"
                  label="Địa chỉ"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-file-input
                  v-model="employUpdate.Avatar"
                  label="Hình ảnh"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon=""
                  hide-details
                ></v-file-input>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="employUpdate.Role"
                  :items="roleLst"
                  :item-title="'text'"
                  :item-value="'value'"
                  label="Chức vụ"
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowUpdateEmploy = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="isShowUpdateEmploy = false"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script>
import { GetEmployLst, UpdateAccount, AddAccountClinic } from "@/api/user";
import { formatDate, formatDateDisplayDDMMYY } from "@/helpers/getTime";
import { getRoleText, roleLst } from "@/utils/role";
export default {
  data() {
    return {
      show1: false,
      show2: false,
      employInfo: {},
      fromDateVal: "",
      isShowUpdateEmploy: false,
      isShowCreateEmploy: false,
      search: "",
      sortBy: [{ key: "calories", order: "asc" }],
      headers: [
        {
          title: "STT",
          align: "start",
          sortable: false,
          key: "Key",
        },
        { title: "Tên NV", key: "FullName" },
        { title: "Tài khoản", key: "UserName" },
        { title: "Email", key: "Email" },
        { title: "Địa chỉ", key: "Address" },
        { title: "Ngày sinh", key: "BirthdayShow" },
        { title: "Chức vụ", key: "RoleText" },
        { title: "Action", key: "Action" },
      ],
      desserts: [],

      pageNumber: 1,
      rowspPage: 10,
      search: "",
      date: null,
      menu2: false,
      roleLst: roleLst,
      employUpdate: {},
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDateShow(this.employInfo.DateOfBirth);
    },
    computedDateFormattedUpdate() {
      return this.formatDateShow(this.employUpdate.DateOfBirth);
    },
  },

  methods: {
    btShowUpdate(data) {
      this.employUpdate = data.selectable;
      console.log(data);
      this.isShowUpdateEmploy = true;
    },
    formatDateShow(date) {
      if (!date) return null;
      const [year, month, day] = formatDate(date).split(" ")[0].split("-");
      return `${day}-${month}-${year}`;
    },
    getEmployLst() {
      GetEmployLst({
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: this.search,
      }).then((res) => {
        if (res) {
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              BirthdayShow: formatDateDisplayDDMMYY(item.DateOfBirth),
              RoleText: getRoleText(item.Role),
            };
          });
        }
      });
    },
    addAccountClinic() {
      if (!employInfo.Address) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui nhập địa chỉ",
        });
        return;
      }
      if (!employInfo.FullName) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui nhập tên nhân sự",
        });
        return;
      }
      if (!employInfo.PhoneNumber) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui nhập số điện thoại",
        });
        return;
      } else {
        if (isPhoneNumber(employInfo.PhoneNumber)) {
        } else {
          notify({
            type: "error",
            title: "Lỗi",
            text: "Số điện thoại không hợp lệ",
          });
          return;
        }
      }
      if (!employInfo.Email) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui nhập Email",
        });
        return;
      } else {
        if (isEmail(employInfo.Email)) {
        } else {
          notify({
            type: "error",
            title: "Lỗi",
            text: "Email không hợp lệ",
          });
          return;
        }
      }
      if (!employInfo.Birthday) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui chọn ngày sinh",
        });
        return;
      }
      if (!employInfo.Password || !employInfo.PasswordConfirm) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui lòng nhập mật khẩu",
        });
        return;
      } else {
        if (employInfo.Password === employInfo.PasswordConfirm) {
        } else {
          notify({
            type: "error",
            title: "Lỗi",
            text: "Xác nhận mật khẩu không chính xác",
          });
          return;
        }
      }
      AddAccountClinic({
        UserInfo: this.employInfo,
      }).then((res) => {
        if (res) {
          this.isShowCreateEmploy = false;
          this.getEmployLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Thêm mới nhân sự thành công",
          });
        }
      });
    },
    updateAccount() {
      if (!employUpdate.Address) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui nhập địa chỉ",
        });
        return;
      }
      if (!employUpdate.FullName) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui nhập tên nhân sự",
        });
        return;
      }
      if (!employUpdate.PhoneNumber) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui nhập số điện thoại",
        });
        return;
      } else {
        if (isPhoneNumber(employUpdate.PhoneNumber)) {
        } else {
          notify({
            type: "error",
            title: "Lỗi",
            text: "Số điện thoại không hợp lệ",
          });
          return;
        }
      }
      if (!employUpdate.Email) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui nhập Email",
        });
        return;
      } else {
        if (isEmail(employUpdate.Email)) {
        } else {
          notify({
            type: "error",
            title: "Lỗi",
            text: "Email không hợp lệ",
          });
          return;
        }
      }
      if (!employUpdate.Birthday) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Vui chọn ngày sinh",
        });
        return;
      }

      UpdateAccount({
        Data: this.employUpdate,
      }).then((res) => {
        if (res) {
          this.isShowUpdateEmploy = false;
          this.getEmployLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Cập nhật thông tin nhân sự thành công",
          });
        }
      });
    },
    isPhoneNumber(input) {
      const phoneRegex = /^0[0-9]{9}$/;
      return phoneRegex.test(input);
    },
    isEmail(input) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      return emailRegex.test(input);
    },
  },
  created() {
    this.getEmployLst();
  },
};
</script>

<style>
.custom-picker .v-overlay__content {
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 0px);
}
@media screen and (max-width: 598px) {
  .custom-picker .v-overlay__content {
    position: absolute;
    top: calc(50% - 60px);
    left: calc(50% - 125px);
  }
}
</style>
