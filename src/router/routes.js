
const routes = [
  {
    path: '/',
    component: () => import('pages/appLogin.vue')
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/app', component: () => import('pages/IndexPage.vue') },
      { path: '/solicitacoespendentes', component: () => import('pages/solicitacoesPendentes.vue') },
      { path: '/finalizarsolicitacao', component: () => import('pages/finalizarSolicitacao.vue') },
    ]
  },

  {
    path: '/solicitacao',
    component: () => import('pages/appFormSolicitacao.vue')
  },
  {
    path: '/materiais',
    component: () => import('pages/appMateriais.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
