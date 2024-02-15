import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
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
    }
  ]
})

export default router
