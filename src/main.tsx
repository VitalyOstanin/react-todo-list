import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n' // Инициализация локализации
import App from './App.tsx'

// Точка входа в приложение
// StrictMode помогает выявлять проблемы в разработке
// Документация: https://ru.react.dev/reference/react/StrictMode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
