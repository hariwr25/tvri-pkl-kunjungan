<template>
  <div class="min-h-screen bg-gray-900 relative overflow-hidden flex items-center justify-center">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div class="absolute -bottom-8 -left-4 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style="animation-delay: 2s;"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse" style="animation-delay: 4s;"></div>
    </div>

    <div class="relative w-full max-w-2xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2 animate-pulse">
          Form Pendaftaran PKL
        </h2>
        <p class="text-gray-300">Lengkapi formulir di bawah untuk mendaftar program PKL</p>
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
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
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
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"></path>
                    </svg>
                  </div>
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
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400 group-hover:border-white/30"
                    required
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
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
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400 group-hover:border-white/30"
                    required
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
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
                <label class="text-sm font-medium text-gray-200">No. HP</label>
                <div class="relative group">
                  <input
                    v-model="form.no_hp"
                    type="text"
                    placeholder="08xxxxxxxxxx"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400 group-hover:border-white/30"
                    required
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
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
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white placeholder-gray-400 group-hover:border-white/30"
                    required
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Schedule Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white flex items-center">
              <div class="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
              Jadwal PKL
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Tanggal Mulai -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Tanggal Mulai</label>
                <div class="relative group">
                  <input
                    v-model="form.tanggal_mulai"
                    type="date"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white group-hover:border-white/30"
                    required
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Tanggal Selesai -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200">Tanggal Selesai</label>
                <div class="relative group">
                  <input
                    v-model="form.tanggal_selesai"
                    type="date"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white group-hover:border-white/30"
                    required
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- File Upload Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white flex items-center">
              <div class="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse"></div>
              Dokumen Pendukung
            </h3>
            
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-200">Upload Surat Pengantar</label>
              <div class="relative group">
                <input
                  type="file"
                  @change="handleFileUpload"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 hover:bg-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30 file:transition-all file:duration-200 group-hover:border-white/30"
                  accept=".pdf,.doc,.docx"
                  required
                />
              </div>
              <p class="text-xs text-gray-400">Format yang didukung: PDF, DOC, DOCX (Maksimal 5MB)</p>
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
      isDark: true,
      isSubmitting: false,
      form: {
        nama_lengkap: '',
        asal_instansi: '',
        nim_nisn: '',
        jurusan: '',
        no_hp: '',
        email: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        surat_pengantar: null,
      },
    };
  },


    handleFileUpload(event) {
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
        
        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
          Swal.fire({
            title: 'Format File Tidak Valid!',
            text: 'Hanya file PDF, DOC, dan DOCX yang diperbolehkan',
            icon: 'error',
            background: '#1f2937',
            color: '#ffffff',
            confirmButtonColor: '#ef4444'
          });
          event.target.value = '';
          return;
        }

        this.form.surat_pengantar = file;
        
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
      // Show loading state
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
        formData.append(key, this.form[key]);
      }

      try {
        await axios.post('http://localhost:5050/api/pkl', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Success alert with animation
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

        // Reset form after successful submission
        this.resetForm();

      } catch (err) {
        console.error('Error submitting form:', err);
        
        // Error alert
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
        if (key === 'surat_pengantar') {
          this.form[key] = null;
        } else {
          this.form[key] = '';
        }
      });
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
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
/* Enhanced animations and transitions */
@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.9;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Enhanced focus states with glow effect */
input:focus,
input[type="file"]:focus {
  transform: translateY(-2px);
  box-shadow: 
    0 10px 25px -5px rgba(0, 0, 0, 0.2), 
    0 10px 10px -5px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(59, 130, 246, 0.3),
    0 0 20px rgba(59, 130, 246, 0.2);
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* File input styling for dark theme */
input[type="file"]::file-selector-button {
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  background: black;
  color: rgb(147, 197, 253);
  cursor: pointer;
  transition: all 0.2s;
}

input[type="file"]::file-selector-button:hover {
  background: rgba(59, 130, 246, 0.3);
  color: rgb(165, 208, 255);
}

/* Glassmorphism effect enhancement */
.bg-white\/10 {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Button hover effects */
button:hover {
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1), 
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 30px rgba(59, 130, 246, 0.3);
}

/* Loading spinner animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Enhanced gradient text */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Form section spacing and visual hierarchy */
.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

/* Enhanced input group hover effects */
.group:hover .group-hover\:border-white\/30 {
  border-color: rgba(255, 255, 255, 0.3);
}

.group:hover .group-hover\:text-gray-300 {
  color: rgb(209, 213, 219);
}

/* Responsive design improvements */
@media (max-width: 768px) {
  .grid-cols-1.md\:grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
  .text-4xl {
    font-size: 2.5rem;
    line-height: 1;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
}

/* Success and error state animations */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-bounce {
  animation: bounce 0.5s ease-in-out;
}

/* Custom date input styling for dark theme */
input[type="date"] {
  color-scheme: dark;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

/* Enhanced backdrop blur for better glass effect */
@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {
  .backdrop-blur-md {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
}

/* Fallback for browsers that don't support backdrop-filter */
@supports not ((backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))) {
  .backdrop-blur-md {
    background: rgba(31, 41, 55, 0.8);
  }
}



/* Enhanced form validation styles */
input:invalid {
  border-color: rgba(239, 68, 68, 0.5);
}

input:valid {
  border-color: rgba(16, 185, 129, 0.5);
}

/* Custom tooltip styles */
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 8px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

/* Enhanced mobile responsiveness */
@media (max-width: 640px) {
  .fixed.top-6.right-6 {
    top: 1rem;
    right: 1rem;
  }
  
  .p-4 {
    padding: 1rem;
  }
  
  .rounded-3xl {
    border-radius: 1.5rem;
  }
  
  .text-center.mb-8 {
    margin-bottom: 2rem;
  }
}

/* Print styles for form */
@media print {
  .fixed, .bg-gradient-to-br, .animate-pulse {
    display: none !important;
  }
  
  .bg-white\/10 {
    background: white !important;
    border: 1px solid #ccc !important;
  }
  
  .text-white, .text-gray-200, .text-gray-300 {
    color: black !important;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse,
  .animate-spin,
  .animate-float,
  .transition-all {
    animation: none !important;
    transition: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .bg-white\/10 {
    background: rgba(255, 255, 255, 0.2) !important;
    border: 2px solid rgba(255, 255, 255, 0.5) !important;
  }
  
  input {
    border-width: 2px !important;
  }
}

/* Focus visible for keyboard navigation */
input:focus-visible,
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Loading state for form */
.form-loading {
  pointer-events: none;
  opacity: 0.6;
}

.form-loading * {
  cursor: wait !important;
}

/* Success state animations */
@keyframes checkmark {
  0% { stroke-dashoffset: 50; }
  100% { stroke-dashoffset: 0; }
}

.checkmark {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: checkmark 0.5s ease-in-out forwards;
}

/* Form field error states */
.field-error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 1px #ef4444 !important;
}

.field-error:focus {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3) !important;
}

/* Success field states */
.field-success {
  border-color: #10b981 !important;
}

.field-success:focus {
  border-color: #10b981 !important;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3) !important;
}

/* Progress indicator */
.progress-bar {
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
  animation: progress 2s ease-in-out;
}

@keyframes progress {
  0% { width: 0%; }
  100% { width: 100%; }
}

/* Enhanced button states */
.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  transform: translateY(0);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 5px 10px rgba(59, 130, 246, 0.3);
}

/* Floating labels effect */
.floating-label {
  position: relative;
}

.floating-label input:focus + label,
.floating-label input:not(:placeholder-shown) + label {
  transform: translateY(-24px) scale(0.85);
  color: #3b82f6;
}

.floating-label label {
  position: absolute;
  left: 12px;
  top: 12px;
  transition: all 0.2s ease;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(31, 41, 55, 1) 50%);
  padding: 0 4px;
}

/* File upload drag and drop styles */
.file-upload-area {
  position: relative;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.file-upload-area:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.1);
}

.file-upload-area.drag-over {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.2);
  transform: scale(1.02);
}

/* Enhanced notification styles */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification.success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.notification.error {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

/* Form step indicator */
.step-indicator {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.step {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
}

.step.active {
  background: #3b82f6;
  color: white;
  transform: scale(1.1);
}

.step.completed {
  background: #10b981;
  color: white;
}

/* Enhanced form sections */
.form-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-section:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Dark mode specific adjustments */
@media (prefers-color-scheme: dark) {
  .form-section {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

</style>