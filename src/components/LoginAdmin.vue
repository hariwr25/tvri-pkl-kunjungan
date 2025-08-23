<template>
  <div class="login-container">
    <!-- Background Grid Pattern -->
    <div class="grid-pattern"></div>
    
    <!-- Main Login Card - Single Container -->
    <div class="main-card">
      <!-- Left Side - Branding -->
      <div class="branding-section">
        <div class="branding-content">
          <div class="logo-header">
            <div class="logo-icon">
              <i class="fas fa-broadcast-tower"></i>
            </div>
            <div class="brand-text">
              <h1 class="brand-title">TVRI YOGYAKARTA</h1>
              <h2 class="page-title">Admin Dashboard</h2>
            </div>
          </div>
          
          <p class="brand-subtitle">Sistem Pengelolaan PKL dan Kunjungan Industri</p>
          
          <div class="feature-grid">
            <div class="feature-item">
              <i class="fas fa-graduation-cap"></i>
              <span>Kelola Pengajuan PKL</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-building"></i>
              <span>Monitoring Kunjungan Industri</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-cogs"></i>
              <span>Manajemen Jadwal Broadcasting</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-chart-line"></i>
              <span>Laporan & Analitik</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Right Side - Login Form -->
      <div class="login-section">
        <div class="login-content">
          <div class="form-header">
            <h3 class="login-title">Login Administrator</h3>
            <p class="login-subtitle">Akses sistem manajemen TVRI</p>
          </div>

          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label class="form-label">Username Admin</label>
              <div class="input-container">
                <i class="fas fa-user input-icon"></i>
                <input
                  v-model="username"
                  type="text"
                  class="form-input"
                  placeholder="Masukkan username admin"
                  required
                  autocomplete="username"
                >
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Password</label>
              <div class="input-container">
                <i class="fas fa-lock input-icon"></i>
                <input
                  v-model="password"
                  type="password"
                  class="form-input"
                  placeholder="Masukkan password admin"
                  required
                  autocomplete="current-password"
                >
              </div>
            </div>

            <div class="form-options">
              <label class="remember-me">
                <input type="checkbox" v-model="rememberMe">
                <span class="remember-text">Ingat sesi login</span>
              </label>
              <a href="#" class="forgot-link">Lupa password?</a>
            </div>

            <button
              type="submit"
              class="login-button"
              :disabled="loading"
            >
              <i class="fab fa-google"></i>
              <span v-if="!loading">Masuk ke Sistem PKL & Kunjungan</span>
              <span v-else>
                <i class="fas fa-spinner fa-spin"></i>
                Memproses...
              </span>
            </button>

            <div class="info-box">
              <i class="fas fa-info-circle"></i>
              <p>Sistem ini khusus untuk administrator dalam mengelola pengajuan PKL dan kunjungan industri. Pastikan Anda memiliki otoritas akses yang sesuai.</p>
            </div>
          </form>

          <div class="form-footer">
            <p>© 2024 TVRI Yogyakarta - Lembaga Penyiaran Publik</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginAdmin',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      rememberMe: false
    }
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
        alert('Username dan password wajib diisi.');
        return;
      }

      this.loading = true;

      try {
        const res = await fetch('http://localhost:5050/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error('Respons bukan JSON:\n' + text.slice(0, 200));
        }

        const data = await res.json();

        if (res.ok) {
          // Simpan data admin ke localStorage
          localStorage.setItem('admin', JSON.stringify(data.user));
          // Redirect ke dashboard
          this.$router.push('/admin/dashboard');
        } else {
          alert(data.message || 'Login gagal');
        }

      } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan: ' + error.message);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  padding: 20px;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridMove 25s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
}

.main-card {
  background: rgba(30, 41, 59, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  display: flex;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow: hidden;
  z-index: 1;
}

.branding-section {
  flex: 1;
  padding: 40px;
  display: flex;
  align-items: center;
}

.branding-content {
  width: 100%;
  max-width: 450px;
}

.logo-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.logo-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
}

.logo-icon i {
  font-size: 30px;
  color: white;
}

.brand-text {
  flex: 1;
}

.brand-title {
  font-size: 32px;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 5px;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 16px;
  color: #94a3b8;
  margin-bottom: 35px;
  line-height: 1.5;
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #cbd5e1;
  font-size: 14px;
  padding: 12px 16px;
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

.feature-item i {
  color: #3b82f6;
  font-size: 16px;
  width: 16px;
  flex-shrink: 0;
}

.divider {
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(71, 85, 105, 0.5), transparent);
  margin: 20px 0;
  flex-shrink: 0;
}

.login-section {
  flex: 1;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-content {
  width: 100%;
  max-width: 380px;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #f1f5f9;
  margin-bottom: 8px;
}

.input-container {
  position: relative;
  background: rgba(51, 65, 85, 0.6);
  border: 1px solid rgba(71, 85, 105, 0.4);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.input-container:hover {
  border-color: rgba(59, 130, 246, 0.5);
}

.input-container:focus-within {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 14px 14px 14px 42px;
  background: transparent;
  border: none;
  color: #f1f5f9;
  font-size: 15px;
  outline: none;
}

.form-input::placeholder {
  color: #64748b;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #cbd5e1;
  font-size: 13px;
}

.remember-me input[type="checkbox"] {
  width: 15px;
  height: 15px;
  accent-color: #3b82f6;
}

.forgot-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #60a5fa;
}

.login-button {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.info-box {
  display: flex;
  gap: 10px;
  padding: 12px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  margin-bottom: 20px;
}

.info-box i {
  color: #3b82f6;
  font-size: 14px;
  margin-top: 1px;
  flex-shrink: 0;
}

.info-box p {
  color: #cbd5e1;
  font-size: 12px;
  line-height: 1.4;
  margin: 0;
}

.form-footer {
  text-align: center;
  padding-top: 15px;
  border-top: 1px solid rgba(71, 85, 105, 0.3);
}

.form-footer p {
  color: #64748b;
  font-size: 11px;
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .main-card {
    flex-direction: column;
    max-width: 500px;
    max-height: none;
  }
  
  .divider {
    width: auto;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(71, 85, 105, 0.5), transparent);
    margin: 0 20px;
  }
  
  .branding-section {
    padding: 30px 40px 20px;
  }
  
  .login-section {
    padding: 20px 40px 30px;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .logo-header {
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .login-container {
    padding: 15px;
  }
  
  .main-card {
    border-radius: 20px;
  }
  
  .branding-section {
    padding: 25px 30px 15px;
  }
  
  .login-section {
    padding: 15px 30px 25px;
  }
  
  .logo-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .brand-title {
    font-size: 24px;
  }
  
  .page-title {
    font-size: 18px;
  }
  
  .login-content {
    max-width: none;
  }
}

@media (max-width: 480px) {
  .branding-section {
    padding: 20px 25px 10px;
  }
  
  .login-section {
    padding: 10px 25px 20px;
  }
  
  .brand-title {
    font-size: 20px;
  }
  
  .page-title {
    font-size: 16px;
  }
}
</style>