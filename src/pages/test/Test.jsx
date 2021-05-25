import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import './Test.css'
import {useAuthState} from '../../context'

const Test = (props) => {

    const {testId} = useParams()
    const [test, setTest] = useState({})
    const userDetails = useAuthState()

    const [result, setResult] = useState("")
    const [resultBoolean, setResultBoolean] = useState(false)
    const [comment, setComment] = useState("")


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

        
    }, [props])

    const startTest = async () => {
    const test = await fetch('http://127.0.0.1:5000/start/test',
    {
        headers: {
        'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            test_id: parseInt(testId),
            operator_id: userDetails.userDetails.id,
        }) 
    })
    .then((response)=>response.json())
    .then((data)=>setTest(data.test))
}



    async function sendReport(testId, operatorId, result_string){
        if (result_string == "true") {
            console.log("result true")
            setResultBoolean(true)
        }
        if (result_string == "false") {
            console.log("result false")
            setResultBoolean(false)

        }else{
            console.log("result null")
        }
        const report = await fetch('http://127.0.0.1:5000/add/report',
        {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                test_id:testId,
                operator_id:operatorId,
                result:resultBoolean
            })
        }
        )
        .then((response)=>response.json())
        console.log(resultBoolean)
        props.history.push('/tests/operator')
    }


    return (
        <div className="start-test-container">

            <h4>Proceed the Test</h4>
            <div className="line"></div>
            <div className="test-container">
                Name: {test.name} <br />
                Client: {test.client}<br />
                Code: {test.test_code} <br />
                Target Date March 10th, 2021
            </div>
            { test.is_started ? null : <button onClick={()=>startTest()} className="btn">Calculate Parameters</button>}
            
            <h2>Specifications</h2>
            <div className="line"></div>
            <div className="specifications">

                <Link to={""} className="btn btn-report">Add Sample Info</Link>
                <h3>Parameters</h3>
                <div className="parameters">
                    <p>Sample Type: Epoxy</p>
                    <p>Samples number: 3</p>
                </div>

                <h3>Results</h3>
                <div className="results">
                    
                    <form action="">
                    <select name="result" id="result" value={result} onChange={(e)=>setResult(e.target.value)}>
                        <option selected disabled value="result">Result</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <br />
                
                    <label htmlFor="comment"></label>
                    <input type="text" id="comment" placeholder="Comment..." value={comment} onChange={(e)=>setComment(e.target.value)} />
                    </form>  
                    
                   
                </div>
                
            </div>
            <button onClick={()=>sendReport(test.id, userDetails.userDetails.id, result)} className="btn btn-report">Send Report</button>
        </div>
    )
}

export default Test
