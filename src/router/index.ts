import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
      redirect: {name: 'carteira'},
      children: [
        {
          path: '/auth/carteira',
          name: 'carteira',
          component: () => import("@/views/auth/carteira/Carteira.vue")
        },
        {
          path: '/auth/investimentos',
          name: 'investimentos',
          component: () => import("@/views/auth/investimento/Investimentos.vue")
        },
        {
          path: '/auth/investimentos/:id',
          name: 'visualizar-investimento',
          component: () => import("@/views/auth/investimento/VisualizarInvestimento.vue")
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
  const autenticado = sessionStorage.getItem('autenticado')
  
  if (
    autenticado != 'true'  &&
    to.name !== 'auth'
  ) {
    return { name: 'auth' }
  }

  next()
})

export default router
