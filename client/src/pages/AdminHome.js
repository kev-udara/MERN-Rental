import React, { useState, useEffect } from 'react'
import AdminDefaultLayout from '../components/AdminDefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import {getAllCars,deleteCar} from '../redux/actions/carsActions'
import {Row,Col,Divider,DatePicker, Checkbox, Edit } from 'antd';
import Spinner from '../components/Spinner';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { DeleteOutlined , EditOutlined,CarOutlined  } from '@ant-design/icons';
import {Popconfirm, message} from 'antd';
import { FaBookmark, FaCar, FaEdit, FaMoneyBill, FaPlus, FaRemoveFormat, FaTrash } from "react-icons/fa";
import { FaFunnelDollar, FaGasPump, FaPumpMedical, FaSearch } from 'react-icons/fa';
import {BsSpeedometer} from 'react-icons/bs'

const {RangePicker} = DatePicker

function AdminHome(){
    const {cars} = useSelector(state=>state.carsReducer)
    const {loading}= useSelector(state=>state.alertsReducer)
    const [totalCars , setTotalcars] =useState([])
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getAllCars())
    },[])

    useEffect(() => {
        setTotalcars(cars)

    }, [cars])

    

    return (
        <AdminDefaultLayout>
        <br/>
          <Row justify='center' gutter={16}>
            <Col lg={20} sm={24}>
            <div className='text-center' >
            <button 
            style={{marginTop:'22px',
                    marginLeft:'29px',
                    backgroundColor: 'rgb(254, 175, 56)',
                    borderRadius: '15px',
                    boxShadow: 'none',
                    padding:'5px',
                    width:'120px',
                    outline:'none',
                    border:'none'
                    }}>
            <a href='/addcar' style={{color:'black'}}>Add Car <FaCar style={{marginBottom:'2px',marginLeft:'3px'}}/>
            <FaPlus style={{marginBottom:'2px',width:'6px',marginLeft:'1px'}}/>
            </a>
            </button>
            <button 
            style={{marginTop:'22px',
                    marginLeft:'22px',
                    backgroundColor: 'rgb(254, 175, 56)',
                    borderRadius: '15px',
                    boxShadow: 'none',
                    padding:'5px',
                    width:'160px',
                    outline:'none',
                    border:'none'
                    }}>
            <a href='/adminbookings' style={{color:'black'}}>View Car Bookings <FaBookmark style={{marginBottom:'2px',marginLeft:'3px',width:'9px'}}/>
            <FaPlus style={{marginBottom:'2px',width:'6px',marginLeft:'1px'}}/>
            </a>
            </button>
            <button 
            style={{marginTop:'22px',
                    marginLeft:'22px',
                    backgroundColor: 'rgb(254, 175, 56)',
                    borderRadius: '15px',
                    boxShadow: 'none',
                    padding:'5px',
                    width:'160px',
                    outline:'none',
                    border:'none'
                    }}>
            <a href='/providecoupon' style={{color:'black'}}>Provide Coupon <FaMoneyBill style={{marginBottom:'2px',marginLeft:'3px',width:'14px'}}/>
            <FaPlus style={{marginBottom:'2px',width:'6px',marginLeft:'1px'}}/>
            </a>
            </button>
            </div>
            </Col>
          </Row>


           {loading == true && (<Spinner/>)}

            <Row justify='center' gutter={16}>
                {totalCars.map(car=>{
                    return <Col lg={5} sm={24} xs={24}>
                     <div className="car p-2 bs1">
                     <img src={car.image} className="carimg" alt=''/>
                     
                     <div className="car-content flex align-items-center justify-content-between">
                     <div>
                            <p><b>{car.name}</b></p>
                            
                            <Row justify='center'>
                            <Col lg={8} sm={24}>
                            <p className='speedometer'><BsSpeedometer/> {car.mileage} kmpl</p>
                            </Col>
                            <Col lg={6}>
                            <p><FaGasPump/> {car.fuelType}</p>
                            </Col>
                            </Row>
                            <p>Rent Per Hour : Rs. {car.rentPerHour}/-</p>
                          </div>
                     
                     <div className='mr-2'>
                     <Link to={`/editcar/${car._id}`} style={{color:' rgb(0, 135, 0) ',cursor:'pointer'}}>Edit Details <FaEdit className='mr-3' style={{color:' rgb(0, 135, 0) ',cursor:'pointer',marginBottom:'2px'}} /></Link>
                     <Popconfirm
                        title="Are you sure you want to delete this car ?"
                        onConfirm={()=>{dispatch(deleteCar({carid: car._id}))}}
                        
                        okText="Yes"
                        cancelText="No"
                    ><Link style={{color:'rgb(242, 5, 5)'}}>Remove Car</Link>
                        <FaTrash style={{color:'rgb(242, 5, 5)',cursor:'pointer',marginLeft:'3px',marginBottom:'2px'}}/>
                    </Popconfirm>
                     
                        
                     </div>
                     </div>
                     </div>
                    </Col>
                })}
            </Row>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </AdminDefaultLayout>
    )
}

export default AdminHome