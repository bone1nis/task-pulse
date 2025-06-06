import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faBars,
  faSun,
  faUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faSun, faUser, faRightFromBracket)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})