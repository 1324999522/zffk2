import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login'
import store from '@/store'



Vue.use(VueRouter)


import generatorDynamicRouter from './generator-routers.js'

const { menuNav, childrenNav, routers, routes_data } = generatorDynamicRouter()

// 登陆
const Login = {
  path: '/login',
  name: 'login',
  component: login,
  meta: {
    title: '首页'
  },
  children: []
}

routers.push(Login)

const router = new VueRouter({
  routes: routers

})





// 加载条
import NProgress from 'nprogress'
import '../assets/css/nprogress.css'
// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  NProgress.start();
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token, 强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})
NProgress.inc(0.4);
NProgress.configure({
  // easing: 'ease',  // 动画方式
  speed: 200,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.2 // 初始化时的最小百分比
})

router.afterEach((to, from) => {
  setTimeout(() => {
    NProgress.done();
  }, 200);
})


router.menuNav = menuNav
router.routes_data = routes_data




export default router
