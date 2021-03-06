import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import './AddSample.css'
import {useAuthState} from '../../context'


const AddSample = (props) => {
    const {testId} = useParams()
    const [test, setTest] = useState({})
    const userDetails = useAuthState()

    const [error, setError] = useState(null)

    const [samples, setSamples] = useState([])
    const [sample, setSample] = useState({})

    const [measures_number, setMeasuresNumber] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null)


    const fileSelectedHandler = (e) => {
       setSelectedFile(e.target.files[0])
       
    }



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
        const getSamples = async () => {
            const samples =  await fetch('http://127.0.0.1:5000/samples/test/'+parseInt(testId),
            {
                headers: {
                  'Authorization': userDetails.token
                },
                method: "GET"
            }
            )
            .then((response)=>response.json())
            .then((data)=>setSamples(data.samples))
            
        }
        getTest()
        getSamples()
    }, [sample])


    
    const addSample = async () => {
            if (measures_number == 0) {
                setError("Enter a valid number of measures. Zero (0) isnt valid")
                return
            }

            if (selectedFile == null) {
                setError("You must add an image!")
                return
            }
            
            const sample =  await fetch('http://127.0.0.1:5000/create/sample',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userDetails.token
                },
                method: "POST",
                body: JSON.stringify({
                    test_id: testId,
                    operator_id: userDetails.userDetails.id,
                    measures_number: measures_number
                })
            }
            )
            .then((response)=> response.json())
            .then((data)=>{
                setSample(data.sample)
                var sampleId = data.sample.id
                addImageHandler(sampleId)
            })
            
            setSelectedFile(null)
            setMeasuresNumber(0)
            setError(null)

    }


    const addImageHandler = async (sampleId) => {
        console.log(selectedFile)
        const fd = new FormData()
        fd.append('file', selectedFile, selectedFile.name)
        console.log(fd)
        const image = await fetch('http://127.0.0.1:5000/upload/'+sampleId, 
        {
            headers: {
                'Authorization': userDetails.token
            },
            method: "POST",
            body: 
                fd
        }
        )
        .then((res)=>res.json())
        .then((data)=>console.log(data))
        return
        
    }



    const deleteSample = async (sample_id) => {

        const sample =  await fetch('http://127.0.0.1:5000/sample/'+sample_id,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': userDetails.token
            },
            method: "DELETE"
        }
        )
        
        const filteredArray = samples.filter((item)=> item.id != sample_id)
        setSamples(filteredArray)
        

    }

    




    return (
        <div className="add-sample-container">
            <h2>Samples Data</h2>
            <div className="line"></div>



            <div className="new-sample-container">

                <h3>New Sample</h3>
                <button onClick={()=>addImageHandler()} className="btn">Upload Image</button>
                <input type="file" name="file" id="file" placeholder="Add an image..." onChange={(e)=>fileSelectedHandler(e)}  />
                <input type="number" name="measures_number" id="measures_number" placeholder="Measures number..."  value={measures_number} onChange={(e)=>setMeasuresNumber(e.target.value)} />
               
                <button onClick={()=>addSample()} className="btn">Add Sample</button>

            </div>


            { error ? <p>{error}</p> : null} 


            <div className="added-samples">
                <h2>Added Samples (3 max.)</h2>
                {   samples != undefined ?
                    samples.map((item)=>
                    <div className="sample-item" key={item.id}>
                        Id: {item.id} Measures Number: {item.measures_number}
                        <button onClick={()=>deleteSample(item.id)}>Remove</button>
                    </div> 
                    ) : "No samples"
                }
            </div>

            <button className="btn" onClick={()=>props.history.push('/test/'+testId)}>OK</button>
        


            
        </div>
    )
}

export default AddSample
