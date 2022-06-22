import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'HomeContent',
          component: () => import('@/views/HomePage/HomeContent.vue')
        },
      ]
    },
  ]
})
