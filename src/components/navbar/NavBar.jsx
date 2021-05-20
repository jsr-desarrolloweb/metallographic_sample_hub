import React from 'react'
import './NavBar.css'
import {Link} from 'react-router-dom'

const NavBar = () => {
      
    return (
        <div className="navbar">
            <Link to="/login" className="logo fas fa-fire fa-2x"></Link>
            <Link to="/register"  className="btn btn-navbar">Sing Up</Link>

        </div>
    )
}

export default NavBar
