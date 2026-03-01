import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Dòng này cực kỳ quan trọng để ăn màu Tailwind
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)