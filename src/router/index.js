import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    },
    {
      path: '/index',
      name: 'index',
      component: Home
    },
    {
      path: '/category',
      name: 'category',
      component: Home
    },
    {
      path: '/find',
      name: 'find',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: Home
    },
    {
      path: '/myHome',
      name: 'myHome',
      component: Home
    }
  ],
  mode:'history'
})
