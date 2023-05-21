import React from 'react'
import AdminDefaultLayout from '../components/AdminDefaultLayout'
import { Row, Col, Form, Input } from "antd";
import { addCar } from '../redux/actions/carsActions';
import { useDispatch,useSelector } from 'react-redux';
import Spinner from '../components/Spinner';

function AddCar() {

const dispatch = useDispatch()
const {loading} = useSelector(state=>state.alertsReducer)

function onFinish(values) {

    values.bookedTimeSlots=[]
    dispatch(addCar(values))
    console.log(values)
}

  return (
    <AdminDefaultLayout>
    {loading && (<Spinner/>)}
    <br/>
    <Row justify='center' >
      <Col lg={14} sm={24}>
        <Form className='admincarform p-4' layout='vertical' onFinish={onFinish} style={{backgroundColor:'rgb(254, 175, 56)'}}>
        <h3>Add New Car</h3>
        <hr />
            <Form.Item name='name' label='Car Name' rules={[{required:true}]}>
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <Form.Item name='image' label='Image URL' rules={[{required:true}]}>
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <Form.Item name='image1' label='Side-Image URL' rules={[{required:true}]}>
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <Form.Item name='image2' label='Interior-Image URL' rules={[{required:true}]}>
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <Form.Item name='rentPerHour' label='Rent per Hour' rules={[{required:true}]} >
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <Form.Item name='capacity' label='Capacity' rules={[{required:true}]}>
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <Form.Item name='mileage' label='Mileage' rules={[{required:true}]}>
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <Form.Item name='type' label='Car Type' rules={[{required:true}]}>
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <Form.Item name='fuelType' label='Fuel Type' rules={[{required:true}]}>
                <Input style={{backgroundColor:'rgb(255, 202, 122)',borderColor:'transparent'}}/>
            </Form.Item>
            <div>
            <button className='btn1'>ADD CAR</button>
            </div>
        </Form>
      </Col>
    </Row>
    <br/>
    </AdminDefaultLayout>
    
  )
}

export default AddCar