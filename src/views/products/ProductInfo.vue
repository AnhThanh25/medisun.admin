<template>
  <VDialog
    v-model="dialog"
    width="800"
  >
    <VCard :title="`${productID} - ${nameProduct} `">
      <VCardText>
        <!-- 👉 Form -->
        <VForm ref="checkValid">
          <VRow>
            <VCol
              md="12"
              cols="12"
            >
              <VTextField
                v-model="product.name"
                type="text"
                label="Tên sản phẩm"
                :rules="rules"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model.lazy="product.imprice"
                v-number="number"
                label="Giá nhập"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model.lazy="product.exprice"
                v-number="number"
                label="Giá bán"
                :rules="rules"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="product.barcode"
                label="Mã vạch"
                type="text"
                :rules="rules"
                append-inner-icon="mdi-barcode-scan"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <!-- <VTextField
                v-model="product.tag"
                label="Phân loại"
                type="text"
              /> -->
              <VSelect
                v-model="product.tag"
                label="Phân loại"
                :items="tagLst"
              />
            </VCol>
            <VCol
              cols="12"
              md="12"
            >
              <VTextField
                v-model="product.description"
                type="text"
                label="Link mua hộ"
              />
            </VCol>
            <VCol
              cols="12"
              md="12"
            >
              <VTextarea
                v-model="product.detail"
                label="Mô tả"
                type="text"
              />
            </VCol>
            <VCol
              cols="12"
              md="8"
            >
              <VCombobox
                v-model="product.unit"
                label="Đơn vị"
                :items="titleUnitLst"
              />
            </VCol>
            <VCol
              cols="12"
              md="4"
            >
              <VSelect
                v-model="product.productType"
                label="Trạng thái"
                :items="recommendStatus"
              />
            </VCol>
            <VCol
              cols="12"
              md="8"
            >
              <!-- {{ imgList }} === {{ previewImage }} === {{ previewImageUrl }} -->

              <VFileInput
                v-model:model-value="imgList"
                color="deep-purple-accent-4"
                counter
                clearable="true"
                accept="image/*"
                label="Ảnh sản phẩm"
                placeholder="Ảnh sản phẩm"
                prepend-icon="mdi-image"
                variant="outlined"
                :show-size="1000"
                @change="uploadImage"
              />
            </VCol>
            <VCol
              cols="12"
              md="4"
            >
              <VImg
                v-if="previewImageUrl"
                :src="previewImageUrl"
              />
              <VImg
                v-else-if="previewImage"
                :src="previewImage"
              />
            </VCol>
            <VCol
              col="12"
              md="12"
            >
              <div class="d-flex justify-space-between align-center">
                <div class="item-title">Bảng đơn vị</div>
                <VBtn @click="isShowCreate = true"> Thêm đơn vị </VBtn>
              </div>
              <VDataTable
                v-model:items-per-page="itemsPerPage"
                :page="page"
                :headers="headers"
                :items="listUnit"
                :loading="loading"
                multi-sort
                class="text-body-2 no-row-divider mt-4"
              >
                <template #item.index="{ item }">
                  {{ item.index + 1 }}
                </template>
                <template #item.price="{ item }">
                  {{ nf.toCurrency(item.raw.price) }}
                </template>
                <template #[`item.actions`]="{ item }">
                  <VBtn
                    variant="plain"
                    icon="mdi-cog"
                    color="warning"
                    @click="updateUnit(item.raw)"
                  >
                    <VIcon icon="mdi-square-edit-outline" />
                    <VTooltip
                      activator="parent"
                      location="top"
                    >
                      Cập nhật
                    </VTooltip>
                  </VBtn>
                  <VBtn
                    variant="plain"
                    icon="mdi-cog"
                    color="error"
                    @click="deleteUnit(item.raw)"
                  >
                    <VIcon icon="mdi-trash" />
                    <VTooltip
                      activator="parent"
                      location="top"
                    >
                      Xoá
                    </VTooltip>
                  </VBtn>
                </template>
                <template #bottom>
                  <div class="text-center pt-2">
                    <TablePaginationDefault
                      v-model:page="page"
                      v-model:itemsPerPage="itemsPerPage"
                      :total-items="listUnit.length"
                      label="giá trị"
                    />
                  </div>
                </template>
              </VDataTable>
            </VCol>
            <VCol
              cols="12"
              class="d-flex flex-wrap gap-4"
            >
              <VBtn
                :loading="isLoadingUpdate"
                @click="onUpdateProductInfo"
              >
                Cập nhật thông tin
              </VBtn>
              <VSpacer />
              <VBtn
                color="error"
                :loading="isLoadingDel"
                @click="onCheckDelete"
              >
                Xoá sản phẩm
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
    <VBtn
      class="close-btn"
      variant="text"
      icon="mdi-close"
      @click="dialog = false"
    />
  </VDialog>
  <Confirmation
    v-model:modelValue="dialogConfirm"
    message="Bạn có chắc chắn muốn xoá sản phẩm này?"
    @yes="onDelete"
  />
  <AddProductUnit
    v-model:dialog="isShowCreate"
    :product-i-d="productID"
    :units="recommendUnits"
    @success="getProductUnitLst"
  />
  <DeleteProductUnit
    v-model:dialog="isShowDelete"
    :product-i-d="productID"
    :product-unit-id="idProductUnit"
    @success="getProductUnitLst"
  />
  <EditProductUnit
    v-if="selectedProductUnit && isShowEdit"
    v-model:dialog="isShowEdit"
    :product-i-d="productID"
    :selected-product-unit="selectedProductUnit"
    :units="recommendUnits"
    @success="getProductUnitLst"
  />
</template>

<script setup>
import { useCustomToast } from '@/utils/custom-toast'
import { useFetchOrderTypeList } from '@/api/default-api'
import AddProductUnit from '@/components/product/AddProductUnit.vue'
import DeleteProductUnit from '@/components/product/DeleteProductUnit.vue'
import EditProductUnit from '@/components/product/EditProductUnit.vue'
import TablePaginationDefault from '@/components/TablePaginationDefault.vue'
import Confirmation from '@/components/Confirmation.vue'
import { getDelProduct, getUpdateProduct, getUploadProductImage, getProductUnit } from '@/api/product-api'
import { useAuthStore } from '@/stores/auth'
import { useNumberFormat } from '@/utils/num'

const props = defineProps({
  selectedProduct: {
    type: Object,
    required: true,
  },
  dialog: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:dialog', 'success'])
const nf = useNumberFormat()

const dialog = computed({
  get: () => props.dialog,
  set: value => emit('update:dialog', value),
})

const rules = [value => !!value || 'Không được để trống']
const ruleDescription = [value => (value?.length ?? 0) <= 350 || 'Độ dài mô tả không quá 350 kí tự']
const recommendStatus = ref(['Public', 'Private'])

const toast = useCustomToast()

const headers = ref([
  {
    title: 'STT',
    key: 'index',
    sortable: false,
  },
  {
    title: 'Tên',
    key: 'unit',
    sortable: false,
  },
  {
    title: 'Giá trị quy đổi',
    key: 'quantity',
    sortable: false,
  },
  {
    title: 'Giá bán',
    key: 'price',
    sortable: false,
  },
  {
    title: 'Chức năng',
    key: 'actions',
    sortable: false,
  },
])

const page = ref(1)
const itemsPerPage = ref(5)
const loading = ref(false)
const listUnit = ref([])
const selectedProduct = ref(null)
const recommendUnits = ref([])
const tagLst = ref([])
const nameProduct = ref(null)
const productID = ref(null)
const previewImageUrl = ref(null)
const imgList = ref([])
const titleUnitLst = ref([])
const idProductUnit = ref(null)
const selectedProductUnit = ref(null)
const isLoadingUpdate = ref(false)
const checkValid = ref(null)

const product = reactive({
  name: '',
  imprice: '',
  exprice: '',
  tag: '',
  barcode: '',
  description: '',
  detail: '',
  unit: '',
  image: '',
  productType: '',
})

const init = () => {
  selectedProduct.value = props.selectedProduct.item.raw

  product.name = selectedProduct.value.name
  product.imprice = selectedProduct.value.imprice
  product.tag = selectedProduct.value.tag
  product.exprice = selectedProduct.value.exprice
  product.barcode = selectedProduct.value.barcode
  product.description = selectedProduct.value.description
  product.detail = selectedProduct.value.detail
  product.productType = selectedProduct.value.productType
  nameProduct.value = selectedProduct.value.name
  productID.value = selectedProduct.value.productId
  product.unit = selectedProduct.value.unit
  previewImageUrl.value = selectedProduct.value.imgList[0] ? selectedProduct.value.imgList[0].LinkImage : ''
}

const fetchImage = () => {
  const { username, token, storeCode } = storeToRefs(useAuthStore())
  const url = `http://202.191.56.71/techssoposapi/File/UploadImageProduct?UserName=${username.value}&Token=${token.value}&StoreCode=${storeCode.value}&ProductID=${productID.value}&TypeImg=1`
  const { data, error, isLoading } = getUploadProductImage(url, imgList.value[0])

  watch(error, value => {
    toast.showErrorToast(value.message)
  })
  watch(data, value => {
    toast.showSuccessToast('Thay đổi ảnh sản phẩm thành công')
  })
}

const fetchRecommendUnits = () => {
  const { valueLst } = useFetchOrderTypeList('ProductUnit')

  watchEffect(() => {
    recommendUnits.value = valueLst.value
  })
}

const fetchTagLst = () => {
  const { valueLst } = useFetchOrderTypeList('ProductType')

  watchEffect(() => {
    tagLst.value = valueLst.value
  })
}

const deleteUnit = item => {
  isShowDelete.value = true
  idProductUnit.value = item.productUnitId
}

const updateUnit = item => {
  isShowEdit.value = true
  selectedProductUnit.value = item
}

const getProductUnitLst = () => {
  const { units, error, isLoading, titleUnit } = getProductUnit(productID.value)

  watch(units, value => {
    listUnit.value = value
  })
  watch(titleUnit, value => {
    titleUnitLst.value = value
    if (!titleUnitLst.value.includes(product.unit)) {
      titleUnitLst.value.push(product.unit)
    }
  })
}

const isShowCreate = ref(false)
const isShowDelete = ref(false)
const isShowEdit = ref(false)
const isBatch = ref(false)
const isLoadingDel = ref(false)
const dialogConfirm = ref(false)

const uploadImage = e => {
  if (e.target.files.length != 0) {
    imgList.value = [e.target.files[0]]

    const image = e.target.files[0]

    const reader = new FileReader()

    reader.readAsDataURL(image)
    reader.onload = e => {
      previewImageUrl.value = e.target.result
    }
    fetchImage()
  }
}

const onUpdateProductInfo = async () => {
  let batch = 0
  if (isBatch.value) {
    batch = 1
  }
  const { valid } = await checkValid.value.validate()
  if (valid) {
    const { data, isLoading, error } = getUpdateProduct(
      product.name,
      product.imprice,
      product.exprice,
      product.barcode,
      product.tag,
      product.description,
      product.unit,
      batch,
      listUnit.value,
      productID.value,
      product.detail,
      product.productType,
    )

    watch(data, value => {
      toast.showSuccessToast('Cập nhật sản phẩm thành công')
      dialog.value = false
      emit('success', true)
    })
    watch(error, value => {
      toast.showErrorToast(value.message)
    })
    watchEffect(() => {
      isLoadingUpdate.value = isLoading.value
    })
  }
}

const onCheckDelete = () => {
  dialogConfirm.value = true
}

const onDelete = () => {
  const { data, error, isLoading } = getDelProduct(productID.value)

  watch(data, value => {
    toast.showSuccessToast('Xóa sản phẩm thành công')
    emit('success', true)
    dialog.value = false
  })
  watch(error, value => {
    toast.showErrorToast(value.message)
  })
  watchEffect(() => {
    isLoadingDel.value = isLoading.value
  })
}

onMounted(() => {
  init()
  getProductUnitLst()
  fetchRecommendUnits()
  fetchTagLst()
})
</script>

<style lang="scss" scoped>
.item-title {
  font-size: 16px;
  font-weight: 500;
}
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
