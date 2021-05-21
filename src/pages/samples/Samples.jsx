import React from 'react'
import SlideBar from '../../components/slide-bar/SlideBar.jsx'
import SearchList from '../../components/search-list/SearchList.jsx'
import './Samples.css'

const Samples = (props) => {
    return (
        <div className="samples-container">
            <SlideBar active={"samples"}></SlideBar>
            <h2>Organizing Samples</h2>
            <SearchList></SearchList>
        </div>
    )
}

export default Samples
