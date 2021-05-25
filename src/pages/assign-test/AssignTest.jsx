import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import './AssignTest.css'
import {useAuthState} from '../../context'

const AssignTest = (props) => {

    const {testId} = useParams()

    const userDetails = useAuthState()

    const [test, setTest] = useState({})
    const [operators, setOperators] = useState([])

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

        const getOperators = async () => {
            const test =  await fetch('http://127.0.0.1:5000/operators',
            {
                headers: {
                  'Authorization': userDetails.token
                },
                method: "GET"
            }
            )
            .then((response)=>response.json())
            .then((data)=>setOperators(data.operators))
        }

        getTest()
        getOperators()
    }, [props])



    async function assignTest(test_code, admin_id, operator_id){
        const assign = await fetch('http://127.0.0.1:5000/assign/test',
        {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                test_code,
                admin_id,
                operator_id
            })
        }
        )
        .then((response)=>response.json())
        props.history.push('/tests/admin')
    }

    
    return (
        <div className="assign-test-container">
            <h4>Assign the test</h4>
            <div className="line"></div>
            <div className="test-container">
                Name: {test.name} <br />
                Client: {test.client}<br />
                Code: {test.test_code} <br />
                Target Date March 10th, 2021
            </div>
            <div className="available-operators">
            <h2>Available Operators</h2>
            <div className="line"></div>
            {
                operators != undefined ?
                operators.map((operator)=>
                <div className="operator-item" key={operator.id}>
                {operator.username}
                <button className="btn" onClick={()=>assignTest(test.test_code, userDetails.userDetails.id, operator.id)}>Assign</button>
                </div>)
                :null
            }
            </div>

        </div>
    )
}

export default AssignTest
