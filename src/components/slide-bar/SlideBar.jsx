import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './SlideBar.css'
import {useAuthState} from '../../context'

const SlideBar = (props) => {

    const {userDetails} = useAuthState()
    const [route, setRoute] = useState("")

    useEffect(() => {
        if (userDetails.roles == "admin") {
            setRoute("/admin")
        }
        if (userDetails.roles == "operator") {
            setRoute("/operator")
        }
    }, [route])

 
    return (
        <div className="slide-bar-container">
            <div className="pages">
                <Link to={"/tests"+route} className="page active">
                    <i className="fas fa-flask fa-2x"></i> Tests 
                </Link>
                <Link to={"/samples"} className="page">
                    <i className="fab fa-stumbleupon-circle fa-2x"></i> Samples 
                </Link>
                <Link to={"/docs"} className="page">
                    <i className="fas fa-file-alt fa-2x"></i> Docs 
                </Link>
            </div>
            <div className="line"></div>

        </div>
    )
}

export default SlideBar
