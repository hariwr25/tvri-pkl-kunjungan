<template>
  <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 px-4">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-indigo-700 mb-6">Login Admin</h2>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block font-medium text-gray-700 mb-1">Username</label>
          <input
            v-model="username"
            type="text"
            class="form-input"
            placeholder="Masukkan username"
            required
            autocomplete="username"
          >
        </div>

        <div>
          <label class="block font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-input"
            placeholder="Masukkan password"
            required
            autocomplete="current-password"
          >
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          :disabled="loading"
        >
          {{ loading ? 'Memproses...' : 'Masuk' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LoginAdmin',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
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
  method: 'POST',  // <== Tambahkan ini
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
.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s;
}
.form-input:focus {
  border-color: #6366f1;
}
</style>
