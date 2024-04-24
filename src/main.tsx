import React from 'react'
import ReactDOM from 'react-dom/client'
import Startpage from './components/Startpage'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Detail from './components/Details'
import PageNotFound from './components/PageNotFound'

const router = createBrowserRouter([
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
