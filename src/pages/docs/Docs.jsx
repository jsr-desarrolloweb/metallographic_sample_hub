import React from 'react'
import './Docs.css'
import {Link} from 'react-router-dom'
import SlideBar from '../../components/slide-bar/SlideBar.jsx' 

const Docs = () => {

    

    return (
        <div className="docs-container">
             <SlideBar active={"docs"}></SlideBar>
             
             <h2>Check the current normative</h2>
             <p>Consult the current regulations for the correct performance of the essays</p>
             <div className="search-normative">
                 <input type="text" id="test_name" name="test_name" placeholder="Test name..."/>
                 <button className="btn"><i className="fas fa-search"></i></button>
                 <Link className="btn btn-docs" to={"/docs"}>See All</Link>
             </div>
             <div className="files">
                 <div className="file">
                     Grain Limit
                 </div>
                 <div className="file">
                     Border Radius
                 </div>
                 <div className="file">
                     Porosity
                 </div>
                 <div className="file">
                     Methane Oxide
                 </div>
                 
             </div>
             
             
        </div>
    )
}

export default Docs
