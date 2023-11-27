<template>
  <h1>这里是Child-{{ props.activeKey }}</h1>
</template>

<script setup lang="ts">
const props = defineProps({
  activeKey: {
    type: String,
    required: true,
  },
})
</script>

<style scoped></style>
