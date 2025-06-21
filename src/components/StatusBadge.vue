<template>
    <span
      class="inline-block px-3 py-1 rounded-full text-sm font-semibold tracking-wide select-none"
      :class="statusClass"
    >
      {{ statusLabel }}
    </span>
  </template>
  
  <script>
  export default {
    name: 'StatusBadge',
    props: {
      status: {
        type: String,
        required: true,
      },
    },
    computed: {
      statusClass() {
        switch (this.status.toLowerCase()) {
          case 'approved':
            return 'bg-green-500 bg-opacity-20 text-green-300 border border-green-500'
          case 'pending':
            return 'bg-yellow-500 bg-opacity-20 text-yellow-300 border border-yellow-500'
          case 'rejected':
            return 'bg-red-500 bg-opacity-20 text-red-300 border border-red-500'
          default:
            return 'bg-gray-500 bg-opacity-20 text-gray-300 border border-gray-500'
        }
      },
      statusLabel() {
        return this.status.charAt(0).toUpperCase() + this.status.slice(1)
      },
    },
  }
  </script>
  