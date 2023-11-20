import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function setInitCount(num: number) {
    count.value = num
  }

  return { count, doubleCount, increment, setInitCount }
})

export const useInfoStore = defineStore('info', {
  state() {
    return {
      counter: 0,
      name: '一只小於菟',
      isAdmin: true,
    }
  },
})
