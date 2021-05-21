import React, {useState, useEffect} from 'react'
import './TestsAdmin.css'
import ListWithBtn from '../../components/list-with-button/ListWithBtn.jsx'
import {useAuthState} from '../../context'

const TestsAdmin = (props) => {
    const userDetails = useAuthState()

    const user_id = userDetails.userDetails.id

    const [pendingTests, setPendingTests] = useState([])
    const [toValidateTests, setToValidateTests] = useState([])
    

    useEffect(() => {

        const getPendingTests = async () => {
            const tests =  await fetch('http://127.0.0.1:5000/tests/pending',
            {
                headers: {
                  'Authorization': userDetails.token
                },
                method: "GET"
            }
            )
            .then((response)=>response.json())
            .then((data)=>setPendingTests(data.tests))
        }

        const getToValidateTests = async () => {
            const tests =  await fetch('http://127.0.0.1:5000/tests/to_validate/'+user_id,
            {
                headers: {
                  'Authorization': userDetails.token
                },
                method: "GET"
            }
            )
            .then((response)=>response.json())
            .then((data)=>setToValidateTests(data.tests))
            
        }

        getPendingTests()
        getToValidateTests()
    }, [props])


    return (
        <div className="tests-admin-container">
            <h2>Laboratory management</h2>
            <ListWithBtn items={pendingTests} type={"Pending"} btn={"Assign"} btnPath={""}/>
            <ListWithBtn items={toValidateTests} type={"Validate"} btn={"Validate"} btnPath={""}/>
        </div>
    )
}



export default TestsAdmin
