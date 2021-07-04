import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

//引入axios
import axios from 'axios'

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token') || null
  return config
})


Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
