<template>
  <div class="iframe-page">
    <div ref="contentListRef" class="content-list">
      <div
        :id="`content-${content.value}`"
        class="content-item"
        v-for="content in contentList"
        :key="content.value"
        v-show="content.value === activeKeyRef"
      >
        <Form :contentKey="content.value"></Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import Form from "./form.vue";
const contentListRef = ref<HTMLElement | null>(null);
const contentList = ref([
  {
    label: "content-1",
    value: 1,
  },
  {
    label: "content-2",
    value: 2,
  },
  {
    label: "content-3",
    value: 3,
  },
]);
const activeKeyRef = ref(contentList.value[0].value);

onMounted(() => {
  window.addEventListener("message", receiveMessage);
  console.log("onMounted");
  window.postMessage("IframePageMounted", "http://localhost:3333/srs");
});
onBeforeMount(() => {
  window.removeEventListener("message", receiveMessage);
});

const receiveMessage = (event: MessageEvent) => {
  if (event.origin !== "http://127.0.0.1:5173") return;
  const {
    data: { activeKey, type },
  } = event;
  if (type === "add") {
    add(activeKey);
  } else if (type === "remove") {
    remove(activeKey);
  } else if (type === "change") {
    change(activeKey);
  }
};
const add = (activeKey: string) => {
  activeKeyRef.value = +activeKey;
  const has = contentList.value.some(
    (content) => content.value === activeKeyRef.value
  );
  if (has) return;
  contentList.value.push({
    label: `content-${activeKeyRef.value}`,
    value: +activeKeyRef.value,
  });
};
const remove = (activeKey: string) => {
  console.log("remove", activeKey);
  let lastIndex = 0;
  contentList.value.forEach((content, i) => {
    if (content.value === +activeKey) {
      lastIndex = i - 1;
    }
  });
  contentList.value = contentList.value.filter(
    (content) => content.value !== +activeKey
  );
  if (lastIndex >= 0) {
    activeKeyRef.value = contentList.value[lastIndex].value;
  } else {
    activeKeyRef.value = contentList.value[0].value;
  }
};
const change = (activeKey: string) => {
  activeKeyRef.value = +activeKey;
};
</script>
<style scoped lang="scss">
.iframe-page {
  .content-list {
    .content-item {
      &.active {
        color: red;
      }
    }
  }
}
</style>
