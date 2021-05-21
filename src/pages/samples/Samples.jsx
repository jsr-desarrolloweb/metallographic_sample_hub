import React from 'react'
import SlideBar from '../../components/slide-bar/SlideBar.jsx'
import './Samples.css'

const Samples = (props) => {
    return (
        <div className="samples-container">
            <SlideBar active={"samples"}></SlideBar>
            <h2>Organizing Samples</h2>
        </div>
    )
}

export default Samples
