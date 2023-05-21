import React,{ useState, useEffect } from 'react'
import AdminDefaultLayout from '../components/AdminDefaultLayout'
import { Row, Col, Form, Input } from "antd";
import { editAccessory } from '../redux/actions/accessoriesActions';
import { useDispatch,useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import {getAllAccessories} from '../redux/actions/accessoriesActions'

function EditAccessory({match}) {

const {accessories} = useSelector(state=>state.accessoriesReducer)
const dispatch = useDispatch()
const {loading} = useSelector(state=>state.alertsReducer)
const[accessory, setaccessory] = useState()
const[totalaccessories,settotalaccessories] = useState([])

useEffect(() => {

    if(accessories.lenght==0)
    {
        dispatch(getAllAccessories())
    }
    
    else
    {
        settotalaccessories(accessories)
        setaccessory(accessories.find((o) => o._id == match.params.accessoryid));
        console.log(accessory)
    }
},[accessories])

function onFinish(values) {

   values._id = accessory._id
    dispatch(editAccessory(values))
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
        {totalaccessories.length>0 && (
            <Form initialValues={accessory} className='addaccessoryform p-4' layout='vertical' onFinish={onFinish} style={{backgroundColor:'rgb(254, 175, 56)'}}>
        <h3>Edit Accessory</h3>
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
            <button className='btn1' style={{width:'150px'}}>EDIT ACCESSORY</button>
            </div>
        </Form>
        )}
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

export default EditAccessory