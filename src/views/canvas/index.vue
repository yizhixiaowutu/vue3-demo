<template>
  <div id="canvas-page">
    <h1>canvas</h1>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'

onMounted(() => {
  const canvas = getCanvas().canvas
  canvas.width = 400 // 不要使用 css 来设置 canvas 的宽高，否则会导致画布被拉伸
  canvas.height = 400
  const context = getCanvas().ctx

  // NOTE: 绘制1/4个圆
  // context.arc(100, 100, 50, 0, 0.5 * Math.PI, false)
  // context.strokeStyle = 'white'
  // context.stroke()

  // NOTE: 绘制一条直线
  // context.beginPath()
  // context.moveTo(50, 50)
  // context.lineTo(100, 100)
  // context.strokeStyle = '#fff'
  // context.stroke()

  // NOTE: 不使用 moveTo 直接连线
  // context.lineTo(200, 200)
  // context.lineTo(200, 100)
  // context.lineTo(100, 50)
  // context.strokeStyle = '#fff'
  // context.stroke()

  // NOTE: 调整线条宽度及样式
  // context.beginPath()
  // context.moveTo(10, 10)
  // context.lineTo(100, 100)
  // context.lineWidth = 10
  // context.lineCap = 'round'
  // context.strokeStyle = '#fff'
  // context.stroke()

  // NOTE: 绘制矩形
  // context.beginPath()
  // context.fillStyle = '#fff'
  // context.fillRect(10, 10, 100, 100)
  // context.strokeStyle = '#fff'
  // context.strokeRect(130, 10, 100, 100)

  // NOTE: 绘制阴影
  context.beginPath()
  context.arc(100, 100, 50, 0, 2 * Math.PI, false)
  context.fillStyle = '#fff'
  context.shadowBlur = 20
  context.shadowColor = '#fff'
  context.fill()
})
const getCanvas = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  return { canvas, ctx }
}
</script>

<style lang="scss" scoped>
#canvas-page {
  #canvas {
    background-color: #000;
  }
}
</style>
