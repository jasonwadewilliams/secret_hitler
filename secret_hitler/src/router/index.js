import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import gameBoard from '../views/gameBoard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gameBoard',
    name: 'gameBoard',
    component: gameBoard,
    props: true
  },
  { path: '/Vote', name: 'Vote', component: () => import('../views/Vote.vue')}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
