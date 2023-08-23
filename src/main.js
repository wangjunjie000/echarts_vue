import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

import './plugins/flexible'

import './plugins/china'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
