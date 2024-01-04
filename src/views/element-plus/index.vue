<template>
  <div class="element-plus-page">
    <el-button type="primary">按钮-primary</el-button>
    <el-button type="success">按钮-primary</el-button>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="User" name="child1">User</el-tab-pane>
      <el-tab-pane label="Config" name="child2">Config</el-tab-pane>
      <el-tab-pane label="Role" name="child3">Role</el-tab-pane>
      <el-tab-pane label="Task" name="child4">Task</el-tab-pane>
    </el-tabs>

    <div class="router-view-container">
      <router-view v-slot="{ Component, route }" :key="route.path">
        <transition>
          <keep-alive>
            <component :is="getComponentName" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import c1 from './components/c1.vue'
import c2 from './components/c2.vue'
import c3 from './components/c3.vue'
import c4 from './components/c4.vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const componentMap = {
  child1: {
    component: c1,
  },
  child2: {
    component: c2,
  },
  child3: {
    component: c3,
  },
  child4: {
    component: c4,
  },
}

const route = useRoute()
const activeName = ref('child1')
const acComponent = ref('')
const getComponentName = computed(() => {
  if (!acComponent.value) return null
  return componentMap[acComponent.value as keyof typeof componentMap].component
})
onMounted(() => {
  console.log('onMounted')
  if (route.query?.tab) {
    activeName.value = route.query.tab as string
    acComponent.value = route.query.tab as string
  }
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  acComponent.value = tab.paneName as string
  router.replace({
    path: route.path,
    query: {
      ...route.query,
      tab: tab.paneName,
    },
  })
}
</script>
