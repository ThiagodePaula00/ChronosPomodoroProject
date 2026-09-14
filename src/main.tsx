import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App' //importing the App from App.tsx as QualquerCoisa.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)