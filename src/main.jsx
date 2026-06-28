import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../src/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminProvider } from './context/AdminContext.jsx'
import { ClientesProvider } from './context/ClienteContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <ClientesProvider>
          <App />
        </ClientesProvider>
      </AdminProvider>
    </BrowserRouter>
  </StrictMode>
)