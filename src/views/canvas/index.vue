<template>
  <div id="canvas-page">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted } from 'vue'

/**
 * 圆点类
 */
class RoundItem {
  index: number
  x: number
  y: number
  r: number
  color: string

  constructor(index: number, x: number, y: number) {
    this.index = index
    this.x = x
    this.y = y
    this.r = Math.random() * 2 + 1
    var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2
    this.color = 'rgba(255,255,255,' + alpha + ')'
  }

  draw() {
    context.fillStyle = this.color
    context.shadowBlur = this.r * 2
    context.beginPath()
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
    context.closePath()
    context.fill()
  }

  move() {
    this.y -= 0.25
    if (this.y <= -10) {
      this.y = HEIGHT + 10
    }
    this.draw()
  }
}

const WIDTH = document.documentElement.clientWidth
const HEIGHT = document.documentElement.clientHeight
const COUNT = 100 // 初始圆点数量
const rounds: RoundItem[] = []
let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D
const circle = {
  num: 100,
  color: '', //  颜色  如果是false 则是随机渐变颜色
  r: 0.9, //   圆每次增加的半径
  o: 0.09, //      判断圆消失的条件，数值越大，消失的越快
  a: 1,
}
let color1 = 0
let color2 = ''
let circleArr: any[] = []

onBeforeMount(() => {
  const app = document.getElementById('app') as HTMLElement
  app.style.padding = '0' // 设置无边距
  window.addEventListener('resize', initCanvas)
  window.onmousemove = function (event) {
    const mouseX = event.clientX
    const mouseY = event.clientY
    circleArr.push({
      mouseX: mouseX,
      mouseY: mouseY,
      r: circle.r, // 设置半径每次增大的数值
      o: 1, //  判断圆消失的条件，数值越大，消失得越快
    })
  }

  if (circle.color) {
    color2 = circle.color
  } else {
    color1 = Math.random() * 360
  }
})
onMounted(() => {
  initCanvas()
  mouseAnimate()
})

onUnmounted(() => {
  window.removeEventListener('resize', initCanvas)
})
const initCanvas = () => {
  canvas = getCanvas().canvas
  context = getCanvas().ctx
  canvas.width = WIDTH
  canvas.height = HEIGHT
  initRoundPopulation()
}
const initRoundPopulation = () => {
  for (var i = 0; i < COUNT; i++) {
    rounds[i] = new RoundItem(i, Math.random() * WIDTH, Math.random() * HEIGHT)
    rounds[i].draw()
  }
  animate()
}
const getCanvas = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  return { canvas, ctx }
}

const animate = () => {
  context.clearRect(0, 0, WIDTH, HEIGHT)
  for (var i in rounds) {
    rounds[i].move()
  }
  requestAnimationFrame(animate)
}

const mouseAnimate = () => {
  if (!circle.color) {
    color1 += 0.1
    color2 = `hsl(${color1},100%,80%)`
  }
  // context.clearRect(0, 0, WIDTH, HEIGHT)

  for (var i = 0; i < circleArr.length; i++) {
    context.fillStyle = color2
    context.beginPath()
    context.arc(
      circleArr[i].mouseX,
      circleArr[i].mouseY,
      circleArr[i].r,
      0,
      Math.PI * 2
    )
    context.closePath()
    context.fill()
    circleArr[i].r += circle.r
    circleArr[i].o -= circle.o

    if (circleArr[i].o <= 0) {
      circleArr.splice(i, 1)
      i--
    }
  }

  window.requestAnimationFrame(mouseAnimate)
}
</script>

<style lang="scss" scoped>
#canvas-page {
  #canvas {
    background-color: #000;
  }
}
</style>
