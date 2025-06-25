import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import FormPKL from '@/components/FormPkl.vue'
import FormKunjungan from '@/components/FormKunjungan.vue'
import CekStatus from '@/views/CekStatus.vue'
import LoginAdmin from '@/components/LoginAdmin.vue'
import DashboardAdmin from '@/views/DashboardAdmin.vue'

// Tambahan halaman admin lainnya
import RiwayatPKL from '@/views/RiwayatPkl.vue'
import RiwayatKunjungan from '@/views/RiwayatKunjungan.vue'
import Laporan from '@/views/admin/Laporan.vue'
import Users from '@/views/admin/Users.vue'
import Tentang from '@/views/admin/Tentang.vue'

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

  // Rute tambahan untuk sidebar
  { 
    path: '/admin/riwayat-pkl', 
    name: 'RiwayatPKL',
    component: RiwayatPKL 
  },
  { 
    path: '/admin/riwayat-kunjungan', 
    name: 'RiwayatKunjungan',
    component: RiwayatKunjungan 
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
    path: '/admin/tentang', 
    name: 'Tentang',
    component: Tentang 
  },
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

  // Set judul halaman
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'TVRI Yogyakarta'
  }

  if (adminOnlyPaths.includes(to.path) && !admin) {
    next('/admin')
  } else if (to.path === '/admin' && admin) {
    next('/admin/dashboard')
  } else {
    next()
  }
})

export default router