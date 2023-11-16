<template>
  <h1>子页面</h1>
  <span>{{ numberRef }} - {{ numberConst }}</span>
  <br />
  <span>{{ reactiveObj.number1 }} - {{ reactiveObj.number2 }}</span>
</template>

<script setup lang="ts">
import { inject, watch } from "vue";
// const childNumber = ref(0);
const { numberRef, numberConst } = inject("number");
const reactiveObj = inject("reactiveObj");

watch(numberRef, () => {
  console.log("numberRef", numberRef.value);
  console.log("numberConst", numberConst);
});

watch(
  () => reactiveObj,
  () => {
    console.log("number2", reactiveObj.number2);
  },
  { deep: true }
);
watch(reactiveObj, () => {
  console.log("reactiveObj", reactiveObj);
});
</script>

<style scoped></style>
