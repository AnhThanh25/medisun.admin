<template>
  <div class="logo">
    <RouterLink to="/">
        <img src="../../../assets/images/logos/logo-dark.svg" />
    </RouterLink>
    <div class="title">PK - POS</div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<style lang="scss" scoped>
.logo{
  display: flex;
}
.title{
  font-size: 24px;
  text-decoration: none !important;
  color: #11142D;
  font-weight: 700;
}

</style>
