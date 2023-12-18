<template>
  <div id="css-background" class="grid grid-cols-4 gap-4">
    <div class="h-100 w-100 bg-pure"></div>
    <div class="h-100 w-100 bg-lg-1"></div>
    <div class="h-100 w-100 bg-lg-2"></div>
    <div class="h-100 w-100 bg-lg-3"></div>
    <div class="h-100 w-100 bg-lg-4"></div>
    <div class="h-100 w-100 bg-lg-5"></div>
    <div class="h-100 w-100 bg-lg-6"></div>
    <div class="h-100 w-100"></div>
    <div class="h-100 w-100"></div>
    <div class="h-100 w-100"></div>
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
  // bg-pure
  .bg-pure {
    background-color: pink;
  }

  // bg-linear-gradient
  .bg-lg-1 {
    background: linear-gradient(#fff, #000);
  }
  .bg-lg-2 {
    background: linear-gradient(#fff, transparent);
  }
  .bg-lg-3 {
    background: linear-gradient(#fff 0%, #fff 50%, pink 50%, pink 100%);
  }
  .bg-lg-4 {
    background: linear-gradient(225deg, #fff 0%, #fff 50%, pink 50%, pink 100%);
  }
  .bg-lg-5 {
    background: linear-gradient(135deg, transparent 15px, deeppink 0),
      linear-gradient(-135deg, transparent 15px, deeppink 0),
      linear-gradient(-45deg, transparent 15px, deeppink 0),
      linear-gradient(45deg, transparent 15px, deeppink 0);
    background-size: 50% 50%, 50% 50%, 50% 50%, 50% 50%;
    background-position: top left, top right, bottom right, bottom left;
    background-repeat: no-repeat;
  }
  .bg-lg-6 {
    background: repeating-linear-gradient(
      45deg,
      #f06a0e,
      #f06a0e 11px,
      transparent 11px,
      transparent 20px
    );
  }
}
</style>
