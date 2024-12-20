import React, {useEffect, useState} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ProjectStart from "@/components/process/ProjectStart.tsx";
import Layout from './components/common/Layout'

import {AnonymousRoute, AuthChangeRedirector} from './auth'

function createRouter() {
    const allRoutes = [
        {
            path: '/',
            element: <AuthChangeRedirector><Layout/></AuthChangeRedirector>,
            children: [
                {
                    path: '/',
                    element: <ProjectStart/>
                }, {
                    path: '/projects/:id',
                    element: <AnonymousRoute><ProjectStart/></AnonymousRoute>
                }
            ]
        }
    ]

    return createBrowserRouter(allRoutes)
}

    export default function Router() {
        // If we create the router globally, the loaders of the routes already trigger
        // even before the <AuthContext/> trigger the initial loading of the auth.
        // state.
        const [router, setRouter] = useState(null)
        useEffect(() => {
            // @ts-ignore
            return setRouter(createRouter())
        }, [])
        return router ? <RouterProvider router={router}/> : null
    }
