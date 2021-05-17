import React from 'react'
import Login from '../pages/Login'
import Dashborad from '../pages/Dashborad'
import PageNotFound from '../pages/PageNotFound'

// in this file we will define all the routes we want to have in this application.

const routes = [
    {
        path: "/",
        component: Login
    },
    {
        path: "/dashboard",
        component: Dashboard
    },
    {
        path: "/*",
        component: PageNotFound
    }
]

export default routes