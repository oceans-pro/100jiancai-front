import Vue from 'vue' // vue
import ElementUI from 'element-ui' // element ui
import 'element-ui/lib/theme-chalk/index.css' // element ui
import 'element-ui/lib/theme-chalk/display.css'// element ui
import BaiduMap from 'vue-baidu-map' // 百度地图
import LightTimeLine from 'vue-light-timeline' // 时间轴
import App from './App.vue' // 主页面
import './styles/index.scss' // 主样式
import router from './router' // 主路由
import secret from '../secret' // 主密钥
import '@/utils/axios-interceptor-util' // 主拦截
import store from './store' // 主全局状态
import '@/icons' // global icon

Vue.use(ElementUI)
Vue.use(LightTimeLine)
Vue.use(BaiduMap, {
  ak: secret.baiduMap.ak,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
