import { createRouter, createWebHashHistory } from 'vue-router'
import TipoInvestimentoVue from '@/views/auth/adm/TipoInvestimento/TipoInvestimento.vue'
import DashboardAdminVue from '@/views/auth/adm/Dashboard/DashboardAdmin.vue'
import User from '@/views/auth/adm/User/User.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import("@/views/Index.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/Login.vue")
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import("@/views/login/Cadastro.vue")
    },
    {
      path: '/admin',
      name: 'amdin',
      component: () => import("@/views/auth/adm/Index.vue"),
      redirect: '/dashboard',
      children: [
        {
          path: '/tipo-investimento',
          name: 'tipo-investimento',
          component: TipoInvestimentoVue
        },
        {
          path: '/dashboard',
          name: 'dashboard-admin',
          component: DashboardAdminVue
        },
        {
          path: '/user',
          name: 'user',
          component: User
        }
      ]
    }
  ]
})

export default router
