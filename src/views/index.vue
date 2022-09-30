<template>
  <div class="parent">
    <div class="header">
      <h1>This is Main Page</h1>
    </div>
    <div class="container">
      <p>{{ mainMsg }}</p>
      <Child :pNum="mainMsg" />
      <p>------------------分割线---------------</p>
      <div>store-count:{{ store.count }}</div>
      <div>store-doubleCount: {{ store.doubleCount }}</div>
      <div>
        <p>Info_name: {{ infoStore.name }}</p>
        <p>Info_counter: {{ infoStore.counter }}</p>
        <p>Info_isAdmin: {{ infoStore.isAdmin }}</p>
      </div>
    </div>
    <div class="operate">
      <el-button type="danger" @click="reset">重置</el-button>
      <el-button @click="changeMainMsg">click me</el-button>
      <el-button @click="storeDouble">Store 点击 Double</el-button>
      <el-button @click="infoStoreClick">InfoStore 点击</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import Child from "@/views/components/ChildView.vue";
import { useCounterStore, useInfoStore } from "@/stores/counter";
export default {
  components: {
    Child,
  },
  setup() {
    const mainMsg = ref(0);
    const store = useCounterStore();
    const infoStore = useInfoStore();
    // change mainMsg
    function changeMainMsg() {
      mainMsg.value += 1;
    }
    // store count double
    function storeDouble() {
      store.count += 1;
    }
    function infoStoreClick() {
      infoStore.counter += 1;
      infoStore.isAdmin = !infoStore.isAdmin;
    }
    function reset() {
      console.log("重置了");
      infoStore.$reset();
    }
    return {
      mainMsg,
      store,
      changeMainMsg,
      storeDouble,
      infoStore,
      infoStoreClick,
      reset,
    };
  },
};
</script>

<style scoped>
.parent {
  background-color: #d4d7de;
  padding: 1rem;
}
</style>
