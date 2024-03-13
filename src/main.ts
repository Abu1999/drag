/*
 * @Author: bbw 1526699702@qq.com
 * @Date: 2024-01-26 14:44:26
 * @LastEditors: bbw 1526699702@qq.com
 * @LastEditTime: 2024-03-06 15:01:44
 * @FilePath: \large-screen\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 增加的引入
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/es/components/message/style/css'



import App from './App.vue'
import router from './router'

const app = createApp(App)

// 全局引入图标
app.use(ElementPlus, { size: 'default', locale: zhCn })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)



app.mount('#app')
