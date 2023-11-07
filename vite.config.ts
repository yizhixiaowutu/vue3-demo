import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import {
  AntDesignVueResolver,
  ElementPlusResolver,
} from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true, // 自动打开浏览器
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
        // ElementPlusResolver({
        //   // 自动引入修改主题色添加这一行，使用预处理样式
        //   importStyle: "sass",
        // }),
      ],
    }),
    // AutoImport({
    //   resolvers: [
    //     ElementPlusResolver({
    //       // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
    //       importStyle: "sass",
    //     }),
    //   ],
    // }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
    // preprocessorOptions: {
    //   scss: {
    //     // 自定义的主题色
    //     additionalData: `@use "@/styles/element/index.scss" as *;`,
    //   },
    // },
  },
});
