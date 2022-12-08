import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutView from '../views/layout/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: LayoutView,
    children: [{
      path: '',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../views/home/Index.vue')
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Index.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
