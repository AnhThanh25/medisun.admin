<template>
  <v-row>
    <v-col lg="8">
      <v-card>
        <v-card-title>
          <div class="d-flex" style="justify-content: space-between">
            <h6 class="text-h6 px-3 py-2">Tạo phiếu khám</h6>
            <div>
              <!-- <v-btn>Chọn PKTQ</v-btn> -->
              <v-btn color="secondary" class="ml-2" @click="btSavePK"
                >Lưu phiếu</v-btn
              >
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-autocomplete
                v-model="medicalInfo.PatientID"
                label="Số điện thoại - Khách hàng"
                :items="patientLst"
                item-title="Title"
                item-value="PatientID"
                @update:search="btFilter"
              >
                <template v-slot:append>
                  <v-btn
                    icon="mdi-plus"
                    variant="tonal"
                    color="secondary"
                    @click="btShowCreate"
                  ></v-btn>
                </template>
              </v-autocomplete>
              <v-select
                v-model="medicalInfo.EmployCare"
                :items="employLst"
                label="Nhân viên phụ trách"
                item-title="Title"
                item-value="UserName"
              ></v-select>
              <VDatePicker2
                locale="vi"
                v-model="medicalInfo.TimeCreate"
                mode="date"
                :masks="masks"
              >
                <template #default="{ inputValue, inputEvents }">
                  <v-text-field
                    v-model="medicalInfo.TimeCreate"
                    :value="inputValue"
                    v-on="inputEvents"
                    label="Ngày khám"
                    append-inner-icon="mdi-calendar"
                  />
                </template>
              </VDatePicker2>
              <VDatePicker2
                locale="vi"
                v-model="medicalInfo.DateReturn"
                mode="date"
                :masks="masks"
              >
                <template #default="{ inputValue, inputEvents }">
                  <v-text-field
                    v-model="medicalInfo.DateReturn"
                    :value="inputValue"
                    v-on="inputEvents"
                    label="Tái khám"
                    append-inner-icon="mdi-calendar"
                  />
                </template>
              </VDatePicker2>
              <v-text-field
                label="Ghi chú"
                v-model="medicalInfo.Note"
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
          <v-row style="padding: 0 12px">
            <span style="width: calc(50% - 12px)">
              <v-text-field
                v-model="searchMedical"
                label="Tìm kiếm dịch vụ/thuốc"
                class=""
                variant="outlined"
                hide-details
                density="compact"
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </span>
            <v-btn-toggle
              v-model="typeTab"
              color="primary"
              group
              style="padding-left: 24px"
              density="compact"
            >
              <v-btn :value="true"> Dịch vụ </v-btn>
              <v-btn :value="false"> Đơn thuốc </v-btn>
            </v-btn-toggle>
          </v-row>
          <div v-if="typeTab">
            <v-row v-if="serviceLst.Odd">
              <swiper
                v-if="serviceLst.Odd.length > 0"
                class="mySwiper swiper-pk"
                :modules="modules"
                :slides-per-view="4"
                :space-between="8"
                :pagination="{ clickable: true }"
              >
                <swiper-slide
                  v-for="(item, index) in serviceLst.Odd"
                  :key="index"
                  ><v-card
                    class="item-service"
                    @click="btShowService(serviceLst.Odd[index], true)"
                  >
                    <template v-slot:title>
                      <span style="font-size: 14px">{{
                        serviceLst.Odd[index].ServiceName
                      }}</span>
                    </template>
                    <template v-slot:subtitle>
                      {{
                        new Intl.NumberFormat().format(
                          serviceLst.Odd[index].Price
                        )
                      }}đ
                    </template>
                  </v-card>
                  <v-card
                    class="item-service"
                    v-if="serviceLst.Even[index]"
                    @click="btShowService(serviceLst.Even[index], true)"
                  >
                    <template v-slot:title>
                      <span style="font-size: 14px">{{
                        serviceLst.Even[index].ServiceName
                      }}</span>
                    </template>
                    <template v-slot:subtitle>
                      {{
                        new Intl.NumberFormat().format(
                          serviceLst.Even[index].Price
                        )
                      }}đ
                    </template>
                  </v-card>
                </swiper-slide>
              </swiper>
            </v-row>

            <v-data-table-server :items-length="totalLength"
      @update:itemsPerPage="btRow"
      @update:page="btPage"
              no-data-text="Không có dữ liệu"
              :headers="headers"
              :items="medicalInfo.TipMedicalLst"
              :search="search"
              sort-asc-icon="mdi-menu-up"
              sort-desc-icon="mdi-menu-down"
              :hide-default-footer="true"
              :disable-pagination="true"
              :items-per-page="-1"
              class="table-pres"
            >
              <template v-slot:item.Price="{ item }">
                {{ new Intl.NumberFormat().format(item.raw.Price) }}
              </template>
              <template v-slot:item.Total="{ item }">
                {{ new Intl.NumberFormat().format(item.raw.Total) }}
              </template>
              <template v-slot:item.Discount="{ item }">
                <span v-if="item.raw.Discount">
                  {{ new Intl.NumberFormat().format(item.raw.Discount) }}
                </span>
              </template>
              <template v-slot:item.Action="{ item }">
                <v-icon
                  color="primary"
                  size="small"
                  class="me-2"
                  @click="btShowService(item.raw, false)"
                  >mdi-pencil
                </v-icon>

                <v-icon
                  color="primary"
                  size="small"
                  @click="btRemoveService(item.raw)"
                >
                  mdi-delete
                  <v-tooltip text="Xóa"> </v-tooltip>
                </v-icon>
              </template>
             </v-data-table-server>
          </div>
          <div v-else>
            <v-row v-if="productLst.Odd">
              <swiper
                v-if="productLst.Odd.length > 0"
                class="mySwiper swiper-pk"
                :modules="modules"
                :slides-per-view="4"
                :space-between="8"
                :pagination="pagination"
              >
                <swiper-slide
                  v-for="(item, index) in productLst.Odd"
                  :key="index"
                >
                  <v-card
                    class="item-service"
                    @click="btShowProduct(productLst.Odd[index], true)"
                  >
                    <template v-slot:title>
                      <span style="font-size: 14px">{{
                        productLst.Odd[index].ProductName
                      }}</span>
                    </template>
                    <template v-slot:subtitle>
                      {{
                        new Intl.NumberFormat().format(
                          productLst.Odd[index].Exprice
                        )
                      }}đ
                    </template>
                  </v-card>
                  <v-card
                    class="item-service"
                    v-if="productLst.Even[index]"
                    @click="btShowProduct(productLst.Even[index], true)"
                  >
                    <template v-slot:title>
                      <span style="font-size: 14px">{{
                        productLst.Even[index].ProductName
                      }}</span>
                    </template>
                    <template v-slot:subtitle>
                      {{
                        new Intl.NumberFormat().format(
                          productLst.Even[index].Exprice
                        )
                      }}đ
                    </template>
                  </v-card>
                </swiper-slide>
              </swiper>
            </v-row>

            <v-data-table-server :items-length="totalLength"
      @update:itemsPerPage="btRow"
      @update:page="btPage"
              no-data-text="Không có dữ liệu"
              :headers="productHeaders"
              :items="medicalInfo.PrescriptionLst"
              :search="search"
              sort-asc-icon="mdi-menu-up"
              sort-desc-icon="mdi-menu-down"
              :hide-default-footer="true"
              :disable-pagination="true"
              :items-per-page="-1"
              class="table-pres"
            >
              <template v-slot:item.Action="{ item }">
                <v-icon
                  color="primary"
                  size="small"
                  class="me-2"
                  @click="btShowProduct(item.raw, false)"
                  >mdi-pencil
                </v-icon>

                <v-icon
                  color="primary"
                  size="small"
                  @click="btRemoveProduct(item.raw)"
                >
                  mdi-delete
                  <v-tooltip text="Xóa"> </v-tooltip>
                </v-icon>
              </template>
             </v-data-table-server>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="4">
      <v-card style="margin-left: -12px; width: calc(100% + 12px)">
        <v-card-title>
          <div class="d-flex" style="justify-content: space-between">
            <h6 class="text-h6 px-1 py-2">Hóa đơn dịch vụ</h6>
            <!-- <v-btn
              class="mt-2"
              variant="tonal"
              color="success"
              size="small"
              @click="addDebtMedical"
              >Xác nhận</v-btn
            > -->
          </div>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <p class="text-left">Tổng</p>
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold">
                {{ new Intl.NumberFormat().format(totalBill) }}đ
              </p>
            </v-col>

            <v-col cols="6" style="padding: 0 12px; margin: -4px 0">
              <p class="text-left">
                Giảm giá

                <v-menu
                  v-model="isMenuDiscount"
                  activator="parent"
                  transition="scale-transition"
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="text"
                      icon="mdi-plus"
                      color="success"
                      style="border-radius: 50% !important"
                      v-bind="props"
                    >
                    </v-btn>
                  </template>
                  <v-card min-width="300" style="padding-top: 20px !important">
                    <v-card-text>
                      <div class="d-flex">
                        <v-text-field
                          label="Số tiền giảm giá"
                          hide-details
                          color="success"
                          v-model="discountAllFormatted"
                        ></v-text-field>

                        <v-btn
                          class="ml-2"
                          variant="tonal"
                          size="large"
                          color="success"
                          @click="btSaveDiscountAll"
                        >
                          Lưu</v-btn
                        >
                      </div>
                    </v-card-text>
                  </v-card>
                </v-menu>
              </p>
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold">
                {{
                  new Intl.NumberFormat().format(
                    debtMedicalInfo.MoneyDiscount ?? 0
                  )
                }}đ
              </p>
            </v-col>
            <v-col cols="6">
              <p class="text-left">Đã thanh toán</p>
            </v-col>
            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold">
                {{ new Intl.NumberFormat().format(totalMoneyPaid) }}đ
              </p>
            </v-col>

            <v-col cols="6" style="padding: 0 12px; margin: -4px 0">
              <p class="text-left">
                Thanh toán
                <v-menu
                  v-model="isMenuCustomerPay"
                  activator="parent"
                  transition="scale-transition"
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="text"
                      icon="mdi-plus"
                      color="success"
                      style="border-radius: 50% !important"
                      v-bind="props"
                    >
                    </v-btn>
                  </template>
                  <v-card min-width="300" style="padding-top: 20px !important">
                    <v-card-text>
                      <div class="d-flex">
                        <v-text-field
                          label="Số tiền thanh toán"
                          hide-details
                          color="success"
                          v-model="customerPayFormatted"
                        ></v-text-field>

                        <v-btn
                          class="ml-2"
                          variant="tonal"
                          size="large"
                          color="success"
                          @click="btCustomerPay"
                        >
                          Lưu</v-btn
                        >
                      </div>
                    </v-card-text>
                  </v-card>
                </v-menu>
              </p>
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold text-success">
                {{ new Intl.NumberFormat().format(customerPay) }}đ
              </p>
            </v-col>

            <v-col cols="8" style="padding: 0 12px; margin: -4px 0">
              <p class="text-left">
                Hình thức thanh toán
                <v-menu activator="parent" transition="scale-transition">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="text"
                      icon="mdi-plus"
                      color="success"
                      style="border-radius: 50% !important"
                      v-bind="props"
                    >
                    </v-btn>
                  </template>

                  <v-list style="width: 150px">
                    <v-list-item
                      v-for="(item, index) in paymentLst"
                      :key="index"
                      :value="index"
                      @click="debtMedicalInfo.TypePay = item.Title"
                    >
                      <v-list-item-title>{{ item.Title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </p>
            </v-col>
            <v-col cols="4" style="text-align: right">
              <p class="text-right font-weight-bold">
                {{ debtMedicalInfo.TypePay }}
              </p>
            </v-col>

            <v-col cols="6">
              <p class="text-left">Còn nợ</p>
            </v-col>

            <v-col cols="6" style="text-align: right">
              <p class="text-right font-weight-bold text-error">
                {{ new Intl.NumberFormat().format(debtBill) }}đ
              </p>
            </v-col>
          </v-row>
          <v-divider style="margin: 16px 0" />
          <v-text-field
            label="Ghi chú"
            hide-details
            v-model="debtMedicalInfo.Note"
          ></v-text-field>
        </v-card-text>
      </v-card>
      <v-row class="mt-3">
        <v-btn color="success" class="mr-2">In phiếu khám</v-btn>
        <v-btn color="success" class="mr-2">In đơn thuốc</v-btn>
      </v-row>
    </v-col>
  </v-row>
  <v-dialog v-model="isShowAddService" persistent width="500">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2" v-if="typeService">Thêm dịch vụ</h6>
        <h6 class="text-h6 px-3 py-2" v-else>Cập nhật dịch vụ</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="serviceInfo.ServiceName"
                  label="Tên dịch vụ"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  label="Giá"
                  hide-details
                  v-model="priceFormatted"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  label="Giảm giá"
                  v-model="discountFormatted"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  label="Số lượng"
                  v-model="serviceInfo.Quantity"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  label="Đơn vị bán"
                  v-model="serviceInfo.Unit"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="serviceInfo.EmployCare"
                  :items="employLst"
                  label="Người thực hiện"
                  item-title="Title"
                  item-value="UserName"
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Mô tả"
                  v-model="serviceInfo.Description"
                  hide-details
                ></v-textarea>
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
          @click="isShowAddService = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="btAddService"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowAddProduct" persistent width="500">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">Kê đơn thuốc</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="productInfo.ProductName"
                  label="Tên sản phẩm"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  label="Giá"
                  hide-details
                  v-model="priceFormatted"
                ></v-text-field>
              </v-col>

              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  label="Đơn vị"
                  v-model="productInfo.Unit"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  label="Số lượng"
                  v-model="productInfo.Quantity"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  label="Liều dùng"
                  v-model="productInfo.Dosage"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Mô tả"
                  v-model="productInfo.Description"
                  hide-details
                ></v-textarea>
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
          @click="isShowAddProduct = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="btAddProduct"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isShowCreateCustomer" persistent width="600">
    <v-card>
      <v-card-title>
        <h6 class="text-h6 px-3 py-2">{{ patientInfo.Dialog }}</h6>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="patientInfo.PatientName"
                  label="Tên khách hàng"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Số điện thoại"
                  v-model="patientInfo.Phone"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="patientInfo.Sex"
                  :items="['Nam', 'Nữ', 'Không xác định']"
                  hide-details
                  label="Giới tính"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <VDatePicker2
                  locale="vi"
                  v-model="patientInfo.Birthday"
                  mode="date"
                  :masks="masks"
                >
                  <template #default="{ inputValue, inputEvents }">
                    <v-text-field
                      v-model="patientInfo.Birthday"
                      :value="inputValue"
                      v-on="inputEvents"
                      label="Ngày sinh"
                      append-inner-icon="mdi-calendar"
                      hide-details
                    />
                  </template>
                </VDatePicker2>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="patientInfo.City"
                  label="Tỉnh/TP"
                  hide-details
                  :items="cityLst"
                  item-title="City"
                  item-value="City"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="patientInfo.District"
                  :items="districtLst"
                  item-title="District"
                  item-value="District"
                  label="Quận/Huyện"
                  hide-details
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="patientInfo.Commune"
                  :items="communeLst"
                  item-title="Commune"
                  item-value="Commune"
                  label="Phường/Xã"
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="patientInfo.Address"
                  label="Địa chỉ"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="patientInfo.Job"
                  label="Nghề nghiệp"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="patientInfo.EmployCare"
                  :items="employLst"
                  item-title="Title"
                  item-value="UserName"
                  label="Nhân viên phụ trách"
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
          @click="isShowCreateCustomer = false"
        >
          Đóng
        </v-btn>
        <v-btn @click="addPatientLst"> Lưu thông tin </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <notifications />
</template>

<script>
import { pathAll, pathTeeth } from "../../../utils/variable";
import { AddMedicalLst } from "@/api/medical";
import { GetEmployLst } from "@/api/user";
import { getRoleText } from "@/utils/role";
import { GetServiceLst } from "@/api/service";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { PKGetProductLst } from "@/api/product";
import "swiper/css";
import "swiper/css/pagination";
import { formatDate } from "@/helpers/getTime";
import { paymentLst } from "../variables";
import { GetPatientLst, AddPatientLst } from "@/api/patient";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict,
} from "@/api/default";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      isMenuDiscount: false,
      isMenuCustomerPay: false,
      pagination: {
        clickable: true,
        type: "fraction",
      },
      pathAll: pathAll,
      pathTeeth: pathTeeth,
      typeTab: true,
      paymentLst: paymentLst,
      headers: [
        { title: "STT", sortable: false, key: "Key" },
        { title: "Thủ thuật", key: "ServiceName", sortable: false },
        { title: "Thực hiện", key: "EmployCareName", sortable: false },
        { title: "Số lượng", key: "Quantity", sortable: false },
        { title: "Đơn giá", key: "Price", sortable: false },
        { title: "Giảm giá", key: "Discount", sortable: false },
        { title: "Tổng", key: "Total", sortable: false },
        { title: "", key: "Action", sortable: false },
      ],
      desserts: [],
      productHeaders: [
        {
          title: "STT",
          sortable: false,
          key: "Key",
          width: "60px",
        },
        { title: "Thuốc", key: "ProductName", sortable: false },
        // { title: "Giá", key: "Exprice", sortable: false },
        { title: "SL", key: "Quantity", sortable: false },
        { title: "Liều dùng", key: "Dosage", sortable: false },
        { title: "Mô tả", key: "Description", sortable: false },
        { title: "Action", key: "Action", width: "80px" },
      ],
      search: "",
      medicalInfo: {},
      medicalID: "",
      masks: {
        input: "DD-MM-YYYY",
      },
      employLst: [],
      serviceLst: {},
      modules: [Pagination],
      isShowAddService: false,
      serviceInfo: {},
      price: 0,
      typeService: true,
      productLst: [],
      pageNumber: 1,
      rowspPage: 100000,
      search: "",
      isShowAddProduct: false,
      typeProduct: false,
      productInfo: {},
      moneyDiscount: null,
      debtMedicalLst: [],
      debtMedicalInfo: { TypePay: "Tiền mặt" },
      discountAll: null,
      customerPay: null,
      cityLst: [],
      districtLst: [],
      communeLst: [],
      patientLst: [],
      patientInfo: {},
      isShowCreateCustomer: false,
      searchMedical: "",
    };
  },
  computed: {
    priceFormatted: {
      get: function () {
        return this.formatAsCurrency(this.price, 0);
      },
      set: function (newValue) {
        if (newValue) {
          this.price = Number(newValue?.replace(/[^0-9\.]/g, ""));
        } else {
          this.price = null;
        }
      },
    },
    discountFormatted: {
      get: function () {
        return this.formatAsCurrency(this.moneyDiscount, 0);
      },
      set: function (newValue) {
        if (newValue) {
          this.moneyDiscount = Number(newValue?.replace(/[^0-9\.]/g, ""));
        } else {
          this.moneyDiscount = null;
        }
      },
    },
    discountAllFormatted: {
      get: function () {
        return this.formatAsCurrency(this.discountAll, 0);
      },
      set: function (newValue) {
        if (newValue) {
          this.discountAll = Number(newValue?.replace(/[^0-9\.]/g, ""));
        } else {
          this.discountAll = null;
        }
      },
    },
    customerPayFormatted: {
      get: function () {
        return this.formatAsCurrency(this.customerPay, 0);
      },
      set: function (newValue) {
        if (newValue) {
          this.customerPay = Number(newValue?.replace(/[^0-9\.]/g, ""));
        } else {
          this.customerPay = null;
        }
      },
    },
    totalMoneyPaid() {
      var total = 0;
      if (this.debtMedicalLst.length > 0) {
        total = this.debtMedicalLst.reduce((a, b) => {
          return a + b.CustomerPay + b.MoneyDiscount;
        }, 0);
      }
      return total;
    },
    totalBill() {
      var total = 0;
      if (this.medicalInfo.TipMedicalLst) {
        total = this.medicalInfo.TipMedicalLst.reduce((a, b) => {
          return a + b.Quantity * b.Price - b.MoneyDiscount ?? 0;
        }, 0);
      }
      this.debtMedicalInfo.TotalMoney = total;
      return total;
    },
    debtBill() {
      var money = 0;
      money =
        this.totalBill -
        (this.debtMedicalInfo.MoneyDiscount ?? 0) -
        this.totalMoneyPaid -
        (this.debtMedicalInfo.CustomerPay ?? 0);
      this.debtMedicalInfo.Debt = money;
      return money;
    },
  },
  watch: {
    typeTab(newValue) {
      if (newValue) {
        // this.getServiceLst();
      } else {
        this.getProductLst();
      }
    },
    "patientInfo.City"() {
      this.getDistrictByCity();
    },
    "patientInfo.District"() {
      this.getCommuneByCityAndDistrict();
    },
    searchMedical(newValue) {
      if (this.typeTab) {
        this.getServiceLst(newValue);
      }
    },
  },
  methods: {
    addPatientLst() {
      AddPatientLst({
        Data: {
          ...this.patientInfo,
          Birthday: formatDate(this.patientInfo.Birthday),
          PathlogicalLst: [],
        },
      }).then((res) => {
        if (res) {
          this.isShowCreateCustomer = false;
          this.getPatientLst();
          if (this.patientInfo.Dialog == "Thêm khách hàng") {
            notify({
              type: "success",
              title: "Thành công",
              text: "Thêm khách hàng mới thành công",
            });
          }
        }
      });
    },
    getCity() {
      GetCity({}).then((res) => {
        if (res) {
          this.cityLst = res.Data;
        }
      });
    },
    getDistrictByCity() {
      if (this.patientInfo.City) {
        GetDistrictByCity({ City: this.patientInfo.City }).then((res) => {
          if (res) {
            this.districtLst = res.Data;
          }
        });
      }
    },
    getCommuneByCityAndDistrict() {
      if (this.patientInfo.City && this.patientInfo.District) {
        GetCommuneByCityAndDistrict({
          City: this.patientInfo.City,
          District: this.patientInfo.District,
        }).then((res) => {
          if (res) {
            this.communeLst = res.Data;
          }
        });
      }
    },
    btShowCreate() {
      this.isShowCreateCustomer = true;
      this.patientInfo = { Dialog: "Thêm khách hàng" };
    },
    btFilter(value) {
      this.getPatientLst(value);
    },
    getPatientLst(search) {
      GetPatientLst({
        PageNumber: 1,
        RowspPage: 10,
        Search: search,
      }).then((res) => {
        if (res) {
          this.patientLst = res.Data.map((item) => {
            return {
              ...item,
              Title: item.Phone + " - " + item.PatientName,
            };
          });
        }
      });
    },
    btCustomerPay() {
      this.isMenuCustomerPay = false;
      this.debtMedicalInfo.CustomerPay = this.customerPay;
    },
    btSaveDiscountAll() {
      this.isMenuDiscount = false;
      this.debtMedicalInfo.MoneyDiscount = this.discountAll;
    },

    btSavePK() {
      this.medicalInfo.PathlogicalLst = [];
      for (var i = 0; i < this.pathAll.length; i++) {
        var item = this.pathAll[i];
        if (item.CheckBox) {
          var path = {
            Type: "Tiền sử bệnh toàn thân",
            Pathological: item.Text,
          };
          this.medicalInfo.PathlogicalLst.push(path);
        }
      }
      for (var i = 0; i < this.pathTeeth.length; i++) {
        var item = this.pathTeeth[i];
        if (item.CheckBox) {
          var path = {
            Type: "Tiền sử bệnh răng miệng",
            Pathological: item.Text,
          };
          this.medicalInfo.PathlogicalLst.push(path);
        }
      }
      AddMedicalLst({
        Data: {
          ...this.medicalInfo,
          DateReturn: formatDate(this.medicalInfo.DateReturn),
          TipMedicalLst: this.medicalInfo.TipMedicalLst ?? [],
          PrescriptionLst: this.medicalInfo.PrescriptionLst ?? [],
        },
      }).then((res) => {
        if (res) {
          notify({
            type: "success",
            title: "Thành công",
            text: "Cập nhật phiếu khám thành công",
          });
          this.medicalID = res.MedicalID;
          this.$router.push("/kham-benh/cap-nhat-phieu-kham/" + this.medicalID);
        }
      });
    },
    getProductLst() {
      PKGetProductLst({
        PageNumber: this.pageNumber,
        RowspPage: this.rowspPage,
        Search: this.search,
      }).then((res) => {
        if (res) {
          var data = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              Quantity: 1,
            };
          });
          this.productLst.Even = data.filter((p) => p.Key % 2 == 0);
          this.productLst.Odd = data.filter((p) => p.Key % 2 != 0);
        }
      });
    },
    btShowProduct(data, isBool) {
      this.typeProduct = isBool;
      this.isShowAddProduct = true;
      this.productInfo = { ...data };
      this.priceFormatted = this.productInfo.Exprice.toString();
    },
    btAddProduct() {
      if (this.typeProduct) {
        var check = this.medicalInfo.PrescriptionLst.find(
          (p) => p.ProductID == this.productInfo.ProductID
        );
        if (check) {
          notify({
            type: "warn",
            title: "Nhắc nhở",
            text: "Thuốc này đã có trong đơn",
          });
          return;
        }
      } else {
        this.medicalInfo.PrescriptionLst =
          this.medicalInfo.PrescriptionLst.filter(
            (p) => p.ProductID != this.productInfo.ProductID
          );
      }
      this.medicalInfo.PrescriptionLst.push({
        ...this.productInfo,
        Total: this.productInfo.Quantity * this.productInfo.Exprice,
        Price: this.productInfo.Exprice,
      });
      this.medicalInfo.PrescriptionLst = this.medicalInfo.PrescriptionLst.map(
        (item, index) => {
          return {
            ...item,
            Key: index + 1,
          };
        }
      );
      this.isShowAddProduct = false;
    },
    btRemoveProduct(data) {
      this.medicalInfo.PrescriptionLst =
        this.medicalInfo.PrescriptionLst.filter(
          (p) => p.ProductID != data.ProductID
        ).map((item, index) => {
          return {
            ...item,
            Key: index + 1,
          };
        });
    },
    btAddService() {
      if (this.typeService) {
        if (this.medicalInfo.TipMedicalLst) {
          var check = this.medicalInfo.TipMedicalLst.find(
            (p) => p.ServiceID == this.serviceInfo.ServiceID
          );
          if (check) {
            notify({
              type: "warn",
              title: "Nhắc nhở",
              text: "Dịch vụ đã có trong phiếu",
            });
            return;
          }
        } else {
          this.medicalInfo.TipMedicalLst = [];
        }
      } else {
        this.medicalInfo.TipMedicalLst = this.medicalInfo.TipMedicalLst.filter(
          (p) => p.ServiceID != this.serviceInfo.ServiceID
        );
      }
      this.medicalInfo.TipMedicalLst.push({
        ...this.serviceInfo,
        EmployCareName: this.serviceInfo.EmployCare
          ? this.employLst.find(
              (p) => p.UserName == this.serviceInfo.EmployCare
            ).FullName
          : "",
        Total: this.serviceInfo.Quantity * this.serviceInfo.Price,
        TipID: this.serviceInfo.ServiceID,
        TipName: this.serviceInfo.ServiceName,
        MoneyDiscount: this.serviceInfo.MoneyDiscount ?? 0,
      });
      this.medicalInfo.TipMedicalLst = this.medicalInfo.TipMedicalLst.map(
        (item, index) => {
          return {
            ...item,
            Key: index + 1,
          };
        }
      );
      this.isShowAddService = false;
      console.log(this.medicalInfo.TipMedicalLst);
    },
    btShowService(data, isBool) {
      this.typeService = isBool;
      this.isShowAddService = true;
      this.serviceInfo = { ...data };
      this.priceFormatted = this.serviceInfo.Price.toString();
      if (isBool) {
        this.discountFormatted = null;
      } else {
        this.discountFormatted = this.serviceInfo.MoneyDiscount.toString();
      }
    },
    btRemoveService(data) {
      this.medicalInfo.TipMedicalLst = this.medicalInfo.TipMedicalLst.filter(
        (p) => p.ServiceID != data.ServiceID
      ).map((item, index) => {
        return {
          ...item,
          Key: index + 1,
        };
      });
    },
    formatAsCurrency(value, dec) {
      dec = dec || 0;
      if (value === null) {
        return "";
      }
      return (
        "" + value?.toFixed(dec).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
      );
    },
    getServiceLst(search) {
      GetServiceLst({
        PageNumber: 1,
        RowspPage: 1000,
        Search: search,
      }).then((res) => {
        if (res) {
          var data = res.Data.map((item, index) => {
            return {
              ...item,
              Key: index + 1,
              Quantity: 1,
            };
          });
          this.serviceLst.Even = data.filter((p) => p.Key % 2 == 0);
          this.serviceLst.Odd = data.filter((p) => p.Key % 2 != 0);
        }
      });
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
  },
  created() {
    this.medicalID = this.$route.params.id;
    this.getEmployLst();
    this.getServiceLst();
    this.getCity();
    this.getPatientLst("");
    // this.getDebtMedicalLst();
  },
};
</script>

<style lang="scss">
.table-pres {
  margin-top: 20px;
}
.swiper-pk {
  margin-top: 10px;
  width: calc(100% - 20px);
  .swiper-pagination {
    margin-bottom: -10px;
  }
  .item-service {
    margin-bottom: 0 !important;
    border-radius: 4px;
    background: #f7f7f7;
    height: calc(50% - 10px);
    margin-top: 8px;
    .v-card-item {
      .v-card-title {
        line-height: 16px;
        white-space: normal;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .v-card-subtitle {
      color: rgb(var(--v-theme-primary));
      opacity: 1;
    }
    &:hover {
      background: #03c9d718;
      color: #00b7c4;
      cursor: pointer;
    }
  }
}
</style>
