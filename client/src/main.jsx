import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Loading from './components/Loading'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Loading>
      <App />
      <Toaster />
    </Loading>
  </BrowserRouter>,
)
