import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './ListWithBtn.css'


const ListWithBtn = (props) => {

    var items_list = props.items
    
    return (
        <div className="list-with-btn-container">
            {/* {props.tests} */}
            <div className="list-header">
                <h4>{props.type} Tests</h4>
                <Link className="btn" to={""}>See All</Link>
            </div>
            <hr />
            <div className="list-body">
                {
                    items_list != undefined ?
                    items_list.slice(0,5).map((item)=> 
                    <div className="test-item" key={item.test_code}>
                        {item.test_code} {item.name}
                    <Link className="btn" to={""}>{props.btn}</Link>
                    </div>
                    ) : 
                    <div className="test-item" >
                        No Tests
                    </div>

                }
            </div>
        </div>
    )
}

export default ListWithBtn
