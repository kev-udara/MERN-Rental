import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { Row,Col,Divider,DatePicker, Modal } from 'antd';
import { getAllCars } from '../redux/actions/carsActions';
import moment from 'moment';
import { bookAccessory } from '../redux/actions/bookingActions';
import StripeCheckout from 'react-stripe-checkout';
const {RangePicker} = DatePicker

function RentingAccessory({match}) {

    const {accessories} = useSelector((state)=>state.accessoriesReducer)
    const {loading} = useSelector((state)=>state.alertsReducer)
    const [accessory , setaccessory] = useState({});
    const dispatch = useDispatch()
    const [from , setFrom] = useState()
    const [to, setTo] = useState()
    const [totalHours, setTotalHours] = useState(0)
    const[totalAmount, setTotalAmount] = useState(0)
    const[showModal , setShowModal] = useState(false)

    useEffect(() => {

        if(accessories.lenght==0)
        {
            dispatch(getAllCars())
        }
        
        else
        {
            
            setaccessory(accessories.find(o => o._id == match.params.accessoryid))
        }
    },[accessories, dispatch, match.params.accessoryid])

    useEffect(()=>{
        setTotalAmount((totalHours * accessory.rentPerHour))
    }, [totalHours])

    function selectTimeSlots(values){
      
       setFrom(moment(values[0]).format('MMM DD yyyy HH:mm'))
       setTo(moment(values[1]).format('MMM DD yyyy HH:mm'))

       setTotalHours(values[1].diff(values[0], 'hours'))
    }



    function onToken(token){
        const reqObj = {
            token,
            user : JSON.parse(localStorage.getItem('user'))._id,
            accessory : accessory._id,
            totalHours,
            totalAmount,
            bookedTimeSlots : {
                from,
                to
            }
        }
        dispatch(bookAccessory(reqObj));
    }

    return (
        <DefaultLayout>

            
           {loading && (<Spinner/>)}
           <Row justify='center' className='d-flex align-items-center' style={{minHeight:'90vh',color:'white'}}>
            <Col lg={10} sm={24} xs={24}>
                <img src={accessory.image} className="carimg2 bs1" alt=''/>
            </Col>

            <Col lg={9} sm={24} xs={24} className='text-right' style={{marginLeft:'92px'}}>
                <Divider type='horizontal' dashed style={{color:'white',borderColor:'white'}} className='divider'>Accessory Info</Divider>
                <Row className='rentingaccessory-row'>
                <Col lg={7} sm={24}>
                    <p>Accessory Name : </p>
                    <p>Rent Per Hour : </p>
                    <p>Description : </p>
                </Col>
                <Col lg={15} sm={24}>
                    <p style={{marginLeft:'22px'}} className='rentingaccessory-name'>{accessory.name}</p>
                    <p className='rentingaccessoryrentperhour'>Rs. {accessory.rentPerHour}/-</p>
                    <p className='rentingaccessorydescription'>{accessory.description}</p>
                </Col>
                </Row>
                <Divider type='horizontal' dashed style={{color:'white',borderColor:'white'}} className='divider'>Select Time Slots</Divider>
                <RangePicker placement='topLeft' showTime={{format: 'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={selectTimeSlots} style={{right:'190px',top:'40px',backgroundColor:'rgb(204, 124, 4)',borderColor:'transparent'}} className='rentingcar-rangepicker'/>
                <br />
                <button className='timeslots-button' onClick={()=>{setShowModal(true)}}>See Booked Slots</button>
                {from && to && (
                      <div style={{marginTop:'15px'}} className='rentingcar-othercontent'>
                      <p>Total Hours : {totalHours}</p>
                      <p>Rent Per Hour : <b>Rs. {accessory.rentPerHour}/-</b></p>
                          <h1 style={{color:'white',marginTop:'15px'}} className='rentingcar-total'>Total Amount : Rs. {totalAmount}/-</h1>

                          <StripeCheckout
                          shippingAddress
                            token={onToken}
                            amount={totalAmount * 100}
                            currency='usd'
                            stripeKey="pk_test_51MY5mXKMkMUz9lJB7SJj917h4032bE4Dv7bU1YQMjFA9Lxdu2p8ghvPgUUxJU3YckKPhI3Hif4HkMKVAaO9HQClT00layKeTcR"
                          >
                            <button className='btn1'>Rent Now</button>
                            </StripeCheckout>

                                                
                       </div>
                )}
            </Col>

           
            {accessory.name && ( <Modal visible={showModal} closable={false} footer={false} title='Booked time slots'>
                       <div className='p-2'>
           
                          {accessory.bookedTimeSlots.map(slot=>{
                           return <button className='btn1 mt-2' style={{width:'250px',borderRadius:'0'}}>{slot.from} - {slot.to}</button>
                          })}
           
                          <div className='text-right mt-5'>
                           
                           <button className='btn1' onClick={()=>{setShowModal(false)}}>CLOSE</button>
           
                          </div>
           
                       </div>
                  

                      </Modal>)}
           </Row>
            
                       
                    
        </DefaultLayout>
    );
}

export default RentingAccessory