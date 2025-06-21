import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import FormPKL from '@/components/FormPkl.vue'
import FormKunjungan from '@/components/FormKunjungan.vue'
import CekStatus from '@/views/CekStatus.vue'
import LoginAdmin from '@/components/LoginAdmin.vue'
import DashboardAdmin from '@/views/DashboardAdmin.vue'

// Tambahan halaman admin lainnya
import RiwayatPKL from '@/views/admin/RiwayatPkl.vue'
import RiwayatKunjungan from '@/views/admin/RiwayatKunjungan.vue'
import Laporan from '@/views/admin/Laporan.vue'
import Users from '@/views/admin/Users.vue'
import Tentang from '@/views/admin/Tentang.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/daftar-pkl', component: FormPKL },
  { path: '/daftar-kunjungan', component: FormKunjungan },
  { path: '/status', component: CekStatus },
  { path: '/admin', component: LoginAdmin },
  { path: '/admin/dashboard', component: DashboardAdmin },

  // Rute tambahan untuk sidebar
  { path: '/admin/riwayat-pkl', component: RiwayatPKL },
  { path: '/admin/riwayat-kunjungan', component: RiwayatKunjungan },
  { path: '/admin/laporan', component: Laporan },
  { path: '/admin/users', component: Users },
  { path: '/admin/tentang', component: Tentang },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard: cek akses ke route yang butuh login
router.beforeEach((to, from, next) => {
  const admin = JSON.parse(localStorage.getItem('admin'))

  const adminOnlyPaths = [
    '/admin/dashboard',
    '/admin/riwayat-pkl',
    '/admin/riwayat-kunjungan',
    '/admin/laporan',
    '/admin/users',
    '/admin/tentang',
  ]

  if (adminOnlyPaths.includes(to.path) && !admin) {
    next('/admin')
  } else if (to.path === '/admin' && admin) {
    next('/admin/dashboard')
  } else {
    next()
  }
})

export default router
