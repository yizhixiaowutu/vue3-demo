<template>
  <img
    id="rotating-image"
    src="https://phpimg.ziroom.com/99a9e21e-fb1a-4a05-993e-e662df61db75.png"
    alt=""
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
let angle = 0
let speed = 1 // 初始速度
const acceleration = 0.25 // 加速度
const accelerationReverse = 0.5 // 退回加速度
const rotateEl = ref<HTMLElement>()
const stop = ref(false)

function rotateImage() {
  if (stop.value) return
  if (speed >= 60) speed = 60
  angle += speed
  rotateEl.value!.style.transform = `rotate(${angle}deg)`
  speed += acceleration // 增加速度
  requestAnimationFrame(rotateImage) // 使用requestAnimationFrame来平滑动画
}

function rotateImageReverse() {
  if (angle <= 0) {
    angle = 0
    rotateEl.value!.style.transform = `rotate(${angle}deg)`
    return
  }
  angle -= speed
  rotateEl.value!.style.transform = `rotate(${angle}deg)`
  speed += accelerationReverse // 减小速度
  requestAnimationFrame(rotateImageReverse)
}

onMounted(() => {
  rotateEl.value = document.getElementById('rotating-image') as HTMLElement
  rotateEl.value!.addEventListener('mouseover', () => {
    stop.value = false
    rotateImage()
  })
  rotateEl.value.addEventListener('mouseleave', () => {
    stop.value = true
    rotateImageReverse()
  })
})
</script>

<style lang="scss" scoped>
#rotating-image {
  width: 50px;
  &:hover {
    cursor: pointer;
  }
  transition: transform 1s;
  transform-origin: center;
}
</style>
