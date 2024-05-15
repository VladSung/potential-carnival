import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';
import './index.css'
import { Providers } from './components/providers.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>,
)
