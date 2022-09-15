<template>
  <div class="parent">
    <div class="header">
      <h1>This is Main Page</h1>
    </div>
    <div class="container">
      <p>{{ mainMsg }}</p>
      <Child :pNum="mainMsg" />
    </div>
    <div class="operate">
      <el-button @click="changeMainMsg">click me</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import Child from "@/views/components/ChildView.vue";
export default {
  components: {
    Child,
  },
  setup() {
    const mainMsg = ref(0);
    // change mainMsg
    function changeMainMsg() {
      mainMsg.value += 1;
    }
    return {
      mainMsg,
      changeMainMsg,
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
