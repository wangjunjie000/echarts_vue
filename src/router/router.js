import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index/index'),
    },

    {
      path: '*',
      redirect: { path: '/index' },
    },
  ],
})

export default router
