import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(), // vue jsx 写法，作为插件使用
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          // resolveStyle: (name: string) => {
          //   name = name.substring(3, name.length)
          //   return `element-plus/es/components/${name}/style/index`
          // }
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    })
  ],
  server: {
    port: 8023
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
