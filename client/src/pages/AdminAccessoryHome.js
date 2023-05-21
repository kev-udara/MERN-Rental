import React, { useState, useEffect } from 'react'
import AdminDefaultLayout from '../components/AdminDefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import {getAllAccessories,deleteAccessory} from '../redux/actions/accessoriesActions'
import {Row,Col,Divider,DatePicker, Checkbox, Edit } from 'antd';
import Spinner from '../components/Spinner';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { DeleteOutlined , EditOutlined,CarOutlined  } from '@ant-design/icons';
import {Popconfirm, message} from 'antd';
import { FaBookmark, FaCar, FaEdit, FaPlus, FaRemoveFormat, FaTools, FaTrash } from "react-icons/fa";
import { FaFunnelDollar, FaGasPump, FaPumpMedical, FaSearch } from 'react-icons/fa';
import {BsSpeedometer} from 'react-icons/bs'

const {RangePicker} = DatePicker

function AdminAccessoryHome(){
    const {accessories} = useSelector(state=>state.accessoriesReducer)
    const {loading}= useSelector(state=>state.alertsReducer)
    const [totalAccessories , setTotalaccessories] =useState([])
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getAllAccessories())
    },[])

    useEffect(() => {
        setTotalaccessories(accessories)

    }, [accessories])

    

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
                    width:'150px',
                    outline:'none',
                    border:'none'
                    }}>
            <a href='/addaccessory' style={{color:'black'}}>Add Accessory <FaTools style={{marginBottom:'2px',marginLeft:'3px'}}/>
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
                    width:'200px',
                    outline:'none',
                    border:'none'
                    }}>
            <a href='/adminaccessorybookings' style={{color:'black'}}>View Accessory Bookings <FaBookmark style={{marginBottom:'2px',marginLeft:'3px',width:'9px'}}/>
            <FaPlus style={{marginBottom:'2px',width:'6px',marginLeft:'1px'}}/>
            </a>
            </button>
            </div>
            </Col>
          </Row>


           {loading == true && (<Spinner/>)}

            <Row justify='center' gutter={16}>
                {totalAccessories.map(accessory=>{
                    return <Col lg={5} sm={24} xs={24}>
                     <div className="accessory p-2 bs1">
                     <img src={accessory.image} className="accessoryimg" alt=''/>
                     
                     <div className="accessory-content flex align-items-center justify-content-between">
                     <div>
                            <p><b>{accessory.name}</b></p>
                            
                            <Row justify='center'>
                            <Col lg={23} sm={24}>
                            <p style={{fontSize:'small',alignItems:'baseline'}}>{accessory.description}</p>
                            </Col>
                            </Row>
                            <p>Rent Per Hour : Rs. {accessory.rentPerHour}/-</p>
                          </div>
                     
                     <div className='mr-2'>
                     <Link to={`/editaccessory/${accessory._id}`}><FaEdit className='mr-3' style={{color:'rgb(48, 163, 7)',cursor:'pointer'}} /></Link>
                     <Popconfirm
                        title="Are you sure you want to delete this accessory ?"
                        onConfirm={()=>{dispatch(deleteAccessory({accessoryid: accessory._id}))}}
                        
                        okText="Yes"
                        cancelText="No"
                    >
                        <FaTrash style={{color:'rgb(242, 5, 5)',cursor:'pointer'}}/>
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

export default AdminAccessoryHome