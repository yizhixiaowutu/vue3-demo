<template>
  <h1>Main Page</h1>
  <a-button @click="post2Page">广播事件</a-button>

  <div class="iframe-container">
    <section class="iframe-item" v-for="i in [1, 2, 3]">
      <iframe
        class="iframeClass"
        :src="getUrl(i)"
        frameborder="0"
        width="100%"
        height="100%"
      ></iframe>
    </section>
  </div>
</template>

<script setup lang="ts">
const post2Page = () => {
  const iframeList = document.querySelectorAll('.iframeClass')
  // window.postMessage('storeNumberChange', 'http://127.0.0.1:5173/store-page')
  for (let i = 0; i < iframeList.length; i++) {
    const iframe = iframeList[i] as any

    // 向每个 iframe 发送消息
    iframe.contentWindow.postMessage(
      'storeNumberChange',
      'http://127.0.0.1:5173/store-page'
    )
  }
}

const getUrl = (i: number) => {
  return `http://127.0.0.1:5173/store-page/?id=${i}`
}
</script>

<style scoped></style>
