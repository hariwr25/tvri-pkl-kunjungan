<template>
    <div
      class="flex items-center gap-6 p-6 rounded-xl bg-gray-800 text-white shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 cursor-default select-none"
    >
      <div
        class="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white"
        aria-hidden="true"
      >
        <component :is="iconComponent" class="w-8 h-8" />
      </div>
      <div>
        <p
          class="text-xs font-semibold tracking-widest text-indigo-300 uppercase mb-1 select-text"
        >
          {{ title }}
        </p>
        <p
          class="text-3xl font-extrabold"
          :class="{ capitalize: capitalize }"
        >
          {{ value }}
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, h } from 'vue'
  
  const IconClipboardList = {
    name: 'IconClipboardList',
    render() {
      return h(
        'svg',
        {
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          viewBox: '0 0 24 24',
          xmlns: 'http://www.w3.org/2000/svg',
          'aria-hidden': 'true',
          class: 'w-8 h-8',
        },
        [
          h('path', {
            d: 'M9 5h6M9 12h6m-6 7h6M5 7h.01M5 19h.01M5 12h.01',
          }),
        ]
      )
    },
  }
  
  const IconUsers = {
    name: 'IconUsers',
    render() {
      return h(
        'svg',
        {
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          viewBox: '0 0 24 24',
          xmlns: 'http://www.w3.org/2000/svg',
          'aria-hidden': 'true',
          class: 'w-8 h-8',
        },
        [
          h('path', {
            d: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z',
          }),
        ]
      )
    },
  }
  
  const IconUserShield = {
    name: 'IconUserShield',
    render() {
      return h(
        'svg',
        {
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          viewBox: '0 0 24 24',
          xmlns: 'http://www.w3.org/2000/svg',
          'aria-hidden': 'true',
          class: 'w-8 h-8',
        },
        [
          h('path', {
            d: 'M12 12v1m0 4v.01M8.21 14.29a1.5 1.5 0 102.58 0M15.79 14.29a1.5 1.5 0 102.58 0M12 12v-2m-4 2v-2m8 2v-2',
          }),
        ]
      )
    },
  }
  
  export default defineComponent({
    name: 'CardDashboard',
    props: {
      title: { type: String, required: true },
      value: { type: [String, Number], required: true },
      icon: {
        type: String,
        default: 'clipboard-list',
        validator: (v) => ['clipboard-list', 'users', 'user-shield'].includes(v),
      },
      capitalize: { type: Boolean, default: false },
    },
    computed: {
      iconComponent() {
        switch (this.icon) {
          case 'users':
            return IconUsers
          case 'user-shield':
            return IconUserShield
          default:
            return IconClipboardList
        }
      },
    },
  })
  </script>
  
  <style scoped>
  svg {
    width: 2rem;
    height: 2rem;
    stroke-width: 2.5;
  }
  </style>
  