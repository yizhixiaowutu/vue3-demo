<template>
  <h2>子页面</h2>
  <span>{{ number }}</span>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCounterStore } from '../../stores/counter'
import { useRoute } from 'vue-router'

const route = useRoute()
const counterStore = useCounterStore()
const number = ref(0)

onMounted(() => {
  counterStore.setInitCount(+(route.query.id as string))
  number.value = counterStore.count

  window.addEventListener('message', receiveMessage)
})

const receiveMessage = (e) => {
  console.log('receiveMessage', e)
  if (e.data === 'storeNumberChange') {
    counterStore.increment()
    number.value = counterStore.count
  }
}
</script>

<style scoped></style>
