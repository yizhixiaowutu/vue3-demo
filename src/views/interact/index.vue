<template>
  <!-- <h1>Interact.js</h1> -->
  <div class="boxes-container">
    <div v-for="box in BOXES_NUMBER" :key="box" :class="['box', `box-${box}`]">
      Draggle Box {{ box }}
    </div>
  </div>
</template>

<script setup lang="ts">
import interact from 'interactjs'
import { onMounted } from 'vue'

const BOXES_NUMBER = 5
const positionMap = new Map()
const interactClassName = '.box'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const position = { x: 0, y: 0 }

interact(interactClassName).draggable({
  listeners: {
    start(event) {
      // console.log('event', event, event.type, event.target.className)
    },
    move(event) {
      const position = positionMap.get(event.target.className)
      position.x += event.dx
      position.y += event.dy

      event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
    },
    end(event) {
      console.log('onend', positionMap.get(event.target.className))
    },
  },
  modifiers: [
    interact.modifiers.snap({
      targets: [
        {
          x: 0,
          y: 0,
          range: 10,
        },
        {
          x: screenWidth / 2,
          y: screenHeight / 2,
          range: 10,
        },
        {
          x: screenWidth,
          y: screenHeight,
          range: 10,
        },
      ],
      relativePoints: [
        { x: 0, y: 0 }, // snap relative to the element's top-left,
        { x: 0.5, y: 0.5 }, // to the center
        { x: 1, y: 1 }, // and to the bottom-right
      ],
    }),
  ],
})

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

onMounted(() => {
  for (let i = 1; i <= BOXES_NUMBER; i++) {
    positionMap.set(`box box-${i}`, { x: 0, y: 0 })
  }
  console.log('positionMap', positionMap)
})
</script>

<style lang="scss" scoped>
.boxes-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px;

  .box {
    width: 100px;
    height: 100px;
    padding: 20px;
    border-radius: 8px;
    background-color: #29e;
    color: white;
    touch-action: none;
    user-select: none;
  }
}
</style>
