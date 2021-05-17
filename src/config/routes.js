import Login from '../pages/login/Login.jsx'
import Dashboard from '../pages/dashboard/Dashboard.jsx'
import PageNotFound from '../pages/not_found/NotFound.jsx'

// in this file we will define all the routes we want to have in this application.

const routes = [
    {
        path: "/login",
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