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
  if (sessionStorage.getItem('nowFunc')) {
    const nowFunc = Number(sessionStorage.getItem('nowFunc'))
    for (let i = 1; i < nowFunc; i++) {
      nextCanvasFunc()
    }
  }
})

const nextCanvasFunc = () => {
  const func = `canvasFunc${canvasReactive.count}`
  console.log('当前函数', func)
  try {
    if (typeof eval(func) === 'function') {
      createCanvas()
      eval(func)()
      sessionStorage.setItem('nowFunc', canvasReactive.count.toString())
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

// ---------------------------- canvas function --------------------------------
// NOTE: 绘制1/4个圆
const canvasFunc1 = () => {
  const canvas = getLatestCanvas().canvas
  const ctx = getLatestCanvas().ctx
  ctx.beginPath()
  ctx.arc(50, 50, 50, 0, 0.5 * Math.PI, false)
  ctx.strokeStyle = 'white'
  ctx.stroke()
}

// NOTE: 绘制并连接线条（设置样式）
const canvasFunc2 = () => {
  const ctx = getLatestCanvas().ctx
  ctx.beginPath()
  ctx.moveTo(50, 50) // 如果没有 moveTo，那么第一次 lineTo 的就视为 moveTo
  ctx.lineTo(100, 100) // 每次 lineTo 后如果没有 moveTo，那么下次 lineTo 的开始点为前一次 lineTo 的结束点。
  // ctx.lineTo(150, 100)
  ctx.lineWidth = 10
  ctx.lineCap = 'round'
  ctx.strokeStyle = '#fff'
  ctx.stroke()
  ctx.lineWidth = 3
  ctx.lineCap = 'butt'
  ctx.lineTo(150, 100)
  ctx.lineTo(200, 50)
  ctx.stroke()
}

// NOTE: 绘制矩形
const canvasFunc3 = () => {
  const ctx = getLatestCanvas().ctx
  ctx.beginPath()
  ctx.rect(20, 50, 100, 50)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.strokeStyle = 'white'
  ctx.stroke()

  ctx.beginPath()
  ctx.rect(180, 50, 100, 50)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.strokeStyle = 'white'
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(140, 120)
  ctx.lineTo(160, 120)
  ctx.stroke()
}

// NOTE: 绘制圆形 + 阴影
const canvasFunc4 = () => {
  const ctx = getLatestCanvas().ctx
  ctx.beginPath()
  ctx.arc(50, 50, 25, 0, 2 * Math.PI, false)
  ctx.fillStyle = 'white'
  ctx.shadowBlur = 10
  ctx.shadowColor = '#fff'
  ctx.fill()
}

// NOTE: 渐变
const canvasFunc5 = () => {
  const ctx = getLatestCanvas().ctx

  ctx.beginPath()
  const gradient = ctx.createLinearGradient(100, 25, 100, 100)
  gradient.addColorStop(0, 'pink')
  gradient.addColorStop(1, '#fff')
  ctx.fillStyle = gradient
  ctx.fillRect(25, 25, 100, 100)

  ctx.beginPath()
  const gradient2 = ctx.createLinearGradient(185, 25, 285, 25)
  gradient2.addColorStop(0, 'rgb(255, 0, 0)')
  gradient2.addColorStop(0.2, 'rgb(255, 165, 0)')
  gradient2.addColorStop(0.3, 'rgb(255, 255, 0)')
  gradient2.addColorStop(0.5, 'rgb(0, 255, 0)')
  gradient2.addColorStop(0.7, 'rgb(0, 127, 255)')
  gradient2.addColorStop(0.9, 'rgb(0, 0, 255)')
  gradient2.addColorStop(1, 'rgb(139, 0, 255)')
  ctx.fillStyle = gradient2
  ctx.fillRect(185, 25, 100, 100)
}

// NOTE: 图形转换 - 缩放
const canvasFunc6 = () => {
  const ctx = getLatestCanvas().ctx
  ctx.strokeStyle = 'white'
  ctx.strokeRect(5, 5, 50, 25)
  ctx.scale(2, 2)
  ctx.strokeRect(5, 5, 50, 25)
  ctx.scale(2, 2)
  ctx.strokeRect(5, 5, 50, 25)
}

// NOTE: 图形转换 - 旋转
const canvasFunc7 = () => {
  const ctx = getLatestCanvas().ctx
  ctx.beginPath()
  ctx.rotate((20 * Math.PI) / 180) // 旋转后，后续所有绘制都会旋转
  ctx.strokeStyle = '#fff'
  ctx.strokeRect(30, 10, 100, 100)

  ctx.beginPath()
  ctx.strokeStyle = 'pink'
  ctx.strokeRect(150, 10, 50, 30)
}
</script>

<style lang="scss" scoped>
#demo-page {
  // background: linear-gradient(to bottom, #000000 0%, #5788fe 100%);

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

.filter {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #fe5757;
  animation: colorChange 30s ease-in-out infinite;
  animation-fill-mode: both;
  mix-blend-mode: overlay;
}

@keyframes colorChange {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 0.9;
  }
}
</style>
