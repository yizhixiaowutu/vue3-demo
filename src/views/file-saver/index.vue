<template>
  <div>
    <h1>FileSaver</h1>
    <a-button @click="save('text')">保存文字</a-button>
  </div>
</template>

<script setup lang="ts">
import { saveAs } from "file-saver";
import { reactive } from "vue";

const fileState = reactive({
  text: "Hello World!",
});
const save = (type: string) => {
  console.log("type", type);
  switch (type) {
    case "text":
      saveText();
      break;
  }
};

const saveText = () => {
  const blob = new Blob([fileState.text], { type: "text/plain;charset=utf-8" });
  console.log("blob", blob);
  const res = saveAs(blob, "hello world.txt");
  console.log("res", res);
};
</script>

<style scoped></style>
