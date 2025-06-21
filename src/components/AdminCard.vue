<template>
  <div class="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
    <div class="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
      <slot name="icon"></slot>
    </div>
    <div>
      <p class="text-sm font-medium text-gray-500 uppercase">
        <slot name="title"></slot>
      </p>
      <p class="text-3xl font-semibold">
        <slot name="value"></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminCard'
}
</script>
