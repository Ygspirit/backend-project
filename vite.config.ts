import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    // mock配置
    viteMockServe({
      supportTs: true, // 支持 ts
      logger: false, // 是否在控制台显示请求日志
      mockPath: './mock', // mock 文件路径
      localEnabled: true, // 开发环境启用
      prodEnabled: false, // 生产环境禁用
    })
  ],
  resolve: {
    alias: {
      // import.meta.url：是ES模块的一个变量，表示当前模块的URL（在Vite配置文件中，它指向vite.config.ts文件的URL）。
      // new URL('./src', import.meta.url)：创建一个相对于当前配置文件所在目录的./src目录的URL对象。
      // fileURLToPath：Node.js内置模块（从'url'导入）的方法，用于将文件URL转换为文件路径。
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  //scss全局变量的配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/variable.scss" as *;',
      },
    },
  },
})
