import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

export const useInfoStore = defineStore("info", {
  state() {
    return {
      counter: 0,
      name: "一只小於菟",
      isAdmin: true,
    };
  },
});
