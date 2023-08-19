<template>
  <div class="item">
    <div class="line" :class="'line-color'+type"></div>
    <div class="top">
      <img src="/assets/images/products/1.jpg" alt="" class="img" />
      <div class="right">
        <div class="name">Bùi Anh Thành</div>
        <div class="phone">0397613784</div>
      </div>
    </div>
    <div class="bt">
      <v-icon icon="mdi-clipboard-text icon"></v-icon>
      <v-icon icon="mdi-clipboard-plus icon"></v-icon>
      <v-icon icon="mdi-folder icon"></v-icon>
      <v-icon icon="mdi-dots-horizontal icon"></v-icon>
    </div>
    <div class="bottom" :class="'color'+type">
      <div><span style="color: #64748b">Phòng:</span> 8</div>
      <div>BN000012</div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        type:Number
    }
};
</script>
<style lang="scss" scoped>
.item {
  background: #f2f5f8;
  padding: 12px;
  width: calc(100% - 24px);
  //   margin-right: 24px;
  border-radius: 8px;
  position: relative;
  .line {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 8px;

    border-radius: 8px 8px 0 0;
  }

  .top {
    display: flex;
    padding-top: 8px;
    .img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    .right {
      margin-left: 8px;
      .name {
        font-weight: 600;
        font-size: 15px;
      }
      .phone {
        font-size: 13px;
      }
    }
  }
  .bt {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    font-size: 18px;
    margin-top: 10px;
    .icon {
      margin: auto;
      color: #64748b;
      cursor: pointer;
      &:hover {
        color: rgb(var(--v-theme-secondary));
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin-top: 4px;
    font-weight: bold;
    // color: rgb(var(--v-theme-accent));
  }
}
.line-color1 {
  background: rgb(var(--v-theme-error));
}
.line-color2 {
  background: rgb(var(--v-theme-primary));
}
.line-color3 {
  background: rgb(var(--v-theme-success));
}
.color1 {
  color: rgb(var(--v-theme-error));
}
.color2 {
  color: rgb(var(--v-theme-primary));
}
.color3 {
  color: rgb(var(--v-theme-success));
}
</style>
