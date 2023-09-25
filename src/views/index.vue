<template>
  <div class="parent">
    <div class="header">
      <h1 class="font-sans text-base">This is Main Page</h1>
      <Input v-model="value"></Input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from "ant-design-vue";
import { ref } from "vue";

const value = ref("");
</script>

<style scoped>
.parent {
  background-color: #d4d7de;
  padding: 1rem;
}
</style>
