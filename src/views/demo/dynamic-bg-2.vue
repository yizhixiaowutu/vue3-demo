<template>
  <div class="w-full h-full p-8 bg-white dynamic-bg-page overflow-auto">
    <!-- 鼠标位置 -->
    <p class="text-center mb-4 font-bold text-xl">
      mouseX: {{ mouseX }}, mouseY: {{ mouseY }}
    </p>

    <!-- boxes -->
    <div
      class="box-container grid grid-cols-3 gap-8"
      :style="{
        '--border-color': 'rgb(229,229,229)',
        '--bg-color': 'rgba(245,158,11,.7)',
      }"
    >
      <div
        v-for="(_, i) in Array.from({ length: 10 })"
        :key="i"
        class="box flex items-center justify-center p-[1px] rounded-xl"
      >
        <div
          class="inner w-full h-full bg-white rounded-xl hover:bg-opacity-70 transition-[background-opacity]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { onMounted } from 'vue'

const { x: mouseX, y: mouseY } = useMouse()

const calBoxesPosition = (e: MouseEvent) => {
  const { clientX, clientY } = e
  const items = document.querySelectorAll('.box')
  items.forEach((i) => {
    const { x, y } = i.getBoundingClientRect()
    i.setAttribute('style', `--x: ${clientX - x}px; --y: ${clientY - y}px`)
  })
}

onMounted(() => {
  window.addEventListener('mousemove', (e) => {
    calBoxesPosition(e)
  })
})
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 200px;
  border: 1px solid var(--border-color);
  border-radius: 12px;

  &::before {
    position: absolute;
    display: block;
    content: '';
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border-radius: 12px;
    inset: -2px;
    background: radial-gradient(
      200px circle at var(--x) var(--y),
      var(--bg-color) 0,
      transparent 100%
    );
    will-change: background;
  }
}
</style>
