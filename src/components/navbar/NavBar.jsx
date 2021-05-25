import React, {useState, useEffect} from 'react'
import './NavBar.css'
import {Link, useHistory} from 'react-router-dom'

const NavBar = () => {
    const history = useHistory()

    
    useEffect(() => {
        return history.listen((location) => { 
            console.log(`You changed the page to: ${location.pathname}`)
            
         })
    }, [history])


    return (
        <div className="navbar">
            <Link to="/login" className="logo fas fa-fire fa-2x"></Link>
            <Link to="/register"  className="btn btn-navbar">Sing Up</Link>

        </div>
    )
}

export default NavBar
