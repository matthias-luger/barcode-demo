import React from 'react'
import ReactDOM from 'react-dom/client'
import Startpage from './components/Startpage'
import './index.css'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Detail from './components/Details'
import PageNotFound from './components/PageNotFound'

export const API_PORT = import.meta.env.DEV ? '3000' : null

const router = createHashRouter([
    {
        path: '/',
        element: <Startpage />
    },
    {
        path: '/details/:id',
        element: <Detail />
    },
    {
        path: '*',
        element: <PageNotFound />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
