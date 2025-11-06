
<template>
  <div class="min-h-screen bg-gray-900 relative overflow-hidden flex items-center justify-center">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div class="absolute -bottom-8 -left-4 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style="animation-delay: 2s;"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse" style="animation-delay: 4s;"></div>
    </div>

    <div class="relative w-full max-w-4xl px-4 py-6 sm:py-8">
      <!-- Header dengan Logo -->
      <div class="text-center mb-6 sm:mb-8">
        <div class="flex items-center justify-center gap-3 sm:gap-4 mb-3">
          <div class="h-16 w-16 sm:h-20 sm:w-20">
            <img :src="require('@/assets/logo.png')" alt="TVRI Logo" class="w-full h-full object-contain" />
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
            Form Pendaftaran PKL
          </h2>
        </div>
        <p class="text-gray-300 text-sm sm:text-base px-2">Lengkapi formulir di bawah untuk mendaftar program PKL di TVRI Yogyakarta</p>
      </div>

      <!-- Form Container -->
      <div class="bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/20 hover:bg-white/[0.12] transition-all duration-300">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Personal Information Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white flex items-center">
              <div class="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
              Informasi Pribadi
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nama Lengkap -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Nama Lengkap</label>
                <div class="relative group">
                  <input
                    v-model="form.nama_lengkap"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400 group-hover:border-white/30"
                    required
                  />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- NIM/NISN -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">NIM / NISN</label>
                <div class="relative group">
                  <input
                    v-model="form.nim_nisn"
                    type="text"
                    placeholder="Masukkan NIM atau NISN"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400 group-hover:border-white/30"
                    required
                  />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Tempat/Tanggal Lahir -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Tempat Lahir</label>
                <div class="relative group">
                  <input
                    v-model="form.tempat_lahir"
                    type="text"
                    placeholder="Kota kelahiran"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400"
                    required
                  />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Tanggal Lahir</label>
                <div class="relative group">
                  <input
                    v-model="form.tanggal_lahir"
                    type="date"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white"
                    required
                  />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Asal Instansi -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Asal Instansi</label>
                <div class="relative group">
                  <input
                    v-model="form.asal_instansi"
                    type="text"
                    placeholder="Nama sekolah/universitas"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400"
                    required
                  />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- Jurusan -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Jurusan</label>
                <div class="relative group">
                  <input
                    v-model="form.jurusan"
                    type="text"
                    placeholder="Program studi/jurusan"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400"
                    required
                  />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Jenjang Pendidikan -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Jenjang Pendidikan</label>
                <div class="relative group">
                  <select
                    v-model="form.jenjang_pendidikan"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white appearance-none"
                    required
                  >
                    <option value="" disabled selected>Pilih jenjang</option>
                    <option value="SMA/SMK" class="bg-gray-800 text-white">SMA/SMK</option>
                    <option value="D1" class="bg-gray-800 text-white">Diploma 1 (D1)</option>
                    <option value="D2" class="bg-gray-800 text-white">Diploma 2 (D2)</option>
                    <option value="D3" class="bg-gray-800 text-white">Diploma 3 (D3)</option>
                    <option value="D4" class="bg-gray-800 text-white">Diploma 4 (D4)</option>
                    <option value="S1" class="bg-gray-800 text-white">Sarjana (S1)</option>
                    <option value="S2" class="bg-gray-800 text-white">Magister (S2)</option>
                  </select>
                  <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- Deskripsi Diri -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Deskripsi Diri & Peminatan</label>
                <div class="relative group">
                  <textarea
                    v-model="form.deskripsi_diri"
                    placeholder="Ceritakan singkat tentang diri Anda dan bidang yang diminati"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400 min-h-[100px]"
                    required
                  ></textarea>
                  <span class="absolute left-4 top-4 text-blue-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white flex items-center">
              <div class="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              Informasi Kontak
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- No HP -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">No. WhatsApp</label>
                <div class="relative group">
                  <input
                    v-model="form.no_hp"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400"
                    required
                  />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Email</label>
                <div class="relative group">
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="nama@email.com"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400"
                    required
                  />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- PKL Information Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white flex items-center">
              <div class="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
              Informasi PKL
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Unit Kerja -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Unit Kerja yang Dipilih</label>
                <div class="relative group">
                  <select
                    v-model="form.unit_kerja"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white appearance-none"
                    required
                  >
                    <option value="" disabled selected>Pilih unit kerja</option>
                    <option value="Umum" class="bg-gray-800 text-white">Umum</option>
                    <option value="Program" class="bg-gray-800 text-white">Program</option>
                    <option value="Promo" class="bg-gray-800 text-white">Promo</option>
                    <option value="Berita" class="bg-gray-800 text-white">Berita</option>
                    <option value="Teknik" class="bg-gray-800 text-white">Teknik</option>
                    <option value="Keuangan" class="bg-gray-800 text-white">Keuangan</option>
                    <option value="Pengembangan Usaha" class="bg-gray-800 text-white">Pengembangan Usaha</option>
                    <option value="Konten Media Baru" class="bg-gray-800 text-white">Konten Media Baru</option>
                  </select>
                  <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- Jangka Waktu PKL - Bagian yang diubah -->
              <div class="space-y-2">
  <label class="text-sm font-medium text-gray-200">Jangka Waktu PKL</label>
  <div class="radio-group">
    <label class="radio-item">
      <input 
        v-model="form.jangka_waktu" 
        type="radio" 
        value="3 Bulan"
        class="radio-input"
        required
      />
      <span class="radio-custom"></span>
      <span class="radio-label">3 Bulan</span>
    </label>
    
    <label class="radio-item">
      <input 
        v-model="form.jangka_waktu" 
        type="radio" 
        value="6 Bulan"
        class="radio-input"
      />
      <span class="radio-custom"></span>
      <span class="radio-label">6 Bulan</span>
    </label>
    
    <label class="radio-item">
      <input 
        v-model="form.jangka_waktu" 
        type="radio" 
        value="Lainnya"
        class="radio-input"
      />
      <span class="radio-custom"></span>
      <span class="radio-label">Lainnya</span>
    </label>
  </div>
  
  <input
    v-if="form.jangka_waktu === 'Lainnya'"
    v-model="form.jangka_waktu_lainnya"
    type="text"
    placeholder="Tulis jangka waktu"
    class="w-full mt-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400"
    required
  />
</div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Periode PKL -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Periode PKL (Bulan)</label>
                <div class="relative group">
                  <input
                    v-model="form.bulan_pkl"
                    type="text"
                    placeholder="Contoh: Januari - April 2025"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400"
                    required
                  />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- Alasan Memilih TVRI -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Alasan Memilih TVRI Yogyakarta</label>
                <div class="relative group">
                  <textarea
                    v-model="form.alasan_pilih_tvri"
                    placeholder="Mengapa Anda ingin melaksanakan PKL di TVRI Yogyakarta?"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400 min-h-[100px]"
                    required
                  ></textarea>
                  <span class="absolute left-4 top-4 text-purple-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Tanggal Mulai -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Tanggal Mulai</label>
                <div class="relative group">
                  <input
                    v-model="form.tanggal_mulai"
                    type="date"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white"
                    required
                  />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- Tanggal Selesai -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Tanggal Selesai</label>
                <div class="relative group">
                  <input
                    v-model="form.tanggal_selesai"
                    type="date"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white"
                    required
                  />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Document Upload Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white flex items-center">
              <div class="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse"></div>
              Dokumen Pendukung
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Surat Pengantar -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Surat Permohonan PKL</label>
                <div class="relative group">
                  <input
                    type="file"
                    @change="handleFileUpload('surat_pengantar', $event)"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30 file:transition-all file:duration-200"
                    accept=".pdf"
                    required
                  />
                  <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
                <p class="text-xs text-gray-400">Format: PDF (Maksimal 5MB)</p>
              </div>

              <!-- CV -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Curriculum Vitae (CV)</label>
                <div class="relative group">
                  <input
                    type="file"
                    @change="handleFileUpload('cv', $event)"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30 file:transition-all file:duration-200"
                    accept=".pdf"
                    required
                  />
                  <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
                <p class="text-xs text-gray-400">Format: PDF (Maksimal 5MB)</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nilai Raport/Transkrip -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Nilai Raport/Transkrip Terakhir</label>
                <div class="relative group">
                  <input
                    type="file"
                    @change="handleFileUpload('nilai_raport_transkrip', $event)"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30 file:transition-all file:duration-200"
                    accept=".pdf"
                    required
                  />
                  <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
                <p class="text-xs text-gray-400">Format: PDF (Maksimal 5MB)</p>
              </div>

              <!-- Kartu Pelajar/Mahasiswa -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Kartu Tanda Pelajar/Mahasiswa</label>
                <div class="relative group">
                  <input
                    type="file"
                    @change="handleFileUpload('kartu_pelajar', $event)"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30 file:transition-all file:duration-200"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                  <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
                <p class="text-xs text-gray-400">Format: PDF, JPG, PNG (Maksimal 5MB)</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Foto ID Card -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Foto untuk ID Card</label>
                <div class="relative group">
                  <input
                    type="file"
                    @change="handleFileUpload('foto_id_card', $event)"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30 file:transition-all file:duration-200"
                    accept=".jpg,.jpeg,.png"
                    required
                  />
                  <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
                <p class="text-xs text-gray-400">Format: JPG/PNG (Background merah, memakai jas almamater)</p>
              </div>

              <!-- Portofolio Link -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Link Portofolio/Hasil Karya</label>
                <div class="relative group">
                  <input
                    v-model="form.portofolio_link"
                    type="url"
                    placeholder="https://contoh.com/portofolio"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400"
                  />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
                <p class="text-xs text-gray-400">Opsional - Lampirkan link portofolio jika ada</p>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-6">
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span class="flex items-center justify-center">
                <svg v-if="!isSubmitting" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                <svg v-else class="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSubmitting ? 'Sedang Mengirim...' : 'Kirim Pendaftaran' }}
              </span>
            </button>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="text-center mt-6">
        <p class="text-sm text-gray-400">
          Pastikan semua data yang dimasukkan sudah benar sebelum mengirim formulir
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'PKLRegistrationForm',
  data() {
    return {
      isSubmitting: false,
      form: {
        // Informasi Pribadi
        nama_lengkap: '',
        nim_nisn: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        asal_instansi: '',
        jurusan: '',
        jenjang_pendidikan: '',
        deskripsi_diri: '',
        
        // Informasi Kontak
        no_hp: '',
        email: '',
        
        // Informasi PKL
        unit_kerja: '',
        jangka_waktu: '3 Bulan',
        jangka_waktu_lainnya: '',
        bulan_pkl: '',
        alasan_pilih_tvri: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        
        // Dokumen
        surat_pengantar: null,
        cv: null,
        nilai_raport_transkrip: null,
        kartu_pelajar: null,
        foto_id_card: null,
        portofolio_link: '',
      },
    };
  },
  methods: {
    handleFileUpload(field, event) {
      const file = event.target.files[0];
      if (file) {
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          Swal.fire({
            title: 'File Terlalu Besar!',
            text: 'Ukuran file maksimal 5MB',
            icon: 'error',
            background: '#1f2937',
            color: '#ffffff',
            confirmButtonColor: '#ef4444'
          });
          event.target.value = '';
          return;
        }
        
        // Validate file type based on field
        let allowedTypes = [];
        switch(field) {
          case 'foto_id_card':
            allowedTypes = ['image/jpeg', 'image/png'];
            break;
          case 'surat_pengantar':
          case 'cv':
          case 'nilai_raport_transkrip':
          case 'kartu_pelajar':
            allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            break;
          default:
            allowedTypes = ['application/pdf'];
        }
        
        if (!allowedTypes.includes(file.type)) {
          Swal.fire({
            title: 'Format File Tidak Valid!',
            text: 'Format file tidak sesuai persyaratan',
            icon: 'error',
            background: '#1f2937',
            color: '#ffffff',
            confirmButtonColor: '#ef4444'
          });
          event.target.value = '';
          return;
        }

        this.form[field] = file;
        
        // Show success message
        Swal.fire({
          title: 'File Berhasil Dipilih!',
          text: `File "${file.name}" siap untuk diunggah`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#ffffff',
          toast: true,
          position: 'top-end'
        });
      }
    },

    async submitForm() {
      this.isSubmitting = true;

      // Show loading alert
      Swal.fire({
        title: 'Mengirim Data...',
        text: 'Mohon tunggu sebentar',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#ffffff',
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const formData = new FormData();
      for (const key in this.form) {
        if (this.form[key] !== null && this.form[key] !== '') {
          formData.append(key, this.form[key]);
        }
      }

      try {
        await axios.post('http://localhost:5050/api/pkl', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        await Swal.fire({
          title: 'Berhasil!',
          text: 'Data pendaftaran PKL berhasil dikirim!',
          icon: 'success',
          background: '#1f2937',
          color: '#ffffff',
          confirmButtonColor: '#10b981',
          confirmButtonText: 'OK',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });

        this.resetForm();

      } catch (err) {
        console.error('Error submitting form:', err);
        
        Swal.fire({
          title: 'Gagal Mengirim!',
          text: 'Terjadi kesalahan saat mengirim data. Periksa koneksi internet atau coba lagi nanti.',
          icon: 'error',
          background: '#1f2937',
          color: '#ffffff',
          confirmButtonColor: '#ef4444',
          confirmButtonText: 'Coba Lagi'
        });
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      Object.keys(this.form).forEach(key => {
        if (key === 'jangka_waktu') {
          this.form[key] = '3 Bulan';
        } else if (typeof this.form[key] === 'string') {
          this.form[key] = '';
        } else {
          this.form[key] = null;
        }
      });
      
      // Reset all file inputs
      document.querySelectorAll('input[type="file"]').forEach(input => {
        input.value = '';
      });
    }
  },
  mounted() {
    // Welcome message
    setTimeout(() => {
      Swal.fire({
        title: 'Selamat Datang!',
        text: 'Silahkan lengkapi formulir pendaftaran PKL',
        icon: 'info',
        timer: 3000,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#ffffff',
        toast: true,
        position: 'top-end',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        }
      });
    }, 1000);
  }
};
</script>

<style scoped>
/* Base Styles */
.min-h-screen {
  min-height: 100vh;
}

/* Background Elements */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

/* Form Container Styles */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.rounded-3xl {
  border-radius: 1.5rem;
}

/* Input Field Styles */
.bg-white\/10 {
  background-color: rgba(255, 255, 255, 0.1);
}

.border-white\/20 {
  border-color: rgba(255, 255, 255, 0.2);
}

.hover\:bg-white\/20:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Enhanced Dropdown Styling */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25em 1.25em;
  padding-right: 2.5rem;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  transition: all 0.2s ease;
}

select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
}

/* Dropdown Options */
select option {
  background-color: #1f2937;
  color: #f3f4f6;
  padding: 0.5rem;
}

select option:hover,
select option:focus,
select option:checked {
  background-color: #374151;
  color: #ffffff;
}

/* Custom Radio Buttons */
.radio-group {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.radio-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-input {
  position: absolute;
  opacity: 0;
}

.radio-custom {
  position: relative;
  width: 18px;
  height: 18px;
  border: 2px solid #8b5cf6;
  border-radius: 50%;
  margin-right: 8px;
  transition: all 0.2s ease;
}

.radio-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff;
  transition: transform 0.2s ease;
}

.radio-input:checked ~ .radio-custom {
  border-color: #8b5cf6;
  background-color: #8b5cf6;
}

.radio-input:checked ~ .radio-custom::after {
  transform: translate(-50%, -50%) scale(1);
}

.radio-input:focus ~ .radio-custom {
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
}

.radio-label {
  color: #e5e7eb;
  font-size: 14px;
}

/* Hover Effects */
.radio-item:hover .radio-custom {
  border-color: #a78bfa;
}

/* Input Focus Effects */
input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
  border-color: #8b5cf6;
}

/* File Input Styling */
.file-input-container {
  position: relative;
}

.file-input {
  width: 100%;
}

.file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.file-input::before {
  content: 'Pilih File';
  display: inline-block;
  background: linear-gradient(to bottom, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2));
  border: 1px solid rgba(30, 64, 175, 0.3);
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  color: #93c5fd;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.file-input:hover::before {
  background: linear-gradient(to bottom, rgba(37, 99, 235, 0.3), rgba(29, 78, 216, 0.3));
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-section {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .radio-group {
    flex-direction: column;
    gap: 0.75rem;
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .grid-cols-1.md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 0.75rem;
  }
}

/* Date Input Styling */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.7);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

/* Textarea Styling */
textarea {
  min-height: 100px;
  resize: vertical;
  transition: height 0.2s ease;
}

/* Form Validation */
input:invalid,
textarea:invalid,
select:invalid {
  border-color: rgba(239, 68, 68, 0.5);
}

input:valid,
textarea:valid,
select:valid {
  border-color: rgba(16, 185, 129, 0.5);
}

/* Loading State */
.form-loading {
  pointer-events: none;
  opacity: 0.7;
}

/* Icon Transitions */
.icon-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Button Styles */
.btn-submit {
  background: linear-gradient(to right, #3b82f6, #6366f1);
  transition: all 0.3s ease;
}

.btn-submit:hover {
  background: linear-gradient(to right, #2563eb, #4f46e5);
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.btn-submit:active {
  transform: translateY(0);
}

.btn-submit:disabled {
  background: linear-gradient(to right, #4b5563, #6b7280);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Section Headers */
.section-header {
  position: relative;
  padding-left: 1.5rem;
}

.section-header::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: currentColor;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

/* Input Icons */
.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: currentColor;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.input-with-icon {
  padding-left: 2.5rem;
}

.input-with-icon:focus + .input-icon {
  opacity: 1;
  color: #8b5cf6;
}
</style>