<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold">TV</span>
            </div>
            <span class="text-xl font-bold">TVRI Yogyakarta</span>
          </div>
          <div class="hidden md:flex items-center gap-6">
            <a href="#home" class="hover:text-blue-300 transition-colors">Beranda</a>
            <a href="#info" class="hover:text-blue-300 transition-colors">Info</a>
            <a href="#program" class="hover:text-blue-300 transition-colors">Program</a>
            <a href="#kontak" class="hover:text-blue-300 transition-colors">Kontak</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="relative min-h-screen flex items-center justify-center pt-20">
      <!-- Animated Background -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
        <div class="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 4s;"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="text-center lg:text-left">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-sm">Pendaftaran Online Tersedia</span>
          </div>
          
          <h1 class="text-5xl lg:text-7xl font-black mb-6 leading-tight">
            <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Bergabung
            </span>
            <br>
            <span class="text-white">dengan TVRI</span>
            <br>
            <span class="text-2xl lg:text-4xl font-normal text-blue-300">Yogyakarta</span>
          </h1>
          
          <p class="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
            Wujudkan impianmu di dunia broadcasting melalui program PKL dan kunjungan edukatif bersama stasiun televisi publik terdepan.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              @click="scrollToSection('pkl')"
              class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span class="relative z-10">📚 Daftar PKL</span>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              @click="scrollToSection('kunjungan')"
              class="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span class="relative z-10">🏛️ Kunjungan Edukatif</span>
            </button>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 text-center">
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div class="text-2xl font-bold text-blue-400">{{ stats.students }}+</div>
              <div class="text-sm text-gray-400">Peserta PKL</div>
            </div>
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div class="text-2xl font-bold text-purple-400">{{ stats.visits }}+</div>
              <div class="text-sm text-gray-400">Kunjungan</div>
            </div>
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div class="text-2xl font-bold text-pink-400">{{ stats.years }}</div>
              <div class="text-sm text-gray-400">Tahun Pengalaman</div>
            </div>
          </div>
        </div>

        <!-- Visual Content -->
        <div class="relative">
          <!-- Main Image Container -->
          <div class="relative w-full max-w-lg mx-auto">
            <div class="aspect-square rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                :src="currentImage"
                :alt="'Slide ' + (currentImageIndex + 1)"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            <!-- Floating Cards -->
            <div class="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 animate-bounce">
              <div class="text-2xl">🎬</div>
              <div class="text-xs text-gray-300">Live Studio</div>
            </div>
            
            <div class="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 animate-bounce" style="animation-delay: 1s;">
              <div class="text-2xl">📺</div>
              <div class="text-xs text-gray-300">Broadcasting</div>
            </div>
          </div>

          <!-- Image Indicators -->
          <div class="flex justify-center gap-2 mt-6">
            <button
              v-for="(image, index) in images"
              :key="index"
              @click="currentImageIndex = index"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300',
                currentImageIndex === index ? 'bg-blue-400 w-8' : 'bg-white/30'
              ]"
            ></button>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section id="info" class="py-20 px-6 bg-white/5 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6">
            <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Program Unggulan
            </span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Pilih program yang sesuai dengan kebutuhan dan minatmu dalam dunia broadcasting
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- PKL Card -->
          <div id="pkl" class="group relative bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl">
                  🎓
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">Program PKL</h3>
                  <p class="text-blue-300">Praktik Kerja Lapangan</p>
                </div>
              </div>

              <p class="text-gray-300 mb-6 leading-relaxed">
                Dapatkan pengalaman langsung di industri broadcasting dengan bimbingan profesional dari tim TVRI Yogyakarta.
              </p>

              <div class="space-y-4 mb-8">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span class="text-gray-300">Durasi: 1-3 bulan (fleksibel)</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span class="text-gray-300">Tersedia untuk siswa SMA/SMK & mahasiswa</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span class="text-gray-300">Sertifikat resmi dari TVRI</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span class="text-gray-300">Bimbingan mentor berpengalaman</span>
                </div>
              </div>

              <div class="bg-white/5 rounded-2xl p-4 mb-6">
                <h4 class="font-semibold text-blue-300 mb-2">Bidang yang Tersedia:</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">Produksi</span>
                  <span class="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">Penyiaran</span>
                  <span class="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">Teknik</span>
                  <span class="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">Jurnalistik</span>
                </div>
              </div>

              <button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105">
                Daftar PKL Sekarang
              </button>
            </div>
          </div>

          <!-- Kunjungan Card -->
          <div id="kunjungan" class="group relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl">
                  🏛️
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">Kunjungan Edukatif</h3>
                  <p class="text-purple-300">Study Tour & Field Trip</p>
                </div>
              </div>

              <p class="text-gray-300 mb-6 leading-relaxed">
                Jelajahi dunia broadcasting melalui kunjungan edukatif yang informatif dan menyenangkan untuk sekolah dan komunitas.
              </p>

              <div class="space-y-4 mb-8">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span class="text-gray-300">Durasi: 2-4 jam per kunjungan</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span class="text-gray-300">Minimal 10 peserta per grup</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span class="text-gray-300">Tour studio dan fasilitas</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span class="text-gray-300">Presentasi dari tim ahli</span>
                </div>
              </div>

              <div class="bg-white/5 rounded-2xl p-4 mb-6">
                <h4 class="font-semibold text-purple-300 mb-2">Fasilitas Tour:</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">Studio TV</span>
                  <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">Ruang Kontrol</span>
                  <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">Editing Room</span>
                  <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">Museum</span>
                </div>
              </div>

              <button class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105">
                Ajukan Kunjungan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section id="program" class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6">
            <span class="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Mengapa Memilih Kami?
            </span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            TVRI Yogyakarta telah dipercaya sebagai tempat pembelajaran terbaik di industri broadcasting
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
          >
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold text-white mb-3">{{ feature.title }}</h3>
            <p class="text-gray-300 leading-relaxed">{{ feature.description }}</p>
            
            <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="kontak" class="py-20 px-6 bg-white/5 backdrop-blur-sm">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6">
          <span class="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Hubungi Kami
          </span>
        </h2>
        <p class="text-xl text-gray-300 mb-12">
          Tim kami siap membantu mewujudkan rencana PKL dan kunjungan edukatif Anda
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div class="text-3xl mb-4">📍</div>
            <h3 class="font-semibold text-white mb-2">Alamat</h3>
            <p class="text-gray-300 text-sm">Jl. Magelang KM 4, Sinduadi, Mlati, Sleman, Yogyakarta 55284</p>
          </div>
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div class="text-3xl mb-4">📞</div>
            <h3 class="font-semibold text-white mb-2">Telepon</h3>
            <p class="text-gray-300 text-sm">(0274) 868844</p>
          </div>
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div class="text-3xl mb-4">✉️</div>
            <h3 class="font-semibold text-white mb-2">Email</h3>
            <p class="text-gray-300 text-sm">tvri.yogyakarta@tvri.go.id</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105">
            💬 WhatsApp
          </button>
          <button class="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105">
            📧 Email Kami
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 border-t border-white/10">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <span class="text-white font-bold text-lg">TV</span>
              </div>
              <span class="text-2xl font-bold">TVRI Yogyakarta</span>
            </div>
            <p class="text-gray-400 max-w-md">
              Stasiun televisi publik yang berkomitmen pada pendidikan dan pengembangan sumber daya manusia di bidang broadcasting dan media.
            </p>
          </div>
          <div>
            <h3 class="font-semibold text-white mb-4">Program</h3>
            <div class="space-y-2 text-gray-400">
              <a href="#" class="block hover:text-white transition-colors">PKL Broadcasting</a>
              <a href="#" class="block hover:text-white transition-colors">Kunjungan Edukatif</a>
              <a href="#" class="block hover:text-white transition-colors">Workshop</a>
              <a href="#" class="block hover:text-white transition-colors">Pelatihan</a>
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-white mb-4">Links</h3>
            <div class="space-y-2 text-gray-400">
              <a href="#" class="block hover:text-white transition-colors">Tentang Kami</a>
              <a href="#" class="block hover:text-white transition-colors">Berita</a>
              <a href="#" class="block hover:text-white transition-colors">Karir</a>
              <a href="#" class="block hover:text-white transition-colors">Kontak</a>
            </div>
          </div>
        </div>
        
        <div class="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; 2025 TVRI Yogyakarta - Divisi New Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ModernTVRILanding',
  data() {
    return {
      stats: {
        students: 500,
        visits: 150,
        years: 25
      },
      images: [
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=600&fit=crop&auto=format'
      ],
      currentImageIndex: 0,
      features: [
        {
          icon: '🎥',
          title: 'Studio Modern',
          description: 'Fasilitas studio dengan teknologi broadcasting terdepan dan peralatan profesional untuk pengalaman belajar optimal.'
        },
        {
          icon: '👨‍🏫',
          title: 'Mentor Berpengalaman',
          description: 'Dibimbing langsung oleh profesional media berpengalaman dengan track record di industri broadcasting nasional.'
        },
        {
          icon: '📜',
          title: 'Sertifikat Resmi',
          description: 'Dapatkan sertifikat resmi dari TVRI yang diakui industri dan dapat mendukung pengembangan karir Anda.'
        },
        {
          icon: '🌐',
          title: 'Network Luas',
          description: 'Bangun jaringan profesional dengan sesama peserta dan praktisi media dari berbagai latar belakang.'
        },
        {
          icon: '🎓',
          title: 'Kurikulum Lengkap',
          description: 'Program pembelajaran komprehensif yang mencakup teori dan praktik langsung di lapangan.'
        },
        {
          icon: '💼',
          title: 'Peluang Karir',
          description: 'Kesempatan untuk berkarir di TVRI atau jaringan mitra setelah menyelesaikan program dengan baik.'
        }
      ]
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    }
  },
  mounted() {
    // Auto-rotate images
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 4000);

    // Animate stats counter
    this.animateStats();
  },
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    animateStats() {
      const counters = [
        { key: 'students', target: 500, current: 0 },
        { key: 'visits', target: 150, current: 0 },
        { key: 'years', target: 25, current: 0 }
      ];

      counters.forEach(counter => {
        const increment = counter.target / 100;
        const timer = setInterval(() => {
          counter.current += increment;
          if (counter.current >= counter.target) {
            counter.current = counter.target;
            clearInterval(timer);
          }
          this.stats[counter.key] = Math.floor(counter.current);
        }, 20);
      });
    }
  }
};
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom gradient animations */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-gradient-animated {
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

/* Hover effects */
.hover-lift {
  transition: all 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

/* Glass morphism effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Responsive design enhancements */
@media (max-width: 768px) {
  .text-7xl {
    font-size: 3rem;
  }
  
  .text-5xl {
    font-size: 2.5rem;
  }
}
</style>