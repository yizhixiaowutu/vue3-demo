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
    <div class="css-model">
      <div class="css-model-block"></div>
      <div class="css-model-block bg-linear"></div>
      <div class="css-model-block bg-radial"></div>
      <div class="css-model-block bg-sanjiao"></div>
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

<style lang="scss" scoped>
.child {
  padding: 2rem;
  margin: 2rem;
  background-color: #292d3e;
  color: #fff;
}
.operate {
  margin: 10px 0;
}
.css-model {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  .css-model-block {
    border: 1px solid black;
    width: 100px;
    height: 100px;
    // background-color: transparent;
  }
  // 线性渐变
  .bg-linear {
    background: linear-gradient(#fff, #000);
  }
  // 径向渐变
  .bg-radial {
    background: radial-gradient(#fff, #000);
  }
  // 三角
  .bg-sanjiao {
    background: linear-gradient(#f00 0%, #f00 50%, #fff 50%, #fff 100%);
  }
}
</style>
