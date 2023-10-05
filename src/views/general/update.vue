<template>
  <v-card>
    <v-card-title>
      <h6 class="text-h6 px-3 py-2">Chi tiết phiếu khám tổng quát</h6>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <VDatePicker2
            locale="vi"
            v-model="generalInfo.TimeCreate"
            mode="date"
            :masks="masks"
          >
            <template #default="{ inputValue, inputEvents }">
              <v-text-field
                v-model="generalInfo.TimeCreate"
                :value="inputValue"
                v-on="inputEvents"
                label="Thời gian tạo"
                append-inner-icon="mdi-calendar"
              />
            </template>
          </VDatePicker2>
          <v-text-field label="Khách hàng" v-model="generalInfo.Title">
          </v-text-field>

          <v-select
            v-model="generalInfo.EmployCare"
            :items="employLst"
            label="Nhân viên phụ trách"
            item-title="Title"
            item-value="UserName"
          ></v-select>
          <v-text-field
            label="Lý do khám"
            v-model="generalInfo.Reason"
          ></v-text-field>
          <v-text-field
            label="Ghi chú"
            v-model="generalInfo.Note"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <strong>Tiền sử bệnh toàn thân</strong>
          <v-row class="checkBox">
            <v-checkbox
              v-model="item.CheckBox"
              :label="item.Text"
              v-for="item in pathAll"
              :key="item.Text"
            ></v-checkbox>
          </v-row>
          <strong>Tiền sử bệnh răng miệng</strong>
          <v-row class="checkBox">
            <v-checkbox
              v-model="item.CheckBox"
              :label="item.Text"
              v-for="item in pathTeeth"
              :key="item.Text"
            ></v-checkbox>
          </v-row>
        </v-col>
      </v-row>
      <v-row style="margin-top: -20px">
        <small style="line-height: 40px; font-size: 16px; padding-right: 70px"
          >Sơ đồ hàm răng:</small
        >
        <span>
          <v-radio-group inline v-model="generalInfo.TypeTeeth">
            <v-radio
              label="Hàm người lớn"
              value="Hàm người lớn"
              color="secondary"
            ></v-radio>
            <v-radio
              label="Hàm trẻ em"
              value="Hàm trẻ em"
              color="secondary"
            ></v-radio>
          </v-radio-group>
        </span>
      </v-row>
      <v-row>
        <TeethAdults
          v-if="generalInfo.TypeTeeth == 'Hàm người lớn'"
          :teethLst="generalInfo.TeethLst"
          @saveReasonTeeth="saveReasonTeeth"
        />
        <TeethKids
          v-if="generalInfo.TypeTeeth == 'Hàm trẻ em'"
          :teethLst="generalInfo.TeethLst"
        />
      </v-row>
      <v-data-table-server :items-length="totalLength"
      @update:itemsPerPage="btRow"
      @update:page="btPage"
        no-data-text="Không có dữ liệu"
        :headers="teethHeaders"
        :items="generalInfo.TeethLst"
        sort-asc-icon="mdi-menu-up"
        sort-desc-icon="mdi-menu-down"
        :hide-default-footer="true"
        :disable-pagination="true"
        :items-per-page="-1"
        class="table-pres"
        style="margin-top: 12px"
      >
       </v-data-table-server>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="addGeneralty"> Lưu thông tin </v-btn>
    </v-card-actions>
  </v-card>
  <notifications />
</template>

<script>
import TeethAdults from "./components/teeth-adults.vue";
import TeethKids from "./components/teeth-kids.vue";
import { pathAll, pathTeeth } from "../customer/variable";
import { GetGeneraltyByID, AddGeneralty } from "@/api/generalty";
import { GetEmployLst } from "@/api/user";
import { getRoleText } from "@/utils/role";
export default {
  components: {
    TeethAdults,
    TeethKids,
  },
  data() {
    return {
      pathAll: pathAll,
      pathTeeth: pathTeeth,
      typeTeeth: 1,
      generalInfo: {},
      teethHeaders: [
        { title: "STT", sortable: false, key: "Key" },
        { title: "Loại", key: "TypeTeeth" },
        { title: "Răng", key: "TeethShow" },
        { title: "Bệnh lý", key: "Reason" },
      ],
      masks: {
        input: "DD-MM-YYYY",
      },
      generalID: null,
      employLst: [],
    };
  },
  methods: {
    addGeneralty() {
      this.generalInfo.PathlogicalLst = [];
      for (var i = 0; i < this.pathAll.length; i++) {
        var item = this.pathAll[i];
        if (item.CheckBox) {
          var path = {
            Type: "Tiền sử bệnh toàn thân",
            Pathological: item.Text,
          };
          this.generalInfo.PathlogicalLst.push(path);
        }
      }
      for (var i = 0; i < this.pathTeeth.length; i++) {
        var item = this.pathTeeth[i];
        if (item.CheckBox) {
          var path = {
            Type: "Tiền sử bệnh răng miệng",
            Pathological: item.Text,
          };
          this.generalInfo.PathlogicalLst.push(path);
        }
      }
      AddGeneralty({
        Data: this.generalInfo,
      }).then((res) => {
        if (res) {
          notify({
            type: "success",
            title: "Thành công",
            text: "Cập nhật phiếu khám tổng quát thành công",
          });
          setTimeout(() => {
            this.$router.push("/kham-benh/tong-quat");
          }, 500);
        }
      });
    },

    saveReasonTeeth(number, data) {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var check = this.generalInfo.TeethLst.find(
            (p) => p.Teeth == number && p.Reason == data[i].Text
          );
          if (!check) {
            this.generalInfo.TeethLst.push({
              TypeTeeth: this.generalInfo.TypeTeeth,
              Teeth: number,
              TeethShow: "Răng số " + number,
              Reason: data[i].Text,
            });
          }
        }
      } else {
        this.generalInfo.TeethLst = this.generalInfo.TeethLst.filter(
          (p) => p.Teeth != number
        );
      }

      this.generalInfo.TeethLst = this.generalInfo.TeethLst.map(
        (item, index) => {
          return {
            ...item,
            Key: index + 1,
          };
        }
      );
    },
    getEmployLst() {
      GetEmployLst({
        PageNumber: 1,
        RowspPage: 10000,
        Search: "",
      }).then((res) => {
        if (res) {
          this.employLst = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              Title: item.FullName + " - " + getRoleText(item.Role),
            };
          });
        }
      });
    },
    getGeneraltyByID() {
      GetGeneraltyByID({
        GeneraltyID: this.generalID,
      }).then((res) => {
        if (res) {
          this.generalInfo = {
            ...res.Data,
            Title: res.Data.PatientName + " - " + res.Data.Phone,
          };
          this.generalInfo.TeethLst = this.generalInfo.TeethLst.map(
            (item, index) => {
              return {
                ...item,
                Key: index + 1,
                TeethShow: "Răng số " + item.Teeth,
                TypeTeeth: res.Data.TypeTeeth,
              };
            }
          );
          if (this.generalInfo.PathlogicalLst) {
            var dataPathAll = this.generalInfo.PathlogicalLst.filter(
              (p) => p.Type == "Tiền sử bệnh toàn thân"
            );
            this.pathAll = [...pathAll];
            console.log(pathAll);
            for (var i = 0; i < dataPathAll.length; i++) {
              var item = dataPathAll[i];
              this.pathAll.find(
                (p) => p.Text == item.Pathological
              ).CheckBox = true;
            }
            var dataPathTeeth = this.generalInfo.PathlogicalLst.filter(
              (p) => p.Type == "Tiền sử bệnh răng miệng"
            );
            this.pathTeeth = [...pathTeeth];
            for (var i = 0; i < dataPathTeeth.length; i++) {
              var item = dataPathTeeth[i];
              this.pathTeeth.find(
                (p) => p.Text == item.Pathological
              ).CheckBox = true;
            }
          }
        }
      });
    },
  },
  created() {
    this.generalID = this.$route.params.id;
    this.getGeneraltyByID();
    this.getEmployLst();
  },
};
</script>

<style></style>
