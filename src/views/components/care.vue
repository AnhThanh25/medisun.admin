<template>
  <v-card height="420px">
    <v-card-title>
      <h6 class="text-h6 px-2 py-2">
        Chăm sóc khách hàng - {{ placeID }} - {{ careInfo.PlaceName }}
      </h6>
      <v-chip class="mx-2 mb-2" color="success" v-if="careInfo.Status == 4"
        >Đã đăng ký thành viên</v-chip
      >
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-autocomplete
            v-model="careInfo.TypeCare"
            label="Loại chăm sóc"
            :items="careTypeLst"
            item-title="text"
            item-value="text"
          ></v-autocomplete>
          <v-autocomplete
            v-model="careInfo.Content"
            label="Nội dung chăm sóc"
            :items="contentLst"
            item-title="text"
            item-value="text"
          ></v-autocomplete>
          <v-autocomplete
            v-model="careInfo.CustomerContact"
            label="Khách hàng cá nhân"
            :items="careInfo.CustomerLst"
            item-title="Title"
            item-value="CustomerContact"
          ></v-autocomplete>
        </v-col>
        <v-col cols="6">
          <VDatePicker2
            locale="vi"
            v-model="careInfo.DateCare"
            mode="date"
            :masks="masks"
            style="z-index: 10000"
          >
            <template #default="{ inputValue, inputEvents }">
              <v-text-field
                v-model="careInfo.DateCare"
                :value="inputValue"
                v-on="inputEvents"
                label="Ngày chăm sóc"
                append-inner-icon="mdi-calendar"
              />
            </template>
          </VDatePicker2>

          <div v-if="careInfo.TypeCare == 'Đăng ký thành viên'">
            <div v-if="careInfo.Content == 'Đăng ký qua Zalo'">
              <v-text-field
                label="Số điện thoại Zalo"
                v-model="careInfo.PhoneZalo"
              ></v-text-field>
              <v-text-field
                label="Tên Zalo"
                v-model="careInfo.NameZalo"
              ></v-text-field>
            </div>
            <div v-if="careInfo.Content == 'Đăng ký qua Gmail'">
              <v-text-field
                label="Gmail"
                v-model="careInfo.Gmail"
              ></v-text-field>
            </div>
            <div v-if="careInfo.Content == 'Đăng ký qua Facebook'">
              <v-text-field
                label="Facebook"
                v-model="careInfo.Facebook"
              ></v-text-field>
            </div>
          </div>

          <div v-else>
            <v-autocomplete
              v-model="careInfo.Resuilt"
              label="Kết quả"
              :items="resuiltLst"
              item-title="text"
              item-value="text"
            ></v-autocomplete>
            <v-file-input
              v-model="imageCare"
              label="Chọn hình ảnh"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon=""
              v-if="careInfo.Resuilt == 'Phát sinh đơn'"
            ></v-file-input>

            <v-autocomplete
              v-model="careInfo.TypeResuilt"
              label="Loại kết quả"
              :items="typeResuiltLst"
              item-title="text"
              item-value="text"
              v-if="careInfo.Resuilt == 'Không phát sinh đơn'"
            ></v-autocomplete>
          </div>

          <v-text-field label="Ghi chú" v-model="careInfo.Note"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="btClose">
        Đóng
      </v-btn>
      <v-btn @click="createCRM"> Lưu thông tin </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { GetPlaceByID, CreateCRM } from "@/api/crm";
import { careTypeLst, urlUploadImageCare } from "@/utils/variable";
import { formatDateUpload, formatDate } from "@/helpers/getTime";
import { getFullName, getEmployCode } from "@/utils/auth";
export default {
  props: {
    placeID: String,
  },
  data() {
    return {
      careInfo: {},
      careTypeLst: careTypeLst,
      contentLst: [],
      masks: {
        input: "DD-MM-YYYY",
      },
      resuiltLst: [],
      typeResuiltLst: [],
      imageCare: null,
      status: 0,
    };
  },
  emits: ["btClose"],
  watch: {
    placeID() {
      this.getPlaceByID();
    },
    "careInfo.TypeCare"(newValue) {
      this.careInfo.Content = "";
      this.contentLst = this.careTypeLst.find(
        (p) => p.text == newValue
      ).options;
      if (newValue != "Đăng ký thành viên") {
        this.resuiltLst = this.careTypeLst.find(
          (p) => p.text == newValue
        ).resuilts;
      }
    },
    "careInfo.Resuilt"(newValue) {
      if (newValue != "Không phát sinh đơn") {
        this.typeResuiltLst = [
          { text: "Tư vấn sản phẩm" },
          { text: "Tư vấn chương trình" },
          { text: "Pass thông tin KD" },
        ];
      }
    },
    "careInfo.TypeResuilt"(newValue) {
      if (newValue == "KH đã nhận quà") {
        this.status = 4;
      }
      if (newValue == "Đã gửi quà") {
        this.status = 3;
      }
      if (newValue == "Hủy tặng quà") {
        this.status = 0;
      }
    },
    "careInfo.Content"(newValue) {
      if (newValue == "Đã xác nhận") {
        this.status = 2;
      }
      if (newValue == "Chưa xác nhận") {
        this.status = 1;
      }
    },
  },
  methods: {
    uploadImageCare(data) {
      const params = new FormData();
      params.append("file", this.imageCare[0]);

      Axios.post(urlUploadImageCare(data), params).then((res) => {
        if (res.data.RespCode == 0) {
          notify({
            type: "success",
            title: "Thành công",
            text: "Lưu thông tin chăm sóc thành công",
          });
          this.btClose();
        } else {
          notify({
            title: "Lỗi",
            text: res.data.RespText,
            type: "error",
          });
        }
      });
    },
    createCRM() {
      if (!this.careInfo.CustomerContact) {
        notify({
          type: "error",
          title: "Lỗi",
          text: "Chưa chọn khách hàng",
        });
        return;
      }
      var req = {
        PlaceID: this.placeID,
        TypeCare: this.careInfo.TypeCare,
        CrmName: getFullName(),
        CrmID: getEmployCode(),
        DateCare: formatDate(this.careInfo.DateCare),
        Content: this.careInfo.Content,
        CustomerID: this.careInfo.CustomerLst.find(
          (p) => p.CustomerContact == this.careInfo.CustomerContact
        ).CustomerID,
        CustomerName: this.careInfo.CustomerLst.find(
          (p) => p.CustomerContact == this.careInfo.CustomerContact
        ).CustomerName,
        CustomerContact: this.careInfo.CustomerContact,
        CustomerRes: this.careInfo.CustomerRes,
        Note: this.careInfo.Note,
        DocumentNo: this.careInfo.DocumentNo,
        CustomerLevel: this.careInfo.CustomerLevel,
        ShareNoti: this.careInfo.ShareNoti,
        NoteRes: this.careInfo.NoteRes,
        TypeResuilt: this.careInfo.TypeResuilt,
        Resuilt: this.careInfo.Resuilt,
        StatusGift: this.status,
      };

      CreateCRM({ CRMInfo: req }).then((res) => {
        if (res.RespCode == 0) {
          if (this.careInfo.Resuilt == "Phát sinh đơn") {
            if (this.imageCare) {
              this.uploadImageCare(res.RowID);
            }
          } else {
            notify({
              type: "success",
              title: "Thành công",
              text: "Lưu thông tin chăm sóc thành công",
            });
            this.btClose();
          }
        }
      });
    },
    isPhoneNumber(input) {
      const phoneRegex = /^0[0-9]{9}$/;
      return phoneRegex.test(input);
    },

    btClose() {
      this.$emit("btClose");
    },
    getPlaceByID() {
      GetPlaceByID({
        PlaceId: this.placeID,
        UserCode: "",
      }).then((res) => {
        this.careInfo = res.Data;
        this.careInfo.DateCare = formatDateUpload(new Date()) + " 00:00:00";
        this.careInfo.CustomerLst = this.careInfo.CustomerLst.map(
          (item, index) => {
            return {
              ...item,
              Title: item.CustomerName + " - " + item.CustomerContact,
            };
          }
        );
      });
    },
  },
  created() {
    this.getPlaceByID();
  },
};
</script>

<style></style>
