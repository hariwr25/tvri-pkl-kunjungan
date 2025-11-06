<template>
  <div class="login-wrapper">
    <!-- Background Image (Full Screen) -->
    <div class="background-container">
      <img :src="require('@/assets/bg1.jpg')" alt="TVRI Background" class="background-image">
      <div class="overlay"></div>
    </div>

    <!-- Main Content -->
    <div class="login-container">
      <!-- Login Card (Glassmorphism) -->
      <div class="login-card">
        <!-- Form Header -->
        <div class="form-header">
          <div class="header-top">
            <div class="logo-circle">
              <img :src="require('@/assets/logo.png')" alt="TVRI Logo" class="logo-image">
            </div>
            <div class="header-content">
              <h2 class="form-title">Administrator Access</h2>
              <p class="form-description">TVRI Yogyakarta</p>
            </div>
          </div>
          <p class="form-subtitle">Sistem Manajemen PKL & Kunjungan Industri</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- Username Field -->
          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-user"></i>
              <span>Username</span>
            </label>
            <div 
              class="input-wrapper"
              :class="{ 'focused': focusedInput === 'username' }"
            >
              <div class="input-icon">
                <i class="fas fa-user-circle"></i>
              </div>
              <input
                v-model="username"
                type="text"
                class="form-input"
                placeholder="Masukkan username admin"
                @focus="focusedInput = 'username'"
                @blur="focusedInput = ''"
                required
                autocomplete="username"
              >
            </div>
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-lock"></i>
              <span>Password</span>
            </label>
            <div 
              class="input-wrapper"
              :class="{ 'focused': focusedInput === 'password' }"
            >
              <div class="input-icon">
                <i class="fas fa-key"></i>
              </div>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="Masukkan password admin"
                @focus="focusedInput = 'password'"
                @blur="focusedInput = ''"
                required
                autocomplete="current-password"
              >
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
                tabindex="-1"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="submit-button"
            :disabled="loading"
            :class="{ 'loading': loading }"
          >
            <span class="button-content">
              <i :class="loading ? 'fas fa-spinner fa-spin' : 'fas fa-sign-in-alt'"></i>
              <span v-if="!loading">Masuk ke Dashboard</span>
              <span v-else>Memproses Login...</span>
            </span>
            <div class="button-glow"></div>
          </button>

          <!-- Info Alert -->
          <div class="alert-info">
            <i class="fas fa-shield-check"></i>
            <div class="alert-text">
              <strong>Sistem Terenkripsi</strong> • Akses terbatas untuk administrator resmi TVRI Yogyakarta
            </div>
          </div>
        </form>

        <!-- Footer -->
        <div class="card-footer">
          <div class="security-badge">
            <i class="fas fa-lock"></i>
            <span>Secure Connection</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModernLoginTVRI',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      loading: false,
      focusedInput: ''
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
          localStorage.setItem('admin', JSON.stringify(data.user));
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;
  padding: 20px;
}

/* Background Container */
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.5);
  transform: scale(1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.85) 0%, 
    rgba(30, 41, 59, 0.80) 50%,
    rgba(51, 65, 85, 0.75) 100%
  );
  backdrop-filter: blur(3px);
}

/* Main Container */
.login-container {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  position: relative;
  z-index: 1;
}

/* Login Card with Dark Glassmorphism */
.login-card {
  width: 100%;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  padding: 40px 35px;
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 8px 32px rgba(0, 0, 0, 0.4);
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Form Header */
.form-header {
  margin-bottom: 35px;
}

.header-top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.logo-circle {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  padding: 10px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.header-content {
  flex: 1;
  text-align: left;
}

.form-title {
  font-size: 26px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 4px;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.form-description {
  font-size: 14px;
  color: #cbd5e1;
  font-weight: 600;
  margin: 0;
}

.form-subtitle {
  font-size: 13px;
  color: #cbd5e1;
  font-weight: 500;
  text-align: center;
  padding: 12px 20px;
  background: rgba(51, 65, 85, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Form Styling */
.login-form {
  margin-bottom: 0;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #cbd5e1;
  margin-bottom: 10px;
}

.form-label i {
  font-size: 14px;
  color: #3b82f6;
}

.input-wrapper {
  position: relative;
  background: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
}

.input-wrapper:hover {
  border-color: rgba(255, 255, 255, 0.25);
  background: rgba(30, 41, 59, 0.5);
}

.input-wrapper.focused {
  background: rgba(30, 41, 59, 0.6);
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
}

.input-icon {
  padding-left: 18px;
  color: #94a3b8;
  transition: color 0.3s ease;
}

.input-wrapper.focused .input-icon {
  color: #3b82f6;
}

.input-icon i {
  font-size: 18px;
}

.form-input {
  flex: 1;
  padding: 16px 18px;
  background: transparent;
  border: none;
  color: #f1f5f9;
  font-size: 15px;
  font-weight: 500;
  outline: none;
}

.form-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.password-toggle {
  padding: 0 18px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.3s ease;
}

.password-toggle:hover {
  color: #3b82f6;
  transform: scale(1.1);
}

.password-toggle i {
  font-size: 18px;
}

/* Submit Button */
.submit-button {
  width: 100%;
  padding: 17px 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 20px;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
}

.submit-button:active:not(:disabled) {
  transform: translateY(-1px);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.button-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.submit-button:hover:not(:disabled) .button-glow {
  left: 100%;
}

/* Alert Info */
.alert-info {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(30, 64, 175, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.5;
}

.alert-info i {
  color: #60a5fa;
  font-size: 16px;
  margin-top: 1px;
  flex-shrink: 0;
}

.alert-text {
  color: #bfdbfe;
  font-weight: 500;
}

.alert-text strong {
  font-weight: 700;
  color: #dbeafe;
}

/* Card Footer */
.card-footer {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  justify-content: center;
}

.security-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 50px;
  color: #6ee7b7;
  font-size: 12px;
  font-weight: 600;
}

.security-badge i {
  font-size: 13px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .login-wrapper {
    padding: 15px;
  }

  .login-container {
    max-width: 100%;
  }

  .login-card {
    padding: 35px 30px;
    border-radius: 24px;
  }

  .header-top {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .header-content {
    text-align: center;
  }

  .form-title {
    font-size: 24px;
  }

  .logo-circle {
    width: 65px;
    height: 65px;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 25px;
  }

  .logo-circle {
    width: 60px;
    height: 60px;
  }

  .form-title {
    font-size: 22px;
  }

  .form-description {
    font-size: 13px;
  }
}

/* Loading Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.fa-spin {
  animation: spin 1s linear infinite;
}
</style>