import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Enable CSS :active pseudo-class on iOS Safari
if (typeof document !== 'undefined') {
  document.addEventListener('touchstart', function() {}, {passive: true});
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
