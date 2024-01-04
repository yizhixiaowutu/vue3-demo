<template>
  <h1>child2</h1>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
  console.log('child2 - onMounted')
})
</script>

<style scoped></style>
