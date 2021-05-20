import {React, useState} from 'react'
import {loginUser, useAuthState, useAuthDispatch} from '../../context'
import './Login.css'


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
            // console.log(response.user) ---> comprobar role 
            props.history.push('/dashboard') //navigate to dashboard on success
        } catch (error) {
            console.log(error)
        }
        }

    return (
        <div className="login-container">
            <h2>Managing laboratory processes efficiently</h2>
            <p>Pill Hub will organize, manage and help you to never lose track of a sample and will do your job more efficient</p>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }
            {
                loginError ? <p>{loginError}</p> : null
            }
            <form className="login-form">
                <div className="input-group">
                    <label htmlFor="username"></label>
                    <input 
                        type="text" 
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="password"></label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn" onClick={handleLogin} disabled={loading}>Sign in for Pill Hub</button>
            </form>
            <a className="forgotten-password" href="#">Have you forgotten your password?</a>
        </div>
    )
}

export default Login
