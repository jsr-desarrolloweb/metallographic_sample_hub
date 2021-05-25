import Login from '../pages/login/Login.jsx'
import Dashboard from '../pages/dashboard/Dashboard.jsx'
import Register from '../pages/register/Register.jsx'
import TestsAdmin from '../pages/tests-admin/TestsAdmin.jsx'
import TestsOperator from '../pages/tests-operator/TestsOperator.jsx'
import AssignTest from '../pages/assign-test/AssignTest.jsx'
import TestValidation from '../pages/test-validation/TestValidation.jsx'
import Test from '../pages/test/Test.jsx'
import Samples from '../pages/samples/Samples.jsx'
import Docs from '../pages/docs/Docs.jsx'
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
    ,
    {
        path: "/assign/test/:testId",
        component: AssignTest,
        isPrivate: true
    },
    {
        path: "/tests/operator",
        component: TestsOperator,
        isPrivate: true
    },
    ,
    {
        path: "/test/validation/:testId",
        component: TestValidation,
        isPrivate: true
    },
    {
        path: "/test/:testId",
        component: Test,
        isPrivate: true
    }
    ,
    {
        path: "/samples",
        component: Samples,
        isPrivate: true
    },
    {
        path: "/docs",
        component: Docs,
        isPrivate: true
    },
    {
        path: "/*",
        component: PageNotFound,
        isPrivate: true
    }
]

export default routes