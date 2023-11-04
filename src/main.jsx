import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './Layout/Root/Routes.jsx'
import AuthProvider from './Components/AuthProvider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
  <RouterProvider router={routes}></RouterProvider>
  </AuthProvider>
  <Toaster />
  </React.StrictMode>,
)
