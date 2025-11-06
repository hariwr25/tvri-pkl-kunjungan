import { createRouter, createWebHistory } from 'vue-router'

// Halaman utama
import Home from '@/views/Home.vue'
import FormPKL from '@/components/FormPkl.vue'
import FormKunjungan from '@/components/FormKunjungan.vue'
import CekStatus from '@/views/CekStatus.vue'
import LoginAdmin from '@/components/LoginAdmin.vue'

// Halaman admin utama
import DashboardAdmin from '@/views/admin/DashboardAdmin.vue'

// Halaman admin lainnya
import DataPKL from '@/views/admin/DataPkl.vue'
import DataKunjungan from '@/views/admin/DataKunjungan.vue'
import Laporan from '@/views/admin/Laporan.vue'
import Users from '@/views/admin/Users.vue'
import Profil from '@/views/admin/ProfilAdmin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/daftar-pkl',
    name: 'DaftarPKL',
    component: FormPKL
  },
  {
    path: '/daftar-kunjungan',
    name: 'DaftarKunjungan',
    component: FormKunjungan
  },
  {
    path: '/cek-status',
    name: 'CekStatus',
    component: CekStatus,
    meta: {
      title: 'Cek Status Pendaftaran - TVRI Yogyakarta'
    }
  },
  {
    path: '/admin',
    name: 'LoginAdmin',
    component: LoginAdmin
  },
  {
    path: '/admin/dashboard',
    name: 'DashboardAdmin',
    component: DashboardAdmin
  },
  {
    path: '/admin/pkl',
    name: 'DataPKL',
    component: DataPKL
  },
  {
    path: '/admin/kunjungan',
    name: 'DataKunjungan',
    component: DataKunjungan
  },
  {
    path: '/admin/laporan',
    name: 'Laporan',
    component: Laporan
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/admin/profil',
    name: 'ProfilAdmin',
    component: Profil
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard: Cek akses login admin
router.beforeEach((to, from, next) => {
  const admin = JSON.parse(localStorage.getItem('admin'))

  const adminOnlyPaths = [
    '/admin/dashboard',
    '/admin/pkl',
    '/admin/profil',
    '/admin/kunjungan',
    '/admin/laporan',
    '/admin/users',
  ]

  // Set judul halaman
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'TVRI Yogyakarta'
  }

  // Jika admin belum login, redirect ke login
  if (adminOnlyPaths.includes(to.path) && !admin) {
    next('/admin')
  } else if (to.path === '/admin' && admin) {
    next('/admin/dashboard')
  } else {
    next()
  }
})

export default router
