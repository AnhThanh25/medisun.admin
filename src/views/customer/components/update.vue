<template>
  <v-card>
    <v-card-title>
      <h6 class="text-h6 px-3 py-2">Thông tin khách hàng - {{ placeID }}</h6>
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Khách hàng"
        v-model="placeInfo.PlaceName"
      ></v-text-field>
      <v-row>
        <v-col cols="4">
          <v-text-field
            label="Người đại diện"
            v-model="placeInfo.Delegate"
          ></v-text-field>
          <v-autocomplete
            v-model="placeInfo.Area"
            label="Vùng"
            :items="areaLst"
          ></v-autocomplete>
          <v-autocomplete
            v-model="placeInfo.Commune"
            label="Phường/Xã"
            :items="communeLst"
            item-title="Commune"
            item-value="Commune"
          ></v-autocomplete>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Số điện thoại"
            v-model="placeInfo.Phone"
          ></v-text-field>
          <v-autocomplete
            v-model="placeInfo.City"
            label="Tỉnh"
            :items="cityLst"
            item-title="City"
            item-value="City"
          ></v-autocomplete>
          <v-text-field
            label="Địa chỉ"
            v-model="placeInfo.Address"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-autocomplete
            v-model="placeInfo.PlaceType"
            label="Loại"
            :items="typePlaceLst"
            item-title="label"
            item-value="value"
          ></v-autocomplete>
          <v-autocomplete
            v-model="placeInfo.District"
            label="Quận/huyện"
            :items="districtLst"
            item-title="District"
            item-value="District"
          ></v-autocomplete>
          <v-text-field label="Ghi chú" v-model="placeInfo.Note"></v-text-field>
        </v-col>
      </v-row>
      <v-data-table-server
        no-data-text="Không có dữ liệu"
        :headers="headers"
        :items="placeInfo.CustomerLst"
        sort-asc-icon="mdi-menu-up"
        sort-desc-icon="mdi-menu-down"
        :hide-default-footer="true"
        :disable-pagination="true"
        :items-per-page="-1"
        class="table-pres"
        style="border: none"
      >
        <template v-slot:item.Key="{ item }">
          {{ item.raw.Key }}
          <v-icon
            color="primary"
            size="small"
            class="me-2"
            @click="btShowInfoCustomer(item.raw)"
            >mdi-pencil
          </v-icon>
        </template>
        <template v-slot:item.Action="{ item }">
          <v-icon
            color="error"
            size="small"
            class="me-2"
            @click="removeCustomer(item.raw)"
            >mdi-delete
          </v-icon>
        </template>
      </v-data-table-server>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="btClose">
        Đóng
      </v-btn>
      <v-btn @click="updatePlaceByID"> Lưu thông tin </v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="isShowCustomer" persistent width="500">
    <v-card height="400">
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Cập nhật khách hàng cá nhân</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="customerInfo.CustomerName"
              label="Tên khách hàng"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <VDatePicker2
              locale="vi"
              v-model="customerInfo.Birthday"
              mode="date"
              :masks="masks"
            >
              <template #default="{ inputValue, inputEvents }">
                <v-text-field
                  v-model="customerInfo.Birthday"
                  :value="inputValue"
                  v-on="inputEvents"
                  label="Sinh nhật"
                  append-inner-icon="mdi-calendar"
                  hide-details
                />
              </template>
            </VDatePicker2>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              label="Số điện thoại"
              v-model="customerInfo.CustomerContact"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              label="Vị trí"
              v-model="customerInfo.Position"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowCustomer = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="addInfoCus"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { GetPlaceByID, UpdatePlaceByID } from "@/api/crm";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict,
} from "@/api/default";
import { getToken } from "@/utils/auth";
import { typePlaceLst, areaLst } from "@/utils/variable";
import { formatDateDisplayDDMMYY, formatDateUpload } from "@/helpers/getTime";
export default {
  props: {
    placeID: String,
  },
  data() {
    return {
      placeInfo: {},
      cityLst: [],
      headers: [
        { title: "STT", sortable: false, key: "Key", width: 90 },
        { title: "Khách hàng", key: "CustomerName", sortable: false },
        {
          title: "SĐT",
          key: "CustomerContact",
          sortable: false,
          align: "center",
        },
        { title: "Chức vụ", key: "Position", sortable: false, align: "center" },
        {
          title: "Sinh nhật",
          key: "BirthdayShow",
          sortable: false,
          align: "center",
        },
        { title: "", key: "Action", sortable: false, align: "center" },
      ],
      communeLst: [],
      districtLst: [],
      cityLst: [],
      typePlaceLst: typePlaceLst.filter((p) => p.value != ""),
      areaLst: areaLst,
      customerInfo: {},
      isShowCustomer: false,
      masks: {
        input: "DD-MM-YYYY",
      },
    };
  },
  emits: ["btClose"],
  watch: {
    placeID() {
      this.getPlaceByID();
    },
    "placeInfo.City"() {
      this.getDistrictNow();
    },
    "placeInfo.District"() {
      this.getCommuneNow();
    },
  },
  methods: {
    isPhoneNumber(input) {
      const phoneRegex = /^0[0-9]{9}$/;
      return phoneRegex.test(input);
    },
    updatePlaceByID() {
      if (
        this.placeInfo.Area &&
        this.placeInfo.Commune &&
        this.placeInfo.City &&
        this.placeInfo.PlaceType &&
        this.placeInfo.District
      ) {
      } else {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Chưa nhập đầy đủ thông tin",
        });
        return;
      }
      if (!this.placeInfo.Delegate) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Chưa nhập tên người đại diện",
        });
        return;
      }
      if (!this.placeInfo.Phone) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Chưa nhập số điện thoại",
        });
        return;
      } else {
        if (this.isPhoneNumber(this.placeInfo.Phone)) {
        } else {
          notify({
            type: "error",
            title: "Lỗi",
            text: "Số điện thoại không hợp lệ",
          });
          return;
        }
      }

      UpdatePlaceByID({ Data: this.placeInfo }).then((res) => {
        if (res.RespCode == 0) {
          notify({
            type: "success",
            title: "Thành công",
            text: "Chỉnh sửa tổ chức thành công",
          });
          this.btClose();
        } else {
          notify({
            type: "success",
            title: "Thành công",
            text: res.RespText,
          });
        }
      });
    },
    addInfoCus() {
      this.isShowCustomer = false;
      this.customerInfo.BirthdayShow = formatDateDisplayDDMMYY(
        this.customerInfo.Birthday
      );
      this.customerInfo.Birthday =
        formatDateUpload(this.customerInfo.Birthday) + " 00:00:00";
    },
    btShowInfoCustomer(data) {
      this.customerInfo = data;
      this.isShowCustomer = true;
    },
    removeCustomer(data) {
      this.placeInfo.CustomerLst = this.placeInfo.CustomerLst.filter(
        (p) => p.Key != data.Key
      );
    },
    getCommuneNow() {
      if (this.placeInfo.City && this.placeInfo.District) {
        GetCommuneByCityAndDistrict({
          City: this.placeInfo.City,
          District: this.placeInfo.District,
          token: getToken(),
        }).then((res) => {
          this.communeLst = res.Data;
        });
      }
    },
    getDistrictNow() {
      if (this.placeInfo.City) {
        GetDistrictByCity({
          token: getToken(),
          City: this.placeInfo.City,
        }).then((res) => {
          this.districtLst = res.Data;
        });
      }
    },
    getCityNow() {
      GetCity({ token: getToken() }).then((res) => {
        if (res.ResCode == 0) {
          this.cityLst = res.Data;
        }
      });
    },
    btClose() {
      this.$emit("btClose");
    },
    getPlaceByID() {
      GetPlaceByID({
        PlaceId: this.placeID,
        UserCode: "",
      }).then((res) => {
        this.placeInfo = res.Data;
        this.placeInfo.CustomerLst = this.placeInfo.CustomerLst.map(
          (item, index) => {
            return {
              ...item,
              Key: index + 1,
              BirthdayShow: formatDateDisplayDDMMYY(item.Birthday),
              Birthday: formatDateUpload(item.Birthday) + " 00:00:00",
            };
          }
        );
      });
    },
  },
  created() {
    this.getPlaceByID();
    this.getCityNow();
  },
};
</script>

<style></style>
