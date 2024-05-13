<template>
  <div class="row pb-2">
    <div class="d-flex align-center pe-4 mt-3">
      <div class="ms-3">
        Tổng <strong>{{ props.totalItems }} {{ props.label }}</strong>
      </div>

      <VSpacer />

      <div class="w-50 d-none d-md-block">
        <VPagination
          v-model="page"
          :size="md ? `small` : `default`"
          :length="pageCount"
        />
      </div>

      <VSpacer />

      <div class="me-3">Mỗi trang</div>

      <div>
        <VSelect
          :model-value="itemsPerPage"
          type="number"
          :items="props.itemsPerPageOptions"
          width="128px"
          density="compact"
          @update:model-value="itemsPerPage = parseInt($event, 10)"
        />
      </div>
    </div>

    <div class="col-lg-3 d-block d-md-none" />

    <div class="text-center pt-2 col-12 col-md-12 col-lg-6 d-block d-md-none">
      <VPagination
        v-model="page"
        :size="md ? `small` : `default`"
        :length="pageCount"
      />
    </div>
  </div>
</template>

<script setup>
import { useScreen } from '@/utils/screen'
import { computed } from 'vue'

const props = defineProps({
  pageCount: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    default: 'item',
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [10, 20, 30, 50],
  },
})

const emit = defineEmits(['update:itemsPerPage', 'update:page'])

const { md } = useScreen()

const itemsPerPage = computed({
  get: () => props.itemsPerPage,
  set: value => {
    emit('update:itemsPerPage', value)
  },
})

const page = computed({
  get: () => props.page,
  set: value => {
    emit('update:page', value)
  },
})

const pageCount = computed(() => {
  return Math.ceil(parseFloat(props.totalItems) / parseFloat(props.itemsPerPage))
})
</script>
