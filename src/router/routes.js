
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'index' },
      { path: 'novo-banco', component: () => import('pages/NewBank.vue'), name: 'addBank' },
      { path: 'editar-banco/:bank_code', component: () => import('pages/EditBank.vue'), name: 'editBank' },
      { path: 'nova-chave', component: () => import('pages/NewPixKey.vue'), name: 'addPixKey' }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '/login/:msg?', component: () => import('pages/Login.vue'), name: 'login', meta: { requiresAuth: false } },
      { path: '/sair', component: () => import('pages/Logout.vue'), name: 'logout', meta: { requiresAuth: false } },
      { path: '/cadastro', component: () => import('pages/Register.vue'), name: 'register', meta: { requiresAuth: false } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
