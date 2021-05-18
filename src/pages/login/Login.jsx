import {React, useState} from 'react'
import {loginUser, useAuthState, useAuthDispatch} from '../../context'


const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAuthDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        let payload = {username, password}
        // async request to the server
        try {
            let response = await loginUser(dispatch, payload) //loginUser action makes the request and handles all the neccessary state changes
            if (!response.user) return
            props.history.push('/dashboard') //navigate to dashboard on success
        } catch (error) {
            console.log(error)
        }
        }

    return (
        <div className="container">
            <h2>Login Form</h2>
            <p>This is the login form page</p>
            <form>
                <div>
                    <label htmlFor="username">Username </label>
                    <input 
                        type="text" 
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login
