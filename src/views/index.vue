<template>
  <div class="main-page">
    <div class="router-btn">
      <a-button @click="toG6">g6路由</a-button>
      <a-button @click="toFileSaver">file-saver路由</a-button>
      <a-button @click="toElementPlus">element-plus路由</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

const toG6 = () => {
  router.push("/g6");
};
const toFileSaver = () => {
  router.push("/file-saver");
};
const toElementPlus = () => {
  router.push("/element-plus");
};
</script>

<style lang="scss" scoped>
.main-page {
  /* background-color: #d4d7de; */
  padding: 1rem;
  .router-btn {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
