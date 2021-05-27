import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import './SampleDetail.css'
import {useAuthState} from '../../context'


const SampleDetail = () => {

    const base_url = 'http://127.0.0.1:5000/image/'

    const userDetails = useAuthState()
    const {sampleId} = useParams()
    const [sample, setSample] = useState({})
    const [operator, setOperator] = useState({})

    const [imageName, setImageName] = useState("")

    useEffect(() => {
        const getSample = async (sampleId) => {

            const sample =  await fetch('http://127.0.0.1:5000/sample/'+sampleId,
            {
                headers: {
                    'Authorization': userDetails.token
                },
                method: "GET"
            }
            )
            .then((res)=>res.json())
            .then((data)=>{
                setSample(data.sample)
                var operatorId = data.sample.operator_id
                getOperator(operatorId)

                var imageName = data.sample.image.split("\\")[1]

                setImageName(imageName)
                //getImage(imageName)
            }) 
        }
        getSample(sampleId)
        

        }, [])

        const getOperator = async (operatorId) => {

            const sample =  await fetch('http://127.0.0.1:5000/user/'+operatorId,
            {
                headers: {
                    'Authorization': userDetails.token
                },
                method: "GET"
            }
            )
            .then((res)=>res.json())
            .then((data)=>setOperator(data.user) ) 
            return
        }


        const getImage = async (imageName) => {

            const sample =  await fetch('http://127.0.0.1:5000/image/'+imageName,
            {
                headers: {
                    'Authorization': userDetails.token,
                    'Content-Type': 'application/json'
                },
                method: "GET"
            }
            )
            .then((res)=>res)
            .then((data)=>console.log(data) ) 
            return
        }

 


    return (
        <div className="sample-detail-container">
            <h2>Sample Detail</h2>
            <div className="line"></div>
            <div className="details">
                <p> <strong>Sample ID</strong>: {sample.id}</p>
                <p> <strong>Operator</strong>: {operator.username}</p>
                <p> <strong>Masures Number</strong>: {sample.measures_number}</p>
                <p> <strong>Date</strong>: 10th March, 2021</p>
            </div>
            <h3>Sample Image</h3>
            { imageName != "" ? <img src={base_url+imageName} alt="" width={250} /> :null }
            
        </div>
    )
}

export default SampleDetail
