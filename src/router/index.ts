import { createRouter, createWebHashHistory } from 'vue-router'

const autenticado = sessionStorage.getItem('autenticado')
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import("@/views/Auth.vue")
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

router.beforeEach(async (to, from, next) => {
  if (
    autenticado != 'true' &&
    to.name !== 'auth'
  ) {
    // redirect the user to the login page
    return { name: 'auth' }
  }

  next()
})

export default router
