/* eslint-disable */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import english from '../localization/en.json'
import dutch from '../localization/nl.json'
import japanese from '../localization/ja.json'
import { Languages } from './constants'

export const resources = {
  [Languages.en]: {
    translation: {
      ...english,
    }
  },
  [Languages.ja]: {
    translation: {
      ...japanese,
    }
  },
  [Languages.nl]: {
    translation: {
      ...dutch
    }
  }
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
