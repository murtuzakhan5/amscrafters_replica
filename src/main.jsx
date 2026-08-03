import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PopupProvider } from './PopupContext.jsx'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PopupProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PopupProvider>
  </StrictMode>,
)
