import Vue from 'vue'
import App from './App.vue'
import router from "./router.js"
import './axios'
import store from './store/vuex'
import VuePromiseBtn from "vue-promise-btn"

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'

Vue.config.productionTip = false

Vue.use(VuePromiseBtn, {})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
