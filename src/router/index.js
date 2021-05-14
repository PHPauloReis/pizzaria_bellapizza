import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../views/Menu.vue'
import Order from '../views/Order.vue'
import InConstruction from '../views/InConstruction.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Menu
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/localization',
    name: 'Localization',
    component: InConstruction
  },
  {
    path: '/contact',
    name: 'Contact',
    component: InConstruction
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
