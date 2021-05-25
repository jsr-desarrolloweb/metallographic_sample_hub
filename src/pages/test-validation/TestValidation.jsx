import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import './TestValidation.css'
import {useAuthState} from '../../context'

const TestValidation = (props) => {

    const {testId} = useParams()
    const [test, setTest] = useState({})
    const userDetails = useAuthState()

    const [report, setReport] = useState({})


    useEffect(() => {
        const getTest = async () => {
            const test =  await fetch('http://127.0.0.1:5000/test/'+parseInt(testId),
            {
                headers: {
                  'Authorization': userDetails.token
                },
                method: "GET"
            }
            )
            .then((response)=>response.json())
            .then((data)=>setTest(data.test))
        }

        getTest()

        const getReport = async () => {
            const report =  await fetch('http://127.0.0.1:5000/report/'+parseInt(testId),
            {
                headers: {
                  'Authorization': userDetails.token
                },
                method: "GET"
            }
            )
            .then((response)=>response.json())
            .then((data)=>setReport(data.report))
        }

        getReport()

    
    }, [props])

    const validateTest = async () => {
        const validation = await fetch('http://127.0.0.1:5000/validate/test',
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                test_id: parseInt(testId),
                admin_id: userDetails.userDetails.id,
            }) 
        })
        .then((response)=>response.json())
        .then((data)=>setTest(data.test))

        props.history.push('/tests/admin')
    }



    return (
        <div className="test-validation-container">
                <h4>Test Validation</h4>
                <div className="line"></div>
                <div className="test-container">
                Name: {test.name} <br />
                Client: {test.client}<br />
                Code: {test.test_code} <br />
                Target Date March 10th, 2021
            </div>

            <h2>Test Results</h2>
            <div className="line"></div>
            <div className="test-results">
                <strong>Conformance:</strong> {!report.result ? "No Conformance" : "Yes"}
                <strong>Comments:</strong> {report.comment ? report.comment : "None"}
            </div>
            <button onClick={()=>validateTest()} className="btn">Validate</button>
        </div>
    )
}

export default TestValidation
