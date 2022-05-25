import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import index_pay from '@/views/pay/index'
import cache_query from '@/views/Template/order/cache_query'

// import shopHome from '@/views/shop/shopHome'
// import publicTakeCard from '@/views/shop/publicTakeCard'


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/index_pay',
    name: 'index_pay',
    component: index_pay
  },

  {
    path: '/order', name: 'order',
    component: (resolve) => { require(['@/views/Template/order/order'], resolve) }
  },
  {
    path: '/order_details', name: 'order_details',
    component: (resolve) => { require(['@/views/Template/order/order_details'], resolve) }
  },
  {
    path: '/cache_query',
    name: 'cache_query',
    component: cache_query
  },
  {
    path: '/after_sale', name: 'after_sale',
    component: (resolve) => { require(['@/views/Template/order/after_sale'], resolve) }
  },
  {
    path: '/article_list', name: 'article_list',
    component: (resolve) => { require(['@/views/article/article_list'], resolve) }
  },
  {
    path: '/article_detail', name: 'article_detail',
    component: (resolve) => { require(['@/views/article/article_detail'], resolve) }
  },





]




const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
