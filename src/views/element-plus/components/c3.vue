<template>
  <h1>child3</h1>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
  console.log('child3 - onMounted')
})
</script>

<style scoped></style>
