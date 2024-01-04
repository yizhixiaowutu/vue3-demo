<template>
  <h1>child1</h1>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
  console.log('child1 - onMounted')
})
</script>

<style scoped></style>
