<template>
  <v-card class="pa-4">
    <div class="d-sm-flex align-center mb-2">
      <div>
        <h3 class="text-h6 title font-weight-medium">Nhật ký hoạt động</h3>
      </div>
      <v-spacer></v-spacer>
      <div class="ml-auto">
        <div class="d-flex align-center">
          <div class="d-flex align-center px-2">
            <span class="text-secondary">
              <v-icon icon="mdi-dots-horizontal "></v-icon>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-for="i in 5" :key="i">
      <div class="item">
        <div class="icon">
          <v-icon icon="mdi-check"></v-icon>
        </div>
        <div class="text">
          <div class="title">Bác sĩ An vừa tạo PKTQ</div>
          <div class="time">12/08/2023 16:00</div>
        </div>
      </div>
      <v-divider></v-divider>
    </div>
  </v-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  margin-top: 12px;
  .icon {
    font-size: 16px;
    background: rgb(var(--v-theme-success), 0.1);
    color: rgb(var(--v-theme-success));
    padding: 8px;
    width: 40px;
    height: 42px;
    border-radius: 8px;
  }
  .text {
    margin-left: 16px;
    margin-bottom: 12px;
    .title {
      font-size: 15px;
      font-weight: 600;
      margin-top: -4px;
    }
    .time {
      font-size: 14px;
    }
  }
}
</style>
