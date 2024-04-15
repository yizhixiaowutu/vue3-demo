<template>
  <div class="w-full h-full p-8 three-page">
    <div class="mb-5">
      <el-button @click="boxesAnimate">BoxesAnimate</el-button>
      <el-button @click="timelineFunc">Timeline</el-button>
      <el-button @click="pause">Pause</el-button>
      <el-button @click="resume">Resume</el-button>
      <el-button @click="slowdown">Slowdown</el-button>
      <el-button @click="restart">Restart</el-button>
    </div>
    <div class="flex flex-col gap-8 boxes">
      <div class="box1 w-8 h-8 rounded-md bg-purple-400"></div>
      <div class="box2 w-8 h-8 rounded-md bg-red-400"></div>
      <div class="box3 w-8 h-8 rounded-md bg-green-400"></div>
    </div>
    <canvas class="webgl"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'

const timeline = gsap.timeline({
  defaults: {
    duration: 1,
  },
})

const box1Tween = ref<gsap.core.Tween | null>(null)

const boxesAnimate = () => {
  box1Tween.value = gsap.to('.box1', {
    duration: 2,
    x: '50vw',
  })
  gsap.from('.box2', { rotation: -360, x: -100, duration: 0.5 })
  gsap.fromTo('.box3', { x: -100 }, { rotation: 360, x: 100, duration: 1 })
}

const timelineFunc = () => {
  timeline
    .to('.box1', { duration: 2, x: 600 }, 1)
    .to('.box2', { x: 600 }, '<')
    .to('.box3', { rotation: 360, x: 600 }, '+=1')
}

const pause = () => {
  box1Tween.value?.pause()
}
const resume = () => {
  box1Tween.value?.resume()
}
const slowdown = () => {
  box1Tween.value?.timeScale(0.5)
}
const restart = () => {
  box1Tween.value?.restart()
}

onMounted(() => {})
</script>

<style scoped></style>
