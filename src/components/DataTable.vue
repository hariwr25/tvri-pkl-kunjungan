<template>
    <table class="min-w-full text-sm border-collapse border border-gray-200">
      <thead class="bg-blue-600 text-white">
        <tr>
          <th v-for="field in fields" :key="field" class="py-3 px-4 text-left capitalize">
            {{ field.replace('_', ' ') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-b border-gray-200 hover:bg-blue-50">
          <td v-for="field in fields" :key="field" class="py-2 px-4 text-center">{{ item[field] }}</td>
        </tr>
        <tr v-if="items.length === 0">
          <td :colspan="fields.length" class="py-6 text-center text-gray-400 italic">
            {{ emptyText }}
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: ['items', 'fields', 'emptyText']
  }
  </script>
  