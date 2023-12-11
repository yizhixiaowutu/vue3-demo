<template>
  <div id="css-background" class="grid grid-cols-4 gap-4">
    <div class="h-100 w-100">1</div>
    <div class="h-100 w-100">2</div>
    <div class="h-100 w-100">3</div>
    <div class="h-100 w-100">4</div>
    <div class="h-100 w-100">5</div>
    <div class="h-100 w-100">6</div>
    <div class="h-100 w-100">7</div>
    <div class="h-100 w-100">8</div>
    <div class="h-100 w-100">9</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
#css-background {
  div {
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    line-height: 100px;
  }
}
</style>
