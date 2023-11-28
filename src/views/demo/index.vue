<template>
  <div class="demo-page">
    <h1>Demo</h1>
    <div class="grid-container">
      <div class="grid-item">
        <span>图片旋转</span>
        <RotateImg />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RotateImg from './rotate-img.vue'
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px; /* 设置网格间距 */

  .grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 200px;
    border: 0.5px dashed #ccc; /* 设置网格项的边框样式 */
    padding: 10px; /* 可选，设置网格项的内边距 */
    border-radius: 10px;
  }
}
</style>
