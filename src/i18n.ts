import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ruTranslation from './locales/ru/translation.json';
import enTranslation from './locales/en/translation.json';

// Инициализация i18next для интернационализации
// Документация: https://react.i18next.com/getting-started
i18n
  .use(LanguageDetector) // Автоматическое определение языка браузера
  .use(initReactI18next) // Интеграция с React
  .init({
    // Настройка языков по умолчанию
    fallbackLng: 'ru', // Русский язык по умолчанию
    lng: 'ru', // Начальный язык
    
    // Ресурсы переводов
    resources: {
      ru: {
        translation: ruTranslation
      },
      en: {
        translation: enTranslation
      }
    },

    // Настройки интерполяции
    interpolation: {
      escapeValue: false // React уже экранирует значения
    },

    // Настройки детектора языка
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;
