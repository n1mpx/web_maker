import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BasketProvider } from './components/BasketContext.tsx' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BasketProvider>
      <App />
    </BasketProvider>
  </StrictMode>
)
