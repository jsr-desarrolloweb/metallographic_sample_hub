import Login from '../pages/login/Login.jsx'
import Dashboard from '../pages/dashboard/Dashboard.jsx'
import Register from '../pages/register/Register.jsx'
import TestsAdmin from '../pages/tests-admin/TestsAdmin.jsx'
import PageNotFound from '../pages/not_found/NotFound.jsx'

// in this file we will define all the routes we want to have in this application.

const routes = [
    {
        path: "/login",
        component: Login,
        isPrivate: false
    },
    {
        path: "/dashboard",
        component: Dashboard,
        isPrivate: true
    },
    {
        path: "/register",
        component: Register,
        isPrivate: false
    },
    ,
    {
        path: "/tests/admin",
        component: TestsAdmin,
        isPrivate: true
    },
    {
        path: "/*",
        component: PageNotFound,
        isPrivate: true
    }
]

export default routes