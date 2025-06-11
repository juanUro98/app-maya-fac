import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { enrutador } from './router/enrutador'




createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={createBrowserRouter(enrutador)} />
  </StrictMode>,
)
