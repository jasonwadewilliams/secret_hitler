import Vue from 'vue'
import App from './App.vue'
import router from './router'
import roles from './player_data'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

let data = {
  roles: roles,
  user: null
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
