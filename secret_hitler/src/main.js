import Vue from 'vue'
import App from './App.vue'
import router from './router'
import players from './player_data'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

let data = {
  players: players,
  groups: []
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
