import React from 'react'

const Login = (props) => {
    return (
        <div className="container">
            <h2>Login Form</h2>
            <p>This is the login form page</p>
            <form>
                <div>
                    <label htmlFor="username">Username </label>
                    <input type="text" id="username" />
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input type="password" id="password" />
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login
