import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";

// css
import "ant-design-vue/dist/reset.css";
import "tailwindcss/tailwind.css";
import "./assets/main.css";
import "@/styles/tailwind.css";
import "@/styles/index.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antd);
app.mount("#app");
