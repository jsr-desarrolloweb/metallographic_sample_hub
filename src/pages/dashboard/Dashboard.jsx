import React from 'react'
import {useAuthDispatch, useAuthState, logout} from '../../context'

const Dashboard = (props) => {
    const dispatch = useAuthDispatch()
    const userDetails = useAuthState()

    const handleLogout = () => {
        logout(dispatch) //call the logout action
        props.history.push('/login') //navigate to logout page on logout
    }

    return (
        <div className="container">
            <h2>Dashboard</h2>
            <h3>Welcome {userDetails.username}</h3>
            <p>This is the dashbaord page</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard
