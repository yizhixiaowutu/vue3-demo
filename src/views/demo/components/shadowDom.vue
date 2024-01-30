<template>
  <div id="shadow-dom-page">
    <p>light dom</p>
    <div id="host"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  createShadowDom()
})

const createShadowDom = () => {
  const ele = document.getElementById('host') as HTMLElement
  const shadowRoot: ShadowRoot = ele.attachShadow({ mode: 'open' })
  shadowRoot.innerHTML = `
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    <ul>
    `

  document.addEventListener(
    'click',
    (event) => {
      console.log(event.target)
    },
    false
  )
}
</script>

<style scoped></style>
