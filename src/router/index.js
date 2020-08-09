import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/views/product/index'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/contact/index'),
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/news/index'),
  },
  {
    path: '/hire',
    name: 'Hire',
    component: () => import('@/views/hire/index'),
  },

  {path: '*', redirect: '/404', hidden: true},
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
