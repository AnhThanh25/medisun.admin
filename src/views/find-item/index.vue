<template>
  <v-row>
    <v-col :cols="12" :lg="4" :sm="12">
      <v-card max-width="444">
        <v-card-title>Truy xuất thông tin hàng hóa </v-card-title>

        <v-card-item>
          <v-text-field
            v-model="barcode"
            append-inner-icon="mdi-magnify"
            placeholder="Nhập mã barcode"
            hide-details
            single-line
            clearable
          ></v-text-field>
          <div class="text-center mt-4" v-if="barcode && loadding">
            <v-progress-circular
              color="secondary"
              model-value="70"
              indeterminate
            ></v-progress-circular>
          </div>

          <div v-else>
            <img
              src="https://sanxuat.icpc1hn.work/img/logo-cpc1hn.jpg"
              alt=""
              style="width: 100%"
            />
            <div>
              <strong class="text-subtitle-1 mb-1 font-weight-bold"
                >Mã QR:
              </strong>
              <span class="text-subtitle-1 mb-1">{{ headerInfo.QRCode }}</span>
            </div>
            <div>
              <strong class="text-subtitle-1 mb-1 font-weight-bold"
                >Kiện số {{ headerInfo.NumberBox }}:
              </strong>
              <span class="text-subtitle-1 mb-1">{{ headerInfo.TEMCode }}</span>
            </div>
            <div>
              <strong class="text-subtitle-1 mb-1 font-weight-bold"
                >Lệnh:
              </strong>
              <span class="text-subtitle-1 mb-1"
                >{{ headerInfo.ProductionOrder }} - <strong>Lô:</strong>
                {{ headerInfo.LotCode }}</span
              >
            </div>
            <div>
              <strong class="text-subtitle-1 mb-1 font-weight-bold"
                >Sản phẩm:
              </strong>
              <span class="text-subtitle-1 mb-1"
                >{{ headerInfo.ProductName }} - {{ headerInfo.ProductID }}</span
              >
            </div>
            <div>
              <strong class="text-subtitle-1 mb-1 font-weight-bold"
                >Quy cách:
              </strong>
              <span class="text-subtitle-1 mb-1">{{ headerInfo.Packing }}</span>
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>

    <v-col :cols="12" :lg="4" :sm="12">
      <v-card>
        <v-card-title>Chi tiết xuất nhập hàng hóa</v-card-title>
        <v-card-item>
          <v-card
            :color="
              item.Type == 1
                ? 'success'
                : item.Type == 2
                ? 'error'
                : 'secondary'
            "
            variant="outlined"
            class="mx-auto mb-2"
            max-width="344"
            v-for="(item, index) in checkLst"
            :key="index"
            :title="item.Title"
          >
            <template v-slot:prepend>
              <v-icon
                :color="
                  item.Type == 1
                    ? 'success'
                    : item.Type == 2
                    ? 'error'
                    : 'secondary'
                "
                :icon="
                  item.Type == 1
                    ? 'mdi-home-import-outline'
                    : item.Type == 2
                    ? 'mdi-home-export-outline'
                    : 'mdi-store-cog'
                "
              ></v-icon>
            </template>

            <v-card-item style="margin-top: -20px">
              <div>
                <div class="text-overline" style="margin-bottom: -5px">
                  {{ item.Time }}
                </div>
                <div class="text-h6 mb-1">
                  {{ item.EmployeeName }} - {{ item.Employeecode }}
                </div>
                <div class="text-caption" v-html="item.Description"></div>
              </div>
            </v-card-item>
          </v-card>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { CheckHistoryStamp } from "@/api/stamp";

export default {
  data() {
    return {
      barcode: "",
      debounceTimer: null,
      headerInfo: {},
      checkLst: [],
      loadding: false,
    };
  },
  watch: {
    barcode(value) {
      // Xóa bất kỳ hàm debounce nào đang chạy trước đó
      clearTimeout(this.debounceTimer);
      // Gọi debounce mới với giá trị của mã barcode
      this.debounceTimer = setTimeout(() => {
        console.log("anhthanfh");
        if (value.length > 10) {
          this.loadding = true;
          CheckHistoryStamp({ StampID: value }).then((res) => {
            if (res.RespCode == 0) {
              this.headerInfo = res.Info;
              this.checkLst = res.Data.map((item, index) => {
                return {
                  ...item,
                  Type:
                    item.Title.split(" - ")[0] == "Xuất kho"
                      ? 1
                      : item.Title.split(" - ")[0] == "Nhập kho"
                      ? 2
                      : 0,
                };
              });
              this.barcode = "";
              this.loadding = false;
            }
          });
        }
      }, 300);
    },
  },
  methods: {},
};
</script>
