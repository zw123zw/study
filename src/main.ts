import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store } from './store/index'
import ElementPlus from 'element-plus'
import { MotionPlugin } from '@vueuse/motion'
import { getServerConfig } from '@/config/index'

const app = createApp(App)

// 引入重置样式
import './style/reset.scss'
// 引入公共样式
import './style/index.scss'
import 'element-plus/dist/index.css'
// 导入字体图标
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'

// 全局注册`@iconify/vue`图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon,
} from './components/ReIcon'
app.component('IconifyIconOffline', IconifyIconOffline)
app.component('IconifyIconOnline', IconifyIconOnline)
app.component('FontIcon', FontIcon)

getServerConfig(app).then(config => {
  app.use(router).use(store).use(ElementPlus).use(MotionPlugin)
  app.mount('#app')
})
