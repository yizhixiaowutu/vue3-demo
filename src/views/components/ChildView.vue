<template>
  <div class="child">
    <div class="header">
      <h2>Child Page</h2>
    </div>
    <div class="container">
      <p>Child Msg: {{ childMsg }}</p>
      <p>Props Number: {{ pNum }}</p>
      <p>pNumCopy: {{ pNumCopy }}</p>
    </div>
    <div class="operate">
      <el-button @click="click">Child Click</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  pNum: {
    type: Number,
    required: true,
  },
});
const childMsg = ref(0);
const pNumCopy = ref(props.pNum);
function click() {
  pNumCopy.value += 1;
}
</script>

<style scoped>
.child {
  padding: 2rem;
  margin: 2rem;
  background-color: #292d3e;
  color: #fff;
}
.operate {
  margin: 10px 0;
}
</style>
