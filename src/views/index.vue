<template>
  <div class="main-page">
    <div class="router-btn">
      <a-button @click="toG6">g6路由</a-button>
      <a-button @click="toFileSaver">file-saver路由</a-button>
      <a-button @click="toElementPlus">element-plus路由</a-button>
      <a-button @click="number++">number + 1</a-button>
      <a-button @click="number2++">number2 + 1</a-button>
    </div>
    <Children />
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, ref } from "vue";
import router from "@/router";
import Children from "./children.vue";

const number = ref(1);
const number2 = ref(1);
const reactiveObj = reactive({
  number1: number,
  number2: number2,
});
provide("reactiveObj", reactiveObj);
provide("number", {
  numberRef: number,
  numberConst: 999,
});
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
