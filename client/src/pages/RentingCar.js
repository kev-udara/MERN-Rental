import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { Row,Col,Divider,DatePicker, Checkbox, Modal } from 'antd';
import { getAllCars } from '../redux/actions/carsActions';
import moment from 'moment';
import { bookCar } from '../redux/actions/bookingActions';
import StripeCheckout from 'react-stripe-checkout';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Rate } from 'antd';


const {RangePicker} = DatePicker

function RentingCar({match}) {

    const {cars} = useSelector((state)=>state.carsReducer)
    const {loading} = useSelector((state)=>state.alertsReducer)
    const [car , setcar] = useState({});
    const dispatch = useDispatch()
    const [from , setFrom] = useState()
    const [to, setTo] = useState()
    const [totalHours, setTotalHours] = useState(0)
    const[driver, setdriver] = useState(false)
    const[totalAmount, setTotalAmount] = useState(0)
    const[showModal , setShowModal] = useState(false)
    const properties = {
        duration: 5000,
        transitionDuration: 1000,
        prevArrow: <></>, // pass in an empty fragment to hide the previous arrow
        nextArrow: <></>, // pass in an empty fragment to hide the next arrow
        autoplay: true,
        infinite: true,
        indicators:true
      };

      const [couponCode, setCouponCode] = useState("");
const [discountAmount, setDiscountAmount] = useState(0);
const [rating, setRating] = useState(0);

const handleRating = (value) => {
  setRating(value);
};


function handleCouponCodeChange(e) {
    setCouponCode(e.target.value);
  }

  function applyDiscount() {
    setTotalAmount(totalAmount * 0.3);
  }

    useEffect(() => {

        if(cars.lenght==0)
        {
            dispatch(getAllCars())
        }
        
        else
        {
            
            setcar(cars.find(o => o._id == match.params.carid))
        }
    },[cars, dispatch, match.params.carid])

    useEffect(()=>{
        setTotalAmount((totalHours * car.rentPerHour))
        if(driver)
        {
            setTotalAmount(totalAmount + (30 * totalHours))
        }
    }, [driver, totalHours])

    function selectTimeSlots(values){
      
       setFrom(moment(values[0]).format('MMM DD yyyy HH:mm'))
       setTo(moment(values[1]).format('MMM DD yyyy HH:mm'))

       setTotalHours(values[1].diff(values[0], 'hours'))
    }


    function onToken(token){
        const reqObj = {
            token,
            user : JSON.parse(localStorage.getItem('user'))._id,
            car : car._id,
            totalHours,
            totalAmount,
            driverRequired : driver,
            bookedTimeSlots : {
                from,
                to
            },
        }
        dispatch(bookCar(reqObj));
    }

    return (
        <DefaultLayout>

            
           {loading && (<Spinner/>)}
           <Row justify='center' className='d-flex align-items-center' style={{minHeight:'90vh',color:'white'}}>
            <Col lg={10} sm={24} xs={24}>
            <Slide {...properties}>
  <div className="each-slide">
    <img src={car.image} alt={car.name} className="carimg2 bs1" />
  </div>
  <div className="each-slide">
    <img src={car.image1} alt={car.name} className="carimg3 bs1"/>
  </div>
  <div className="each-slide">
    <img src={car.image2} alt={car.name} className="carimg3 bs1"/>
  </div>
</Slide>
<p>
  Total Rating : <Rate disabled style={{marginLeft:'32px'}} />
</p>
            </Col>

            <Col lg={9} sm={24} xs={24} className='text-right' style={{marginLeft:'92px'}}>
                <Divider type='horizontal' dashed style={{color:'white',borderColor:'white'}} className='divider'>Car Info</Divider>
                <Row className='rentingcar-row'>
                <Col lg={11} sm={24}>
                    <p>Car Name : </p>
                    <p>Rent Per Hour : </p>
                    <p>Car Type : </p>
                    <p>Fuel Type : </p>
                    <p>Max Persons : </p>
                </Col>
                <Col lg={5} sm={24}>
                    <p className='rentingcar-name'>{car.name}</p>
                    <p className='rentingcar-price'>Rs. {car.rentPerHour}/-</p>
                    <p className='rentingcar-type'>{car.type}</p>
                    <p className='rentingcar-fueltype'>{car.fuelType}</p>
                    <p className='rentingcar-capacity'>{car.capacity}</p>
                </Col>
                </Row>
                <Divider type='horizontal' dashed style={{color:'white',borderColor:'white'}} className='divider'>Select Time Slots</Divider>
                <RangePicker placement='topLeft' showTime={{format: 'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={selectTimeSlots} style={{right:'190px',top:'40px',backgroundColor:'rgb(204, 124, 4)',borderColor:'transparent'}} className='rentingcar-rangepicker'/>
                <br />
                <button className='timeslots-button' onClick={()=>{setShowModal(true)}}>See Booked Slots</button>
                {from && to && (
                      <div style={{marginTop:'15px'}} className='rentingcar-othercontent'>
                      <p className='totalhours'>Total Hours : {totalHours} <label className='ratinglabel'>Give rating :</label><Rate allowHalf value={rating} onChange={handleRating} className='starratings' /></p>
                      <p>Rent Per Hour : <b>Rs. {car.rentPerHour}/-</b></p>
                      <Checkbox onChange={(e)=>{
                              if(e.target.checked)
                              {
                                  setdriver(true);
                              }
                              else{
                                  setdriver(false)
                              }
                          }} style={{color:'white'}}>Driver Required</Checkbox><br/><br/>
                          <input
                            type="text"
                            placeholder=" Enter your coupon code"
                            value={couponCode}
                            onChange={handleCouponCodeChange}
                            style={{color:'black',marginRight:'12px',borderRadius:'9px'}}
                        />
                        <button onClick={applyDiscount} className='btn1'>Apply Discount</button>
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

           
            {car.name && ( <Modal visible={showModal} closable={false} footer={false} title='Booked time slots'>
                       <div className='p-2'>
           
                          {car.bookedTimeSlots.map(slot=>{
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

export default RentingCar