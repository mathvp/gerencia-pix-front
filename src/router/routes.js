
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'index' },
      { path: 'novo-banco', component: () => import('pages/NewBank.vue'), name: 'addBank' },
      { path: 'nova-chave', component: () => import('pages/NewPixKey.vue'), name: 'addPixKey' }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/Login.vue'), name: 'login' },
      { path: '/sair', component: () => import('pages/Logout.vue'), name: 'logout' },
      { path: '/cadastro', component: () => import('pages/Register.vue'), name: 'register' }
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
