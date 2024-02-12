import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {Chart as ChartJS} from 'chart.js/auto'
import {Bar,Doughnut,Line} from 'react-chartjs-2'
import sourceData from './sourceData.json'
import internalData from './internaldata.json'


const EmployeeDetail = () => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail/'+id)
        .then(result => {
            setEmployee(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])
    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
        .then(result => {
          if(result.data.Status) {
            localStorage.removeItem("valid")
            navigate('/')
          }
        }).catch(err => console.log(err))
      }
  return (
    
    <div>
        <div className="p-2 d-flex justify-content-center shadow" style={{backgroundColor: "#5457B0"}}>
            <h4 style={{color: "white"}}>D.O.S.T</h4>
        </div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <img src={`http://localhost:3000/Images/`+employee.image} className='emp_det_image' style={{backgroundColor: "grey"}}/>
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Name: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Branch: CSE</h3>
            </div>
            <div class="w-50 h-50">
            <div class="row">
                        <div class="col-lg-6 mb-4">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Attendance</h6>
                                </div>
                                <div class="card-body">
                                    <Doughnut
                                        data={{
                                            labels: sourceData.map((data) => data.label),
                                            datasets:[
                                                {
                                                    label:"Count",
                                                    data: sourceData.map((data) => data.value),
                                                    backgroundColor:[
                                                       "rgba(43,63,229,0.8)",
                                                       "rgba(250,192,19,0.8)"
                                                    ],
                                                    borderColor:[
                                                        "rgba(43,63,229,0.8)",
                                                       "rgba(250,192,19,0.8)"
                                                    ]
                                                }
                                            ]
                                        }}

                                    />
                                </div>
                            </div>
                        </div>
            
            

                        <div class="col-lg-6 mb-4">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Internal Marks</h6>
                                </div>
                                <div class="card-body">
                                    <Bar
                                        data={{
                                            labels: internalData.map((data) => data.label),
                                            datasets:[
                                                {
                                                    label:"Marks",
                                                    data: internalData.map((data) => data.value),
                                                    backgroundColor:[
                                                       "rgba(43,63,229,0.8)",
                                                       "rgba(250,192,19,0.8)"
                                                    ],
                                                    borderRadius: 5,
                                                }
                                            ]
                                        }}

                                    />
                                </div>
                            </div>
                        </div>
            </div>
            </div>

            <div>
                <button className='btn btn-primary me-2'>Edit</button>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
  )
}




export default EmployeeDetail