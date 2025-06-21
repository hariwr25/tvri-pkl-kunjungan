<template>
  <div class="font-sans antialiased text-gray-800 bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-screen">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/* Opsional: styling global tambahan */
body {
  margin: 0;
}
</style>
