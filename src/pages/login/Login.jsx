import {React, useState} from 'react'
import {loginUser, useAuthState, useAuthDispatch} from '../../context'


const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(null)

    const dispatch = useAuthDispatch()
    const {loading, errorMessage} = useAuthState()

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!username.trim() || !password.trim()) {
            setLoginError('Fill the inputs')
            return
        }
        let payload = {username, password}
        // async request to the server
        try {
            let response = await loginUser(dispatch, payload) //loginUser action makes the request and handles all the neccessary state changes
            // console.log(response)
            if (!response.user) return
            // setUsername('')
            // setPassword('')
            // console.log(response.user) ---> comprobar role 
            props.history.push('/dashboard') //navigate to dashboard on success
        } catch (error) {
            console.log(error)
        }
        }

    return (
        <div className="container">
            <h2>Login Form</h2>
            <p>This is the login form page</p>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }
            {
                loginError ? <p>{loginError}</p> : null
            }
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
                <button onClick={handleLogin} disabled={loading}>Login</button>
            </form>
        </div>
    )
}

export default Login
