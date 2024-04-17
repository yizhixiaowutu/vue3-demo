<template>
  <div
    class="w-full h-full p-8 bg-white dynamic-bg-page overflow-auto"
    ref="pageRef"
  >
    <div class="my-box w-[200px] h-[200px] bg-slate-400 rounded-xl mb-4">
      <div class="inner w-full h-full bg-white rounded-xl"></div>
    </div>

    <!-- 顶部元素（测试滚动） -->
    <div class="w-full h-[200px] bg-slate-500"></div>

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
        v-for="(_, i) in boxes"
        :key="i"
        :id="_.name"
        class="box flex items-center justify-center p-[1px] rounded-xl"
        :style="{
          '--x': `${_.elementX}px`,
          '--y': `${_.elementY}px`,
        }"
      >
        <div
          class="inner w-full h-full bg-white rounded-xl hover:bg-opacity-70 transition-[background-opacity]"
        ></div>
      </div>
    </div>
    <!-- 底部元素（测试滚动） -->
    <div class="w-full h-[1000px] bg-slate-500"></div>
  </div>
</template>

<script setup lang="ts">
import { useMouse, useElementBounding } from '@vueuse/core'
import { nextTick, onBeforeMount, onMounted, ref, watch } from 'vue'

const NUM_BOXES = 10
const boxes = ref<any[]>([])
const pageRef = ref<HTMLElement | null>(null)

const { x: mouseX, y: mouseY } = useMouse()

const getBoxPosition = (box: HTMLElement) => {
  const { left, top } = useElementBounding(box)
  return { left, top }
}

const calBoxesPosition = () => {
  boxes.value.forEach((_, i) => {
    const box = document.getElementById(_.name) as HTMLElement
    if (_.top && _.left) {
      // cached
    } else {
      const { left, top } = getBoxPosition(box) // 获取到box元素的位置信息
      // 缓存下元素的位置信息
      _.left = left.value
      _.top = top.value
    }
    boxes.value[i] = {
      ..._,
      elementX: mouseX.value - _.left,
      elementY: mouseY.value - _.top,
    }
  })
}
watch([mouseX, mouseY], () => {
  calBoxesPosition()
})
onBeforeMount(() => {
  boxes.value = Array.from({ length: NUM_BOXES }, (_, i) => {
    return {
      name: `box-${i + 1}`,
      elementX: 0, // --x
      elementY: 0, // --y
      left: 0, // element bounding left
      top: 0, // element bounding top
    }
  })
})
onMounted(() => {
  nextTick(() => {
    calBoxesPosition()
  })
  pageRef.value?.addEventListener('scroll', () => {
    boxes.value.forEach((_, i) => {
      _.left = 0
      _.top = 0
    })
  })
})
</script>

<style lang="scss" scoped>
.my-box {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    inset: -2px;
    background-color: indigo;
    border-radius: 12px;
  }
}
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
