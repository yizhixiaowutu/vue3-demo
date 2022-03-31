<template>
  <h1>{{ msg }}</h1>
  <h2>{{ count }}</h2>
  <el-button type="primary" @click="handleClick">click</el-button>
</template>
<script setup lang="ts">
  import { ref } from 'vue'

  defineProps<{ msg: string }>()

  const count = ref(0)
  function handleClick() {
    count.value++
  }
</script>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
