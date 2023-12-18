<template>
  <div id="css-mask">
    <div class="mask1"></div>
    <div class="mask2">
      <div class="inner"></div>
    </div>
    <div class="mask3"></div>
  </div>
</template>

<script setup lang="ts">
const myAll = (promises) => {
  let arr: any[] = []
  let count = 0
  return new Promise((res, rej) => {
    promises.forEach((p, i) => {
      p.then((data) => {
        arr[i] = data
        count++
        if (count === promises.length) {
          res(arr)
        }
      }).catch((err) => {
        rej(err)
      })
    })
  })
}
</script>

<style lang="scss" scoped>
$bgImg1: 'https://phpimg.ziroom.com/f3edafa7-220c-4a2f-b25c-3597f2e7bf81.jpeg';
$bgImg2: 'https://phpimg.ziroom.com/69afb52a-52f8-468b-8745-5f89e6330561.jpeg';
.mask1 {
  width: 200px;
  height: 400px;
  position: relative;
  background: url($bgImg1) no-repeat;
  background-size: cover;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://phpimg.ziroom.com/69afb52a-52f8-468b-8745-5f89e6330561.jpeg')
      no-repeat;
    background-size: cover;
    mask: linear-gradient(45deg, #000 50%, transparent 50%);
  }
}
.mask2 {
  width: 200px;
  height: 400px;
  background: url($bgImg1) no-repeat;
  background-size: cover;

  .inner {
    width: 200px;
    height: 400px;
    background: url($bgImg2) no-repeat;
    background-size: cover;
    mask: linear-gradient(
      180deg,
      #fff 0%,
      #fff 50%,
      transparent 50%,
      transparent 100%
    );
    mask-size: 100% 200%;
    animation: maskChange 2s infinite alternate linear;
  }
  @keyframes maskChange {
    0% {
      // mask-position: -100% 0;
      mask-position: 0 -100%;
    }
    100% {
      mask-position: 0 0;
    }
  }
}
</style>
