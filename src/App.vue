<template>
  <v-app>
    <v-main>
      <div class="font-sans antialiased text-gray-800 bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-screen">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body {
  margin: 0;
}
</style>
