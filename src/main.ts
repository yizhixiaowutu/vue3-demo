import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import ElementPlus from "element-plus";

// 自定义 css
import "@/styles/element/index.scss";

// css
import "ant-design-vue/dist/reset.css";
import "tailwindcss/tailwind.css";
import "./assets/main.css";
import "@/styles/tailwind.css";
import "@/styles/index.scss";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antd);
app.use(ElementPlus);
app.mount("#app");
