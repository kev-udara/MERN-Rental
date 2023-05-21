import React from 'react'
import AdminDefaultLayout from '../components/AdminDefaultLayout'
import { Row, Col, Form, Input } from "antd";
import { addAccessory } from '../redux/actions/accessoriesActions';
import { useDispatch,useSelector } from 'react-redux';
import Spinner from '../components/Spinner';

function AddAccessory() {

const dispatch = useDispatch()
const {loading} = useSelector(state=>state.alertsReducer)

function onFinish(values) {

    values.bookedTimeSlots=[]
    dispatch(addAccessory(values))
    console.log(values)
}

  return (
    <AdminDefaultLayout>
    {loading && (<Spinner/>)}
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <Row justify='center' >
      <Col lg={14} sm={24}>
        <Form className='addaccessoryform p-4' layout='vertical' onFinish={onFinish} style={{backgroundColor:'rgb(254, 175, 56)'}}>
        <h3>Add New Accessory</h3>
        <hr />
            <Form.Item name='name' label='Accessory Name' rules={[{required:true}]}>
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <Form.Item name='image' label='Image URL' rules={[{required:true}]}>
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <Form.Item name='description' label='Description' rules={[{required:true}]} >
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <Form.Item name='rentPerHour' label='Rent Per Hour' rules={[{required:true}]}>
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <div>
            <button className='btn1' style={{width:'150px'}}>ADD ACCESSORY</button>
            </div>
        </Form>
      </Col>
    </Row>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    </AdminDefaultLayout>
    
  )
}

export default AddAccessory