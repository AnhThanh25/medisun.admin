<template>
  <v-card>
    <v-card-title class="text-h6 py-4"> Dữ liệu mặc định </v-card-title>
    <v-data-table-server :items-length="totalLength"
      @update:itemsPerPage="btRow"
      @update:page="btPage"
      no-data-text="Không có dữ liệu"
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
              class="ml-4"
              variant="outlined"
              hide-details
              density="compact"
             style="width: 250px !important"
              prepend-inner-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </span>

          <v-btn
            color="blue"
            variant="tonal"
            @click="isShowCreateDefault = true"
            icon="mdi-text-box-plus"
            style="height: 42px"
          ></v-btn>
        </div>
      </template>
      <template v-slot:item.Action="{ item }">
        <v-icon
          color="primary"
          size="small"
          class="me-2"
          @click="btShowUpdate(item.raw)"
          >mdi-pencil
        </v-icon>

        <v-icon color="primary" size="small" @click="btShowDel(item.raw)">
          mdi-delete
        </v-icon>
      </template>
     </v-data-table-server>
  </v-card>
  <v-dialog v-model="isShowCreateDefault" persistent width="500">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Thêm giá trị</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="defaultInfo.Table"
              label="Trường thông tin"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="defaultInfo.Value"
              label="Giá trị"
              hide-details
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowCreateDefault = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="addDefault"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowUpdateDefault" persistent width="500">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Cập nhật thông tin dịch vụ</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="defaultUpdate.Table"
              label="Trường thông tin"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="defaultUpdate.Value"
              label="Giá trị"
              hide-details
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isShowUpdateDefault = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="updateDefault"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowDelDefault" width="400">
    <v-card>
      <v-toolbar
        class="pl-2"
        color="error"
        title="Xóa giá trị mặc định"
        center
      ></v-toolbar>
      <v-card-text>
        <div class="text-h5 pt-4">
          Có chắc bạn muốn xóa giá trị mặc định này không?
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="blue" variant="text" @click="isShowDelDefault = false"
          >Đóng</v-btn
        >
        <v-btn variant="text" @click="delDefault">Xóa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script>
import {
  GetDefaultLst,
  GetDefaultValue,
  CreateDefaultValue,
  UpdateDefaultValue,
  DelDefaultValue,
} from "@/api/default";
export default {
  data() {
    return {
      defaultInfo: {},
      isShowDelDefault: false,
      isShowUpdateDefault: false,
      isShowCreateDefault: false,
      search: "",
      headers: [
        { title: "STT", sortable: false, key: "Key" },
        { title: "Trường thông tin", key: "Table", sortable: false },
        { title: "Giá trị", key: "Value", sortable: false },
        { title: "", key: "Action" },
      ],
      desserts: [],

      pageNumber: 1,
      rowspPage: 10,
      search: "",
      date: null,
      defaultUpdate: {},
      price: null,
      itemDel: {},
    };
  },

  methods: {
    btShowDel(data) {
      this.itemDel = { ...data };
      this.isShowDelDefault = true;
    },
    delDefault() {
      DelDefaultValue({ ID: this.itemDel.RowID, Status: 0 }).then((res) => {
        if (res) {
          this.isShowDelDefault = false;
          this.getDefaultLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Xóa giá trị mặc định thành công",
          });
        }
      });
    },
    addDefault() {
      CreateDefaultValue({
        DefaultValueInfo: { ...this.defaultInfo, },
      }).then((res) => {
        if (res) {
          this.isShowCreateDefault = false;
          this.getDefaultLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Thêm mới dịch vụ thành công",
          });
        }
      });
    },

    btShowUpdate(data) {
      this.defaultUpdate = { ...data };
      this.isShowUpdateDefault = true;
    },
    updateDefault() {
      UpdateDefaultValue({
        DefaultValueInfo: { ...this.defaultUpdate },
      }).then((res) => {
        if (res) {
          this.isShowUpdateDefault = false;
          this.getDefaultLst();
          notify({
            type: "success",
            title: "Thành công",
            text: "Cập nhật giá trị mặc định thành công",
          });
        }
      });
    },
    getDefaultLst() {
      GetDefaultLst({}).then((res) => {
        if (res) {
          this.desserts = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
            };
          });
        }
      });
    },
  },
  created() {
    this.getDefaultLst();
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
