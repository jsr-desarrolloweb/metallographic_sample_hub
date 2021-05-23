import React, {useState, useEffect} from 'react'
import './TestsOperator.css'
import ListWithBtn from '../../components/list-with-button/ListWithBtn.jsx'
import SlideBar from '../../components/slide-bar/SlideBar.jsx'
import {useAuthState} from '../../context'

const TestsOperator = (props) => {
    const userDetails = useAuthState()

    const user_id = userDetails.userDetails.id

    const [assignedTests, setAssignedTests] = useState([])
    const [inProgressTests, setInProgressTests] = useState([])
    

    useEffect(() => {

        const getAssignedTests = async () => {
            const tests =  await fetch('http://127.0.0.1:5000/tests/assigned/'+user_id,
            {
                headers: {
                  'Authorization': userDetails.token
                },
                method: "GET"
            }
            )
            .then((response)=>response.json())
            .then((data)=>setAssignedTests(data.tests))
        }

        const getInProgressTests = async () => {
            const tests =  await fetch('http://127.0.0.1:5000/tests/in_progress/'+user_id,
            {
                headers: {
                  'Authorization': userDetails.token
                },
                method: "GET"
            }
            )
            .then((response)=>response.json())
            .then((data)=>setInProgressTests(data.tests))
            
        }

        getAssignedTests()
        getInProgressTests()
    }, [props])


    return (
        <div className="tests-admin-container">
            <SlideBar active={"tests"}></SlideBar>
            <h2>Manage all your tests</h2>
            <ListWithBtn items={assignedTests} type={"Assigned"} btn={"Start"} btnPath={""}/>
            <ListWithBtn items={inProgressTests} type={"InProgress"} btn={"Access"} btnPath={""}/>
        </div>
    )
}



export default TestsOperator
