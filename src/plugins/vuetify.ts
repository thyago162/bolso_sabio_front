import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiAccount } from '@mdi/js'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      account: mdiAccount,
    },
    sets: {
      mdi,
    },
  },
})