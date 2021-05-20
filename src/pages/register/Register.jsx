import React, {useState} from 'react'
import './Register.css'

const Register = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [registerError, setRegisterError] = useState(null)

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!username.trim()
            || !password.trim()
            || !role.trim()){
            setRegisterError('Fill the inputs')
            return
        }
        const register = await fetch('http://127.0.0.1:5000/auth/register',
        {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                username,
                password,
                roles: role
            })
        }
        )
        .then((response)=>response.json())
        .then((data)=>setRegisterError(data.message))

        return register
    }


    return (
        <div className="register-container">
            <h4>Join Pill Hub</h4>

            <form className="register-form">
                <div className="input-group">
                    <label htmlFor="username"></label>
                    <input 
                        type="text" 
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                         />
                </div>
                <div className="input-group">
                    <label htmlFor="password"></label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                         />
                </div>
                <div className="input-group">
                    <label htmlFor="cars"></label>
                    <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="select-roles"
                    name="roles"
                    id="roles"
                    >
                        <option value="" disabled defaultValue value="Role">Role</option>
                        <option value="admin">Admin</option>
                        <option value="operator">Operator</option>
                    </select> 
                </div>
                <button className="btn" 
                onClick={handleRegister} 
                
                >Sign up for Pill Hub</button>
            </form>
            <a className="forgotten-password" href="#">Have you falready got an account?</a>
            {
                registerError ? <span className="error-msg">{registerError}</span> : null
            }
        </div>
    )
}

export default Register
