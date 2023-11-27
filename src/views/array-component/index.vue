<template>
  <h1>这里是父页面</h1>
  <a-button @click="add">添加</a-button>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title">
      <component :is="pane.componentName" :activeKey="activeKey"></component>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Child1 from './components/child-1.vue'
import Child2 from './components/child-2.vue'
import Child3 from './components/child-3.vue'
import Child4 from './components/child-4.vue'

const activeKey = ref('1')
const panes = ref([
  { title: 'Child-1', componentName: Child1, key: '1', activeKey: '1' },
  { title: 'Child-2', componentName: Child2, key: '2', activeKey: '2' },
  { title: 'Child-3', componentName: Child3, key: '3', activeKey: '3' },
])

const add = () => {
  activeKey.value = `${panes.value.length + 1}`
  panes.value.push({
    title: `Child-${panes.value.length + 1}`,
    componentName: Child4 as any,
    key: activeKey.value,
    activeKey: activeKey.value,
  })
}
</script>

<style scoped></style>
