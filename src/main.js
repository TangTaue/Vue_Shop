import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// 发送ajax请求
import axios from 'axios'
// 配置默认的请求路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
// 请求拦截器的设置 设置token验证
axios.interceptors.request.use(config => {
  // 向服务器发送token令牌 添加token 保证拥有获取数据的权限
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
