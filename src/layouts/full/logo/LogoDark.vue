<template>
  <div class="logo">
    <RouterLink to="/">
        <img src="@/assets/images/logos/medisun.png" />
    </RouterLink>
    <div class="title">Thiết Bị Y Tế - Medisun</div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<style lang="scss" scoped>
.logo{
  display: flex;
  img{
    height: 32px;
  }
}
.title{
  font-size: 16px;
  text-decoration: none !important;
  color: #11142D;
  font-weight: 700;
  margin-top: 6px;
  margin-left: 8px;
}

</style>
