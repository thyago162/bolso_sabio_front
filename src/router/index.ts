import { createRouter, createWebHashHistory } from 'vue-router'

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
      path: '/auth',
      name: 'auth-index',
      component: () => import("@/views/auth/Index.vue"),
      redirect: {name: 'investimentos'},
      children: [
        {
          path: '/auth/investimentos',
          name: 'investimentos',
          component: () => import("@/views/auth/investimento/Investimentos.vue")
        },
        {
          path: '/auth/resumo-negociacao',
          name: 'resumo-negociacao',
          component: () => import("@/views/auth/resumo_negociacao/ResumoNegociacao.vue")
        }
      ]
    }
  ]
})


export default router
