import React, {useState, useEffect} from 'react'
import './SearchList.css'
import {useAuthState} from '../../context'
import {Link} from 'react-router-dom'

const SearchList = () => {

    const userDetails = useAuthState()

    const [samples, setSamples] = useState([])

    useEffect(() => {
        const getAllSamples = async () => {
            const samples =  await fetch('http://127.0.0.1:5000/samples',
            {
                headers: {
                  'Authorization': userDetails.token
                },
                method: "GET"
            }
            )
            .then((response)=>(response.json())
            .then((data)=>setSamples(data.samples)))
        }

        getAllSamples()

    }, [])

    console.log(samples)

    return (
        <div className="search-list-container">
            <div className="list-header">
                <h4>Track Samples</h4>
                <div className="search-elements">
                <input  type="text" name="sample_id" id="sample_id" placeholder="Sample Id..." />
                <select className="btn" name="" id="">
                    <option value="all">All</option>
                    <option value="client">Client</option>
                    <option value="date">Date</option>
                    <option value="test">Test</option>
                </select>                
                </div>
            </div>
            <div className="search-data">
                <span>Order by: All</span>
                <span></span>
            </div>
            <div className="line"></div>
            <div className="search-result">
                {
                    samples != undefined ?
                    samples.map((item)=>(
                        <div className="search-item" key={item.id}>
                           Id: {item.id} || Measures: {item.measures_number} || Date: {item.date}
                            <Link className="btn" to={""}>Details</Link>
                        </div>
                    ))
                    : 
                    <div className="search-item">
                            No Samples
                        </div>
                }
            </div>
        </div>
    )
}

export default SearchList
