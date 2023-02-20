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
      <p>------------------分割线---------------</p>
      <div>
        <span>Direction: {{ dir.NORTH }} </span>
      </div>
      <!-- TypeScript -->
    </div>
    <div class="operate">
      <el-button
        type="danger"
        @click="reset"
      >重置</el-button>
      <el-button @click="changeMainMsg">click me</el-button>
      <el-button @click="storeDouble">Store 点击 Double</el-button>
      <el-button @click="infoStoreClick">InfoStore 点击</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import Child from "@/views/components/ChildView.vue";
import { useCounterStore, useInfoStore } from "@/stores/counter";
import { Direction } from "@/config/enum";
export default {
  name: "Index",
  components: {
    Child,
  },
  setup() {
    const mainMsg = ref(0);
    const store = useCounterStore();
    const infoStore = useInfoStore();
    const dir = ref(Direction);
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
      console.log("git 1");
      console.log("git 2");
      console.log("git 3");
      console.log("重置了");
      infoStore.$reset();
    }
    onMounted(() => {
      const reg = /\bcode\b/.test("bar code");
      console.log("reg: ", reg);
      console.log("feature_test_commit", "第一次提交");
      console.log("feature_test_commit", "第二次提交");
      console.log("feature_test_commit", "第三次提交");
      console.log("feature_test_commit", "第四次提交");
      console.log("feature_test_commit", "第五次提交");
      console.log("feature_test_commit", "联调测试阶段修复若干bug");
      console.log("feature_test_commit", "联调测试阶段调整部分样式");
    });
    return {
      mainMsg,
      store,
      changeMainMsg,
      storeDouble,
      infoStore,
      infoStoreClick,
      reset,
      dir,
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
