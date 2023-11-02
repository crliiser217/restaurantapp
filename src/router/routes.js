import IndexPage from 'pages/IndexPage.vue'
import MainLayoutVue from 'layouts/MainLayout.vue'
import GuestIndexPageVue from 'pages/guests/GuestIndexPage.vue'
import GuestLayout from 'layouts/GuestLayout.vue'
import GuestListPage from 'pages/guests/GuestListPage.vue'
const routes = [
  {
    path: '/',
    component: MainLayoutVue,
    children: [
      { path: '', component: IndexPage }
    ]
  },

  {
    path: '/guests',
    component: GuestLayout,
    children: [
      { path: '', component: GuestIndexPageVue },
      { path: 'list', component: GuestListPage },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
