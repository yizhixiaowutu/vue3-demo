<template>
  <div id="demo-page" class="demo-page">
    <h1>Demo</h1>
    <div class="grid-container">
      <div class="grid-item">
        <span>图片旋转</span>
        <RotateImg />
      </div>
    </div>
    <h1>canvas</h1>
    <div class="grid-container canvas-container"></div>
    <el-button @click="nextCanvasFunc">下一个</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import RotateImg from './rotate-img.vue'
import { ElMessage } from 'element-plus'

const canvasReactive = reactive({
  count: 0,
})

onMounted(() => {
  createCanvas() // 初始化创建一个 canvas
})

// NOTE: func1 绘制1/4个圆
const canvasFunc1 = () => {
  console.log('执行了')
  const canvas = getLatestCanvas().canvas
  const ctx = getLatestCanvas().ctx
  ctx.beginPath()
  ctx.arc(50, 50, 50, 0, 0.5 * Math.PI, false)
  ctx.strokeStyle = 'white'
  ctx.stroke()
}

const nextCanvasFunc = () => {
  const func = `canvasFunc${canvasReactive.count}`
  console.log('当前函数', func)
  try {
    if (typeof eval(func) === 'function') {
      createCanvas()
      eval(func)()
    }
  } catch (error) {
    ElMessage.error('没有下一个了')
  }
}

// 获取最新的 canvas
const getLatestCanvas = () => {
  const canvas = document.getElementById(
    `canvas_${canvasReactive.count}`
  ) as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  return { canvas, ctx }
}

// 创建 canvas
const createCanvas = () => {
  const canvasContainerEl = document.querySelector('.canvas-container')
  const gridEl = document.createElement('div')
  gridEl.className = 'grid-item'
  const canvasEl = document.createElement('canvas')
  canvasEl.id = `canvas_${canvasReactive.count + 1}`
  canvasEl.width = 300
  canvasEl.height = 150
  canvasEl.style.background = '#000'
  canvasEl.style.borderRadius = '10px'
  gridEl.appendChild(canvasEl)
  canvasContainerEl?.appendChild(gridEl)
  canvasReactive.count++
}
</script>

<style lang="scss" scoped>
#demo-page {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px; /* 设置网格间距 */
    margin: 10px 0;

    .grid-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      height: 200px;
      border: 0.5px dashed #ccc; /* 设置网格项的边框样式 */
      padding: 10px; /* 可选，设置网格项的内边距 */
      border-radius: 10px;

      .canvas-item {
        background: #000;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>
