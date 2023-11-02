<template>
  <div class="main-page flex flex-col">
    <div class="tab-list-container">
      <a-tabs
        v-model:activeKey="activeKey"
        type="editable-card"
        @edit="onEdit"
        @change="onChange"
      >
        <a-tab-pane
          v-for="pane in panes"
          :key="pane.key"
          :tab="pane.title"
          :closable="pane.closable"
        >
        </a-tab-pane>
      </a-tabs>
      <div class="other">
        <a-button @click="toOther">去其他页面</a-button>
      </div>
    </div>
    <div class="iframe-container grow shrink">
      <iframe
        ref="iframeRef"
        :src="url"
        frameborder="0"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "@/router";
const url = ref("http://127.0.0.1:5173/iframe-page");
const panes = ref<
  { title: string; content: string; key: string; closable?: boolean }[]
>([
  { title: "Tab 1", content: "Content of Tab 1", key: "1" },
  { title: "Tab 2", content: "Content of Tab 2", key: "2" },
  { title: "Tab 3", content: "Content of Tab 3", key: "3", closable: false },
]);
const iframeRef = ref();

const activeKey = ref(panes.value[0].key);

onMounted(() => {
  console.log("加载了");
});

const add = () => {
  activeKey.value = `${panes.value.length + 1}`;
  panes.value.push({
    title: `Tab${panes.value.length + 1}`,
    content: "Content of new Tab",
    key: activeKey.value,
  });
  postMessage("add", activeKey.value);
};

const remove = (targetKey: string) => {
  let lastIndex = 0;
  panes.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1;
    }
  });
  panes.value = panes.value.filter((pane) => pane.key !== targetKey);
  if (panes.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = panes.value[lastIndex].key;
    } else {
      activeKey.value = panes.value[0].key;
    }
  }
  postMessage("remove", targetKey);
};

const onEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action === "add") {
    add();
  } else {
    remove(targetKey as string);
  }
};
const onChange = (activeKey: string) => {
  postMessage("change", activeKey);
};
const postMessage = (type: string, activeKey: string) => {
  if (!iframeRef.value) return;
  iframeRef.value?.contentWindow.postMessage({ type, activeKey }, "*");
};
const toOther = () => {
  console.log("qqq");
  router.push({
    name: "g6",
  });
};
</script>
<style lang="scss" scoped>
.main-page {
  width: 100%;
  height: 100%;

  .tab-list-container {
    // height: 40px;
    border: 1px solid rgb(209 213 219);
  }
  .iframe-container {
    // background-color: #fff;
    margin-top: 10px;
    border: 1px solid rgb(209 213 219);
  }
}
</style>
