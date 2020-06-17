import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    children: [
      // 首页
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/Index')
      },
      // 会员信息
      {
        path: '/cloudmotion/memberInformation',
        name: 'memberInformation',
        component: () => import('../views/cloudmotion/VipInfo')
      },
      // 404页面
      {
        path: '*',
        name: '404',
        component: () => import("@/views/Error404")
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router