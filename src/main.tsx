import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { light } from '@/utils/theme'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={light}>
      <CssBaseline/>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
