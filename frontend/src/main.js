import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App.vue'

import './config/bootstrap'
import './config/msgs'
import './config/axios'

import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
