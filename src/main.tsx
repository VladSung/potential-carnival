import React from 'react'
import ReactDOM from 'react-dom/client'
import { Providers } from './app/providers.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>,
)
