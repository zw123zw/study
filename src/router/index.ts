import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/home', component: () => import('@/views/home/index.vue') },
    ],
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
