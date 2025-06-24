// frontend/src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'                    // ← ✅ penting!
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
  },
})

export default vuetify
