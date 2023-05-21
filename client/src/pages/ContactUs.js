import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import {getAllCars} from '../redux/actions/carsActions'
import {Row,Col,DatePicker} from 'antd';
import Spinner from '../components/Spinner';
import {Link} from 'react-router-dom';
import { Slide,Arrow } from 'react-slideshow-image';
import moment from 'moment';
import 'react-slideshow-image/dist/styles.css'
import { FaGasPump, FaPlay } from 'react-icons/fa';
import {BsSpeedometer} from 'react-icons/bs'
import ContactUsScrollDown from '../components/ContactUsScrollDown';
import RequestForm from '../components/RequestForm';
import Chat from '../components/Chat';

const {RangePicker} = DatePicker


function ContactUs(){
    const images = [
        
        
        "https://images.pexels.com/photos/1134857/pexels-photo-1134857.jpeg?cs=srgb&dl=pexels-jagmeet-singh-1134857.jpg&fm=jpg",
        "https://upgradedpoints.com/wp-content/uploads/2020/05/Man-receiving-rental-car-keys-from-woman.jpeg",
        "https://static.vecteezy.com/system/resources/previews/014/847/320/original/customer-service-and-satisfaction-concept-business-people-touching-the-virtual-screen-on-the-happy-smiley-face-icon-to-give-satisfaction-in-service-rating-very-impressed-free-photo.jpg"
    ];
    const {cars} = useSelector(state=>state.carsReducer)
    const {loading}= useSelector(state=>state.alertsReducer)
    const [totalCars , setTotalcars] =useState([])
    const dispatch = useDispatch()
    const [show, setShow]=useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[searchkey,setsearchkey]=useState('')
    const[type, settype]=useState('all')
    const[showModal , setShowModal] = useState(false)
    const [isBouncing, setIsBouncing] = useState(false);
    const properties = {
        duration: 5000,
        transitionDuration: 1000,
        prevArrow: <></>, // pass in an empty fragment to hide the previous arrow
        nextArrow: <></>, // pass in an empty fragment to hide the next arrow
        autoplay: true,
        infinite: true,
      };
    
    function handleImageClick(){
        setIsBouncing(true);
        setTimeout(() => {
            setIsBouncing(false);
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
              });
          }, 500);
          
    }
    const arrowimage = isBouncing ? 'bouncing-image' : '';

    useEffect(()=> {
        dispatch(getAllCars())
    },[])

    useEffect(() => {
        setTotalcars(cars)

    }, [cars])

    function setFilter(values){

        var selectedFrom = moment(values[0],'MMM DD yyyy HH:mm')
        var selectedTo = moment(values[1],'MMM DD yyyy HH:mm')
        var temp =[]

        for(var car of cars){

            if(car.bookedTimeSlots.lenght == 0){
                temp.push(car)
            }
            else{
                 for(var booking of car.bookedTimeSlots){
                   if(selectedFrom.isBetween(booking.from , booking.to) ||
                   selectedTo.isBetween(booking.from, booking.to) ||
                   moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                   moment(booking.to).isBetween(selectedFrom, selectedTo)
                   )
                   {

                   }
                   else{
                    temp.push(car)
                   }
                 }
            }

        }

        setTotalcars(temp)

    }
    function filterBySearch(){
        const temp = cars.filter(car => car.name.toLowerCase().includes(searchkey.toLowerCase()))
        setTotalcars(temp)
    }

    function filterByType(e){
        const temp = cars.filter(car => car.type.toLowerCase()==e.toLowerCase())
        setTotalcars(temp)
    }

    return (
        <DefaultLayout>
       <Slide {...properties}>
            <div className="home-each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[0]})`}}>
                <div className='slide-show-text'>
                <p className='slide-show-paraone'>WHEREVER YOU ARE</p>
                <p className='slide-show-paratwo'>ALWAYS AT YOUR SERVICE</p>
                <ContactUsScrollDown /> 
                </div>
                </div>
            </div>
            <div className="home-each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                <div className='slide-show-text'>
                <p className='slide-show-paraone'>WHEREVER YOU ARE</p>
                <p className='slide-show-paratwo'>ALWAYS AT YOUR SERVICE</p>
                <ContactUsScrollDown />
                </div>
                </div>
            </div>
            <div className="home-each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                <div className='slide-show-text'>
                <p className='slide-show-paraone'>WHEREVER YOU ARE</p>
                <p className='slide-show-paratwo'>ALWAYS AT YOUR SERVICE</p>
                <ContactUsScrollDown />
                </div>
                </div>
            </div>
        </Slide>
        

            
            
                <div style={{marginLeft:'115px'}}>
                <h2 className='welcome-text-title'>Contact Us</h2>
                </div>
                <img src="data:image/svg+xml,%3csvg id='SvgjsSvg1001' width='288' height='288' xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs'%3e%3cdefs id='SvgjsDefs1002'%3e%3c/defs%3e%3cg id='SvgjsG1008'%3e%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320' width='288' height='288'%3e%3cg fill='none' fill-rule='evenodd'%3e%3ccircle cx='160' cy='160' r='160' fill='white' class='colorFFF svgShape'%3e%3c/circle%3e%3cg transform='translate(60 60)' fill='black' class='color000 svgShape'%3e%3cpath fill='black' d='M199.069522%2c100.181395 C199.069522%2c98.6696803 198.438756%2c97.3035732 197.431184%2c96.3304882 L197.430003%2c96.2926066 L167.391838%2c66.189714 L133.472216%2c32.1992167 L103.463581%2c2.12236772 L103.418695%2c2.12236772 C102.441835%2c1.08417366 101.068088%2c0.428347536 99.533696%2c0.428347536 C97.9603245%2c0.428347536 96.5570472%2c1.12205531 95.5790055%2c2.20996905 L95.5577437%2c2.20996905 L65.6341554%2c32.1992167 L31.7109907%2c66.189714 L1.64801959%2c96.313915 L1.64801959%2c96.3210178 C0.636903989%2c97.2964704 0.000231896861%2c98.6637613 0.000231896861%2c100.181395 C0.000231896861%2c101.709683 0.643991248%2c103.079342 1.66455653%2c104.055978 L1.66455653%2c104.063081 L31.7109907%2c134.181363 L65.6341554%2c100.181395 L99.5549578%2c66.189714 L133.472216%2c100.181395 L167.385932%2c134.181363 L197.595373%2c103.905635 L197.594191%2c103.860651 C198.503723%2c102.900587 199.069522%2c101.610244 199.069522%2c100.181395' class='color000 svgShape'%3e%3c/path%3e%3cpath fill='%23feaf38' d='M133.47198%2c100.181395 L99.5547215%2c134.181363 L65.6339192%2c100.181395 L31.7119356%2c134.181363 L65.6339192%2c168.175411 L95.7087023%2c198.315002 C96.6820192%2c199.312947 98.0333233%2c199.934443 99.5346409%2c199.934443 C101.092657%2c199.934443 102.482941%2c199.257308 103.460982%2c198.194254 L103.525949%2c198.19307 L133.47198%2c168.175411 L167.385695%2c134.181363 L133.47198%2c100.181395 Z' class='colorEE3D35 svgShape'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e%3c/g%3e%3c/svg%3e" 
                className={arrowimage} alt='' onClick={handleImageClick} style={{width: '30px',marginLeft: '12px'}}/>
                <p className='welcome-paragraph' style={{marginTop:'12px'}}>EZ-Auto has a 24-hour, 365-day call center for Customer Care and Reservation Inquiries</p>
            
                <h1 className='welcome-text' style={{marginLeft:'-850px',marginTop:'35px'}}><b><u>Car Rental Reservations/ Customer Service</u></b></h1>

                <Row style={{marginTop:'35px'}} gutter={5}>
                    <Col lg={2} sm={24} xs={24}>
                    <div className='image-circle'>
                     <img src='https://img.sixt.com/1600/Generic_images_stephan-louis-qm1C36SOynk-unsplash_(1).jpg' alt=''/>
                     </div>
                    </Col>
                    <Col lg={1}>
                     <p className='welcome-paragraph-contactreason'><b>For New Reservations</b></p>
                    </Col>
                    <Col>
                    <p className='welcome-paragraph-contactnumber'><b>(323) 593-7485</b></p>
                    </Col>
                </Row>
                <Row style={{marginTop:'35px'}} gutter={5}>
                    <Col lg={2} sm={24} xs={24}>
                    <div className='image-circle'>
                     <img src='https://media.istockphoto.com/id/1308986719/photo/yellow-question-mark-on-a-background-of-black-signs-faq-concept.jpg?b=1&s=170667a&w=0&k=20&c=nYJZc-GjMeQDjQU0sl8dvpxF0PBCVyht69Zi2RbLzyM=' alt='' style={{width:'100px'}}/>
                     </div>
                    </Col>
                    <Col lg={1}>
                     <p className='welcome-paragraph-contactreason'><b>For General Questions</b></p>
                    </Col>
                    <Col>
                    <p className='welcome-paragraph-contactnumber'><b>(323) 593-7485</b></p>
                    </Col>
                </Row>
                <Row style={{marginTop:'35px'}} gutter={5}>
                    <Col lg={2} sm={24} xs={24}>
                    <div className='image-circle'>
                     <img src='https://t3.ftcdn.net/jpg/04/56/42/22/360_F_456422241_mmqjKN1x7gySgbYg4f8uJNbto0zHSHYf.jpg' alt='' style={{width:'90px'}}/>
                     </div>
                    </Col>
                    <Col lg={1}>
                     <p className='welcome-paragraph-contactreason' style={{marginRight:'16px'}}><b style={{marginRight:'-12px'}}>Emergency Roadside Assistance</b></p>
                    </Col>
                    <Col>
                    <p className='welcome-paragraph-contactnumber'><b>(323) 593-7485</b></p>
                    </Col>
                </Row>
            <Row justify='center' gutter={10}>
                <Col lg={8} sm={24} xs={24}>
                <div className='home-content'>
                <div>
                    <img src='https://media.product.which.co.uk/prod/images/original/9ac474a6730a-car-in-usa-1.jpg' alt='' className='home-contentimg'/>
                </div>
                <div className="center__text">
                <h3 style={{color:'white'}}><b>Enjoy The Ride</b></h3>
                <p className='center__text_bottom'>Ultimate Service for Drivers</p>
                <div className='button_content'>
                <button className='home-fleetbtn mr-5'><Link to={`/fleet`} style={{color:'rgb(254, 175, 56)'}}>Check Out Our Vehicles</Link></button>
                </div>
                </div>
                </div>
                </Col>
                <Col lg={8} sm={24} xs={24}>
                <div className='home-content'>
                <div>
                    <img src='https://i.etsystatic.com/21113464/r/il/20fdb1/4593684762/il_fullxfull.4593684762_3zry.jpg' alt='' className='home-contentimg'/>
                    </div>
                    <div className="center__text">
                <h3 style={{color:'white'}}><b>Car Accessories</b></h3>
                <p className='center__text_bottom'>Enhance Your Experiences</p>
                <div className='button_content'>
                <button className='home-accessorybtn mr-2'><Link to={`/accessory`} style={{color:'rgb(254, 175, 56)'}}>View Accessories</Link></button>
                </div>
                </div>
                </div>
                </Col>
                <Col lg={8} sm={24} xs={24}>
                <div className='home-content'>
                <div>
                    <img src='https://www.revv.co.in/blogs/wp-content/uploads/2020/09/Car-Rentals-in-India.jpg' alt='' className='home-contentimg'/>
                </div>
                <div className="center__text">
                <h3 style={{color:'white'}}><b>FAQ</b></h3>
                <p className='center__text_bottom'>Frequently Answered Questions</p>
                <div className='button_content'>
                    <button className='btn1 mr-2'><Link to={`/faq`} style={{color:'rgb(254, 175, 56)'}}>View All Answers</Link></button>
                </div>
                </div>
                </div>
                </Col>
            </Row>
            <div style={{marginTop:'95px',alignItems:'center'}}>
                <h1 style={{color:'white', marginLeft:'12px'}}><b>Why Choose EZ-Auto ?</b></h1>
                <p style={{color:'white',marginLeft:'12px'}}>Reasons For Customers To Choose This System</p>
                <hr style={{backgroundColor:'white',height:'5px'}}></hr>
            </div>
            <div style={{marginTop:'90px'}}>
                <Row justify='center'>
                    <Col lg={5} sm={24} xs={24}>
                     <div className='choose-contentone'>
                        <div>
                            <img src='data:image/svg+xml;base64,PHN2ZyBpZD0iU3ZnanNTdmcxMDAxIiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjI4OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmdqcz0iaHR0cDovL3N2Z2pzLmNvbS9zdmdqcyI+PGRlZnMgaWQ9IlN2Z2pzRGVmczEwMDIiPjwvZGVmcz48ZyBpZD0iU3ZnanNHMTAwOCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSIyODgiIGhlaWdodD0iMjg4Ij48cGF0aCBmaWxsPSIjZmVhZjM4IiBkPSJNNDUyLDQwSDYwQTM2LDM2LDAsMCwwLDI0LDc2VjM3MmEzNiwzNiwwLDAsMCwzNiwzNkgxOTYuOWwtMy42MiwxMC44Ny03LjgxLDUuMkEzOS4xNSwzOS4xNSwwLDAsMCwxNjgsNDU2LjcxVjQ2NGE4LDgsMCwwLDAsOCw4SDMzNy4zN2E4LDgsMCwwLDAsOC04di03LjI5YTM5LjEzLDM5LjEzLDAsMCwwLTE3LjQ3LTMyLjY0bC04LTUuMzNMMzE1LjcxLDQwOEg0NTJhMzYsMzYsMCwwLDAsMzYtMzZWNzZBMzYsMzYsMCwwLDAsNDUyLDQwWk0zMTksNDM3LjM5QTIzLjE2LDIzLjE2LDAsMCwxLDMyOS4zNiw0NTZIMTg0YTIzLjE5LDIzLjE5LDAsMCwxLDEwLjMzLTE4LjYxbDEwLjEtNi43M2E4LDgsMCwwLDAsMy4xNS00LjEzTDIxMy43Nyw0MDhIMjI0YTMyLDMyLDAsMCwwLDYzLjc2LDQsMzMuMDksMzMuMDksMCwwLDAsLjI0LTRoMTAuNTNsNy4zOSwxOC45MWE4LDgsMCwwLDAsMywzLjc1Wk0yNDAsNDA4aDMyYTIwLjExLDIwLjExLDAsMCwxLS4xMSwyLjA1QTE2LDE2LDAsMCwxLDI0MCw0MDhabTIzMi0zNmEyMCwyMCwwLDAsMS0yMCwyMEg2MGEyMCwyMCwwLDAsMS0yMC0yMFYzNjBINDcyWm0wLTI4SDQwVjc2QTIwLDIwLDAsMCwxLDYwLDU2SDQ1MmEyMCwyMCwwLDAsMSwyMCwyMFoiIGNsYXNzPSJjb2xvcmY1NmMxZCBzdmdTaGFwZSI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZWFmMzgiIGQ9Ik0yMTIgMTA0aC03LjA2TDE5MS4xNSA3Ni40MkE4IDggMCAwMDE4NCA3MkgxMjBhOCA4IDAgMDAtNi40IDMuMkw5MiAxMDRIODJhMjYgMjYgMCAwMC0yNiAyNnYyMmE4IDggMCAwMDggOEg4MS4zOGEyNCAyNCAwIDAwNDUuMjQgMGgzNC43NmEyNCAyNCAwIDAwNDUuMjQgMEgyMjRhOCA4IDAgMDA4LThWMTI0QTIwIDIwIDAgMDAyMTIgMTA0ek0xNjAgODhoMTkuMDZsOCAxNkgxNjB6bS0zNiAwaDIwdjE2SDExMnptLTIwIDcyYTggOCAwIDExOC04QTggOCAwIDAxMTA0IDE2MHptODAgMGE4IDggMCAxMTgtOEE4IDggMCAwMTE4NCAxNjB6bTMyLTE2aC05LjM4YTI0IDI0IDAgMDAtNDUuMjQgMEgxMjYuNjJhMjQgMjQgMCAwMC00NS4yNCAwSDcyVjEzMGExMCAxMCAwIDAxMTAtMTBIMjEyYTQgNCAwIDAxNCA0ek00NTEuNzYgOTcuMjJMNDMyIDEwOS41N1YxMDRhOCA4IDAgMDAtOC04SDM2MGE4IDggMCAwMC04IDh2NjRhOCA4IDAgMDA4IDhoNjRhOCA4IDAgMDA4LThWMTI4LjQzbDI4LjI0LTE3LjY1YTggOCAwIDAwLTguNDgtMTMuNTZ6TTQxNiAxMTkuNTdsLTIwLjc4IDEzLTQuMDctOC4xM2E4IDggMCAwMC0xNC4zIDcuMTZsOCAxNmE4IDggMCAwMDEwLjczIDMuNThjLjIyLS4xMi40NS0uMjQuNjYtLjM4TDQxNiAxMzguNDNWMTYwSDM2OFYxMTJoNDh6TTMyOCAxMTJIMjU2YTggOCAwIDAwMCAxNmg3MmE4IDggMCAwMDAtMTZ6TTI1NiAxNjBoMjRhOCA4IDAgMDAwLTE2SDI1NmE4IDggMCAwMDAgMTZ6TTMyOCAxNDRIMzA0YTggOCAwIDAwMCAxNmgyNGE4IDggMCAwMDAtMTZ6TTI5NiAyNjRIMjU2YTggOCAwIDAwMCAxNmg0MGE4IDggMCAwMDAtMTZ6TTMyOCAyNjRoLThhOCA4IDAgMDAwIDE2aDhhOCA4IDAgMDAwLTE2ek0zMjggMjMySDI1NmE4IDggMCAwMDAgMTZoNzJhOCA4IDAgMDAwLTE2eiIgY2xhc3M9ImNvbG9yZjU2YzFkIHN2Z1NoYXBlIj48L3BhdGg+PGNpcmNsZSBjeD0iMjU2IiBjeT0iMzIwIiByPSI4IiBmaWxsPSIjZmVhZjM4IiBjbGFzcz0iY29sb3JmNTZjMWQgc3ZnU2hhcGUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjI4OCIgY3k9IjMyMCIgcj0iOCIgZmlsbD0iI2ZlYWYzOCIgY2xhc3M9ImNvbG9yZjU2YzFkIHN2Z1NoYXBlIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIyMjQiIGN5PSIzMjAiIHI9IjgiIGZpbGw9IiNmZWFmMzgiIGNsYXNzPSJjb2xvcmY1NmMxZCBzdmdTaGFwZSI+PC9jaXJjbGU+PHBhdGggZmlsbD0iI2ZlYWYzOCIgZD0iTTIwNi40IDE5NS4yQTggOCAwIDAwMjAwIDE5MkgxMjhhOCA4IDAgMDAtNi40IDMuMkwxMDAgMjI0SDgyYTI2IDI2IDAgMDAtMjYgMjZ2MjJhOCA4IDAgMDA4IDhIODEuMzhhMjQgMjQgMCAwMDQ1LjI0IDBoMzQuNzZhMjQgMjQgMCAwMDQ1LjI0IDBIMjE0YTE4IDE4IDAgMDAxOC0xOFYyMzJhOCA4IDAgMDAtMS42LTQuOHpNMjA4IDIyNEgxNjhWMjA4aDI4em0tNzYtMTZoMjB2MTZIMTIwem0tMjggNzJhOCA4IDAgMTE4LThBOCA4IDAgMDExMDQgMjgwem04MCAwYTggOCAwIDExOC04QTggOCAwIDAxMTg0IDI4MHptMzItMThhMiAyIDAgMDEtMiAyaC03LjM4YTI0IDI0IDAgMDAtNDUuMjQgMEgxMjYuNjJhMjQgMjQgMCAwMC00NS4yNCAwSDcyVjI1MGExMCAxMCAwIDAxMTAtMTBIMjE2ek00MjQgMjA4SDM2MGE4IDggMCAwMC04IDh2NjRhOCA4IDAgMDA4IDhoNjRhOCA4IDAgMDA4LThWMjE2QTggOCAwIDAwNDI0IDIwOHptLTU2IDI3LjMxTDM4MC42OSAyNDggMzY4IDI2MC42OXpNMzc5LjMxIDIyNGgyNS4zOEwzOTIgMjM2LjY5ek0zOTIgMjU5LjMxTDQwNC42OSAyNzJIMzc5LjMxek00MDMuMzEgMjQ4TDQxNiAyMzUuMzF2MjUuMzh6IiBjbGFzcz0iY29sb3JmNTZjMWQgc3ZnU2hhcGUiPjwvcGF0aD48L3N2Zz48L2c+PC9zdmc+' alt='' className='choose-content-img'/>
                        </div>
                        <p style={{color:'white'}} className='choose-content-paragraphone'>Simple And Secure<br/> Online Booking Capability</p>
                     </div>
                    </Col>
                    <Col lg={5} sm={24} xs={24}>
                     <div className='choose-contenttwo'>
                        <div>
                            <img src='data:image/svg+xml;base64,PHN2ZyBpZD0iU3ZnanNTdmcxMDE2IiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjI4OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmdqcz0iaHR0cDovL3N2Z2pzLmNvbS9zdmdqcyI+PGRlZnMgaWQ9IlN2Z2pzRGVmczEwMTciPjwvZGVmcz48ZyBpZD0iU3ZnanNHMTAxOCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSIyODgiIGhlaWdodD0iMjg4Ij48cGF0aCBmaWxsPSIjZmVhZjM4IiBkPSJNMzAwIDE2OGgtNy4wNmwtMTMuNzktMjcuNThBOCA4IDAgMDAyNzIgMTM2SDIwOGE4IDggMCAwMC02LjQgMy4yTDE4MCAxNjhIMTcwYTI2IDI2IDAgMDAtMjYgMjZ2MjJhOCA4IDAgMDA4IDhoMTcuMzhhMjQgMjQgMCAwMDQ1LjI0IDBoMzQuNzZhMjQgMjQgMCAwMDQ1LjI0IDBIMzEyYTggOCAwIDAwOC04VjE4OGEyMCAyMCAwIDAwLTIwLTIwem0tMjQuOTQgMEgyNDhWMTUyaDE5LjA2ek0yMTIgMTUyaDIwdjE2SDIwMHptLTIwIDcyYTggOCAwIDExOC04QTggOCAwIDAxMTkyIDIyNHptODAgMGE4IDggMCAxMTgtOEE4IDggMCAwMTI3MiAyMjR6bTMyLTE2aC05LjM4YTI0IDI0IDAgMDAtNDUuMjQgMEgyMTQuNjJhMjQgMjQgMCAwMC00NS4yNCAwSDE2MFYxOTRhMTAgMTAgMCAwMTEwLTEwSDMwMGE0IDQgMCAwMTQgNHpNMTEyIDI4OGEyNCAyNCAwIDEwMjQgMjRBMjQgMjQgMCAwMDExMiAyODh6bTAgMzJhOCA4IDAgMTE4LThBOCA4IDAgMDExMTIgMzIwek0xMTIgMzUyYTI0IDI0IDAgMTAyNCAyNEEyNCAyNCAwIDAwMTEyIDM1MnptMCAzMmE4IDggMCAxMTgtOEE4IDggMCAwMTExMiAzODR6TTE3NiAzMzZhMjQgMjQgMCAxMC0yNC0yNEEyNCAyNCAwIDAwMTc2IDMzNnptMC0zMmE4IDggMCAxMS04IDhBOCA4IDAgMDExNzYgMzA0ek0yNDAgMjg4YTI0IDI0IDAgMTAyNCAyNEEyNCAyNCAwIDAwMjQwIDI4OHptMCAzMmE4IDggMCAxMTgtOEE4IDggMCAwMTI0MCAzMjB6TTI0MCAzNTJhMjQgMjQgMCAxMDI0IDI0QTI0IDI0IDAgMDAyNDAgMzUyem0wIDMyYTggOCAwIDExOC04QTggOCAwIDAxMjQwIDM4NHpNMzA0IDQwMGEyNCAyNCAwIDEwLTI0LTI0QTI0IDI0IDAgMDAzMDQgNDAwem0wLTMyYTggOCAwIDExLTggOEE4IDggMCAwMTMwNCAzNjh6TTM2OCAzMzZhMjQgMjQgMCAxMC0yNC0yNEEyNCAyNCAwIDAwMzY4IDMzNnptMC0zMmE4IDggMCAxMS04IDhBOCA4IDAgMDEzNjggMzA0ek0zNjggNDAwYTI0IDI0IDAgMTAtMjQtMjRBMjQgMjQgMCAwMDM2OCA0MDB6bTAtMzJhOCA4IDAgMTEtOCA4QTggOCAwIDAxMzY4IDM2OHpNMTEyIDQxNmEyNCAyNCAwIDEwMjQgMjRoMEEyNCAyNCAwIDAwMTEyIDQxNnptMCAzMmE4IDggMCAxMTgtOEE4IDggMCAwMTExMiA0NDh6TTE3NiA0MTZhMjQgMjQgMCAxMDI0IDI0aDBBMjQgMjQgMCAwMDE3NiA0MTZ6bTAgMzJhOCA4IDAgMTE4LThBOCA4IDAgMDExNzYgNDQ4ek0yNDAgNDE2YTI0IDI0IDAgMTAyNCAyNGgwQTI0IDI0IDAgMDAyNDAgNDE2em0wIDMyYTggOCAwIDExOC04QTggOCAwIDAxMjQwIDQ0OHpNMTk0LjI4IDM3MS4xNGwtMjkuNzggMjdBNy44IDcuOCAwIDAxMTU0IDM4Ni41NnMyOS42NS0yNi43NSAzMC0yN0wxNjAuMjggMzgxbDI5LjgxLTI2Ljk1YTcuOCA3LjggMCAwMTEwLjQ1IDExLjU4cy0yOS42OCAyNi43MS0zMC4wOCAyNyIgY2xhc3M9ImNvbG9yZjU2YzFkIHN2Z1NoYXBlIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZlYWYzOCIgZD0iTTE3MC4zOCAzNTkuODFsMzAuMyAyNi40QTcuOCA3LjggMCAwMTE5MC40MiAzOThzLTMwLTI2LjMtMzAuMzQtMjYuNjdsMjQuMDkgMjEuMTNMMTUzLjkxIDM2NmE3LjggNy44IDAgMDExMC4yNy0xMS43M3MzMCAyNi4zNCAzMC4zIDI2LjcxTTMyMy4yIDI5Ny42bC0yNC4zMyAxOC4yNS0zLjcxLTcuNDNhOCA4IDAgMDAtMTQuMzEgNy4xNmw4IDE2YTggOCAwIDAwMTEuOTUgMi44MmwzMi0yNGE4IDggMCAwMC05LjU5LTEyLjgxek0zMjMuMiA0MjUuNmwtMjQuMzMgMTguMjUtMy43MS03LjQzYTggOCAwIDAwLTE0LjMxIDcuMTZsOCAxNmE4IDggMCAwMDExLjk1IDIuODJsMzItMjRhOCA4IDAgMDAtOS42LTEyLjh6TTM4Ny4yIDQyNS42bC0yNC4zMyAxOC4yNS0zLjcxLTcuNDNhOCA4IDAgMDAtMTQuMzEgNy4xNmw4IDE2YTggOCAwIDAwMTEuOTUgMi44MmwzMi0yNGE4IDggMCAwMC05LjYtMTIuOHoiIGNsYXNzPSJjb2xvcmY1NmMxZCBzdmdTaGFwZSI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZWFmMzgiIGQ9Ik00NDAsNTZINDAwVjQwYTI0LDI0LDAsMCwwLTQ4LDBWNTZIMzIwVjQwYTI0LDI0LDAsMCwwLTQ4LDBWNTZIMjA4VjQwYTI0LDI0LDAsMCwwLTQ4LDBWNTZIMTI4VjQwYTI0LDI0LDAsMCwwLTQ4LDBWNTZINzBBMjIsMjIsMCwwLDAsNDgsNzhWNDg4YTgsOCwwLDAsMCw4LDhINDI0YTgsOCwwLDAsMCw4LThWNDcyaDI0YTgsOCwwLDAsMCw4LThWODBBMjQsMjQsMCwwLDAsNDQwLDU2Wm04LDQ4SDQzMlY4MGE4LDgsMCwwLDEsMTYsMFpNNjQsMTIwSDQxNlYyNTZINjRaTTM2OCw0MGE4LDgsMCwwLDEsMTYsMFY2NGE4LDgsMCwwLDEtMTYsMFptLTgwLDBhOCw4LDAsMCwxLDE2LDBWNjRhOCw4LDAsMCwxLTE2LDBaTTE3Niw0MGE4LDgsMCwwLDEsMTYsMFY2NGE4LDgsMCwwLDEtMTYsMFpNOTYsNDBhOCw4LDAsMCwxLDE2LDBWNjRhOCw4LDAsMCwxLTE2LDBaTTY0LDc4YTYsNiwwLDAsMSw2LTZIODEuMzhhMjQsMjQsMCwwLDAsNDUuMjQsMGgzNC43NmEyNCwyNCwwLDAsMCw0NS4yNCwwaDY2Ljc2YTI0LDI0LDAsMCwwLDQ1LjI0LDBoMzQuNzZhMjQsMjQsMCwwLDAsNDUuMjQsMGgxOC43NkEyMy43LDIzLjcsMCwwLDAsNDE2LDgwdjI0SDY0Wk00MTYsNDgwSDY0VjI3Mkg0MTZabTMyLTI0SDQzMlYxMjBoMTZaIiBjbGFzcz0iY29sb3JmNTZjMWQgc3ZnU2hhcGUiPjwvcGF0aD48L3N2Zz48L2c+PC9zdmc+' alt='' className='choose-content-imgtwo'/>
                        </div>
                        <p style={{color:'white',marginTop:'10px'}} className='choose-content-paragraph'>Gratis Changes And <br/>Cancellations To Reservations</p>
                     </div>
                    </Col>
                    <Col lg={5} sm={24} xs={24}>
                     <div className='choose-contentthree'>
                        <div>
                            <img src='data:image/svg+xml;base64,PHN2ZyBpZD0iU3ZnanNTdmcxMDIzIiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjI4OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmdqcz0iaHR0cDovL3N2Z2pzLmNvbS9zdmdqcyI+PGRlZnMgaWQ9IlN2Z2pzRGVmczEwMjQiPjwvZGVmcz48ZyBpZD0iU3ZnanNHMTAyNSI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSIyODgiIGhlaWdodD0iMjg4Ij48cGF0aCBmaWxsPSIjZmVhZjM4IiBkPSJNNDg3LjE1LDMyNC40Miw0NzIuOTQsMjk2bDYuMjEtMTIuNDJBOCw4LDAsMCwwLDQ3MiwyNzJINDA5Ljg5bC00NC4xNS0yMi4wOGE5NC41Miw5NC41MiwwLDAsMC00Mi05LjkySDI2Mi45NGE4Ny44NSw4Ny44NSwwLDAsMC00Ni42NCwxMy4zOEwxNzMuNzEsMjgwSDEyOC41YTEzMC41NCwxMzAuNTQsMCwwLDAtNjQuNjgsMTcuMTgsNjIuOCw2Mi44LDAsMCwwLTMxLjI5LDQ2LjczbC0xLjMyLjEzQTgsOCwwLDAsMCwyNCwzNTJ2MjRhOCw4LDAsMCwwLDgsOEg4OEEzOS45LDM5LjksMCwwLDAsMTM2LDM4NEgzNzZBMzkuOTEsMzkuOTEsMCwwLDAsNDI5LDM3OS41NGw1Mi43Ny0xMS43M2E4LDgsMCwwLDAsNS40Mi00LjIzQTQ0LjI4LDQ0LjI4LDAsMCwwLDQ4Ny4xNSwzMjQuNDJaTTQwOCwyODhoNTEuMDZsLTIuMjEsNC40MmE4LDgsMCwwLDAsMCw3LjE2bDExLjQxLDIyLjgzLTM0Ljc4LDcuNzNBNDAsNDAsMCwwLDAsMzYzLjM1LDM2OEgzMTNsMzUuNjktMjUuNDlBOCw4LDAsMCwwLDM1MiwzMzZWMjkybDI0Ljg1LTE4LjYzLDI3LjU3LDEzLjc4QTgsOCwwLDAsMCw0MDgsMjg4Wk0xOTcuNDIsMzY4LDE4NCwzMzQuNDZWMjk2SDMzNnYzNS44OEwyODUuNDQsMzY4Wk0zNjAuODUsMjY1LjM3LDM0MS4zMywyODBIMzI4VjI1Ni4xMmE3OC41Miw3OC41MiwwLDAsMSwzMC41OCw4LjExWm0tMTM2LjA3LDEuNTdBNzIsNzIsMCwwLDEsMjYyLjk0LDI1NkgzMTJ2MjRIMjAzLjlabS0xNTMsNDQuMTNBMTE0LjU5LDExNC41OSwwLDAsMSwxMjguNSwyOTZIMTY4djQwYTcuOTIsNy45MiwwLDAsMCwuNTcsM2wxMS42MSwyOUgxNDguNjVhNDAsNDAsMCwwLDAtNzMuMzEtMzJjLS41MywxLjIzLTEsMi40OS0xLjQyLDMuNzdMNDksMzQyLjI2QTQ2Ljg4LDQ2Ljg4LDAsMCwxLDcxLjc1LDMxMS4wN1pNNDAsMzU5LjI0LDcyLjIsMzU2YTM5LjgxLDM5LjgxLDAsMCwwLDMuMTUsMTJINDBaTTg4LDM1MmEyNCwyNCwwLDEsMSwyNCwyNEEyNCwyNCwwLDAsMSw4OCwzNTJabTI4OCwwYTI0LDI0LDAsMSwxLDI0LDI0QTI0LDI0LDAsMCwxLDM3NiwzNTJabTk4LjI1LDEuMDhMNDM5LDM2MC45MmEzOS43MiwzOS43MiwwLDAsMCwuNDItMTUuN2wzNS41NC03LjlBMjgsMjgsMCwwLDEsNDc0LjI1LDM1My4wOFoiIGNsYXNzPSJjb2xvcmY1NmMxZCBzdmdTaGFwZSI+PC9wYXRoPjxjaXJjbGUgY3g9IjExMiIgY3k9IjM1MiIgcj0iMTAiIGZpbGw9IiNmZWFmMzgiIGNsYXNzPSJjb2xvcmY1NmMxZCBzdmdTaGFwZSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMzUyIiByPSIxMCIgZmlsbD0iI2ZlYWYzOCIgY2xhc3M9ImNvbG9yZjU2YzFkIHN2Z1NoYXBlIj48L2NpcmNsZT48cGF0aCBmaWxsPSIjZmVhZjM4IiBkPSJNMzEyIDMxMkgyOTZhOCA4IDAgMDAwIDE2aDE2YTggOCAwIDAwMC0xNnpNMzgwLjQyIDE3NS4xNWE0NiA0NiAwIDAxMjAuNDMgMjAuNDMgOCA4IDAgMDAxMC43MyAzLjU3IDcuOTEgNy45MSAwIDAwMy41Ny0zLjU3IDQ2IDQ2IDAgMDEyMC40My0yMC40MyA4IDggMCAwMDMuNTctMTAuNzMgNy45MSA3LjkxIDAgMDAtMy41Ny0zLjU3IDQ2IDQ2IDAgMDEtMjAuNDMtMjAuNDMgOCA4IDAgMDAtMTAuNzMtMy41NyA3LjkxIDcuOTEgMCAwMC0zLjU3IDMuNTcgNDYgNDYgMCAwMS0yMC40MyAyMC40MyA4IDggMCAwMC0zLjU3IDEwLjczQTcuOTEgNy45MSAwIDAwMzgwLjQyIDE3NS4xNXpNNDA4IDE1OC42OWE2MyA2MyAwIDAwOS4zMSA5LjMxIDYzIDYzIDAgMDAtOS4zMSA5LjMxIDYzIDYzIDAgMDAtOS4zMS05LjMxQTYzIDYzIDAgMDA0MDggMTU4LjY5ek02MC40MiAxNTkuMTVhNDYgNDYgMCAwMTIwLjQzIDIwLjQzIDggOCAwIDAwMTAuNzMgMy41NyA3LjkxIDcuOTEgMCAwMDMuNTctMy41NyA0NiA0NiAwIDAxMjAuNDMtMjAuNDMgOCA4IDAgMDAzLjU3LTEwLjczIDcuOTEgNy45MSAwIDAwLTMuNTctMy41NyA0NiA0NiAwIDAxLTIwLjQzLTIwLjQzIDggOCAwIDAwLTEwLjczLTMuNTcgNy45MSA3LjkxIDAgMDAtMy41NyAzLjU3IDQ2IDQ2IDAgMDEtMjAuNDMgMjAuNDMgOCA4IDAgMDAtMy41NyAxMC43M0E3LjkxIDcuOTEgMCAwMDYwLjQyIDE1OS4xNXpNODggMTQyLjY5QTYzIDYzIDAgMDA5Ny4zMSAxNTIgNjMgNjMgMCAwMDg4IDE2MS4zMSA2MyA2MyAwIDAwNzguNjkgMTUyIDYzIDYzIDAgMDA4OCAxNDIuNjl6TTUyLjQyIDI0Ny4xNWE0NiA0NiAwIDAxMjAuNDMgMjAuNDMgOCA4IDAgMDAxMC43MyAzLjU3IDcuOTEgNy45MSAwIDAwMy41Ny0zLjU3IDQ2IDQ2IDAgMDEyMC40My0yMC40MyA4IDggMCAwMDMuNTctMTAuNzMgNy45MSA3LjkxIDAgMDAtMy41Ny0zLjU3IDQ2IDQ2IDAgMDEtMjAuNDMtMjAuNDMgOCA4IDAgMDAtMTAuNzMtMy41NyA3LjkxIDcuOTEgMCAwMC0zLjU3IDMuNTcgNDYgNDYgMCAwMS0yMC40MyAyMC40MyA4IDggMCAwMC0zLjU3IDEwLjczQTcuOTEgNy45MSAwIDAwNTIuNDIgMjQ3LjE1ek04MCAyMzAuNjlBNjMgNjMgMCAwMDg5LjMxIDI0MCA2MyA2MyAwIDAwODAgMjQ5LjMxIDYzIDYzIDAgMDA3MC42OSAyNDAgNjMgNjMgMCAwMDgwIDIzMC42OXpNNDI0IDIxNmE4IDggMCAwMDQuNDIgNy4xNSA0NiA0NiAwIDAxMjAuNDMgMjAuNDMgOCA4IDAgMDAxMC43MyAzLjU3IDcuOTEgNy45MSAwIDAwMy41Ny0zLjU3IDQ2IDQ2IDAgMDEyMC40My0yMC40MyA4IDggMCAwMDMuNTctMTAuNzMgNy45MSA3LjkxIDAgMDAtMy41Ny0zLjU3IDQ2IDQ2IDAgMDEtMjAuNDMtMjAuNDMgOCA4IDAgMDAtMTAuNzMtMy41NyA3LjkxIDcuOTEgMCAwMC0zLjU3IDMuNTcgNDYgNDYgMCAwMS0yMC40MyAyMC40M0E4IDggMCAwMDQyNCAyMTZ6bTMyLTkuMzFhNjMgNjMgMCAwMDkuMzEgOS4zMSA2MyA2MyAwIDAwLTkuMzEgOS4zMSA2MyA2MyAwIDAwLTkuMzEtOS4zMUE2MyA2MyAwIDAwNDU2IDIwNi42OXpNMTA0IDE5NmE4IDggMCAwMDQuNDIgNy4xNSA1NSA1NSAwIDAxMjQuNDMgMjQuNDMgOCA4IDAgMDAxMC43MyAzLjU3IDcuOTEgNy45MSAwIDAwMy41Ny0zLjU3IDU1IDU1IDAgMDEyNC40My0yNC40MyA4IDggMCAwMDMuNTctMTAuNzMgNy45MSA3LjkxIDAgMDAtMy41Ny0zLjU3IDU1IDU1IDAgMDEtMjQuNDMtMjQuNDMgOCA4IDAgMDAtMTAuNzMtMy41NyA3LjkxIDcuOTEgMCAwMC0zLjU3IDMuNTcgNTUgNTUgMCAwMS0yNC40MyAyNC40M0E4IDggMCAwMDEwNCAxOTZ6bTM2LTEzYTcxLjY1IDcxLjY1IDAgMDAxMyAxMyA3MS42NSA3MS42NSAwIDAwLTEzIDEzIDcxLjY1IDcxLjY1IDAgMDAtMTMtMTNBNzEuNjUgNzEuNjUgMCAwMDE0MCAxODN6IiBjbGFzcz0iY29sb3JmNTZjMWQgc3ZnU2hhcGUiPjwvcGF0aD48L3N2Zz48L2c+PC9zdmc+' alt='' className='choose-content-img'/>
                        </div>
                        <p style={{color:'white'}} className='choose-content-paragraph'>Modern Fleet With <br/>Leading Vehicle Brands</p>
                     </div>
                    </Col>
                    <Col lg={5} sm={24} xs={24}>
                     <div className='choose-contentfour'>
                        <div>
                            <img src='data:image/svg+xml;base64,PHN2ZyBpZD0iU3ZnanNTdmcxMDMxIiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjI4OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmdqcz0iaHR0cDovL3N2Z2pzLmNvbS9zdmdqcyI+PGRlZnMgaWQ9IlN2Z2pzRGVmczEwMzIiPjwvZGVmcz48ZyBpZD0iU3ZnanNHMTAzMyI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSIyODgiIGhlaWdodD0iMjg4Ij48cGF0aCBmaWxsPSIjZmVhZjM4IiBkPSJNMzIsMzkySDY3LjM1YTQwLDQwLDAsMCwwLDczLjMsMGgyMDYuN2E0MCw0MCwwLDAsMCw3My43OC0xLjE0bDUzLjA3LTE1LjE3YTgsOCwwLDAsMCw1LjcyLTYuNTZsOC01NmE4LDgsMCwwLDAtMS4yNi01LjU3bC0yOS42LTQ2LjY4QTQzLjIzLDQzLjIzLDAsMCwwLDQyMC4xOCwyNDBIMjg3LjM2QTExOS4zMSwxMTkuMzEsMCwwLDAsMzEyLDE2Ny41VjEyMGE4LDgsMCwwLDAtOC04LDY0LjQzLDY0LjQzLDAsMCwxLTM4LjQtMTIuOGwtMTIuOC05LjZhOCw4LDAsMCwwLTkuNiwwbC0xMi44LDkuNkE2NC40Myw2NC40MywwLDAsMSwxOTIsMTEyYTgsOCwwLDAsMC04LDh2NDcuNWExMTkuMzIsMTE5LjMyLDAsMCwwLDI2Ljc3LDc1LjE4LDQyLjg4LDQyLjg4LDAsMCwwLTcuMiwzLjQ1TDEzMywyODguNDksNjEuMjEsMzA1LjA1QTQ3Ljc4LDQ3Ljc4LDAsMCwwLDI0LDM1MS43NVYzODRBOCw4LDAsMCwwLDMyLDM5MlptNzIsOGEyNCwyNCwwLDEsMSwyNC0yNEEyNCwyNCwwLDAsMSwxMDQsNDAwWm0yMDMuODgtMjRIMjU2VjMwNy4yNmw4OC00Ljc2djIyLjk0Wk0zODQsNDAwYTI0LDI0LDAsMSwxLDI0LTI0QTI0LDI0LDAsMCwxLDM4NCw0MDBabTc1Ljg4LTEwMy43N0w0NzAuMzksMzEyaC0xMC4xbC0xMC4xNi0xNS4yNFpNNDIxLjU3LDI1NmEyNy4xOCwyNy4xOCwwLDAsMSwyMS43NywxMy4wOGw3LDExLjYyLTM4LjYsMi4wOFpNMzYwLDI1Nmg0NC41M2wtMTAuMjIsMjcuNzZMMzYwLDI4NS42MVptMCw3MlYzMDEuNjNsNzIuMi0zLjljLjIxLjk0LDE3LjE1LDI2LjcxLDE3LjE1LDI2LjcxQTgsOCwwLDAsMCw0NTYsMzI4aDEzLjYzbC00LjgyLDMzLjczLTQwLjksMTEuNjlBNDAsNDAsMCwwLDAsMzQ0LDM3NkgzMjcuNTVsMzEtNDMuMzVBOCw4LDAsMCwwLDM2MCwzMjhabS0xNi03MnYzMC40OGwtODgsNC43NVYyNjguNTJBMTE4Ljc1LDExOC43NSwwLDAsMCwyNzIuNTgsMjU2Wk0yMDAsMTY3LjVWMTI3LjU5QTgwLjUzLDgwLjUzLDAsMCwwLDI0MCwxMTJsOC02LDgsNmE4MC41Myw4MC41MywwLDAsMCw0MCwxNS41OVYxNjcuNWExMDMuMzgsMTAzLjM4LDAsMCwxLTQ4LDg3LjE2QTEwMy4zOCwxMDMuMzgsMCwwLDEsMjAwLDE2Ny41Wm0xMS44LDkyLjM1YTI3LDI3LDAsMCwxLDExLjczLTMuNzVBMTE4LjQyLDExOC40MiwwLDAsMCwyNDAsMjY4LjUyVjI5Mi4xTDE2OC43NywyOTZsLTEyLjA5LTNabS0xNDcsNjAuNzksNzEuMTItMTYuNDEsMzAuMTQsNy41M2E3LjYxLDcuNjEsMCwwLDAsMS4wOC4xOWwuMzQsMCwuNTEsMGguNDRMMjQwLDMwOC4xMlYzNzZIMTQ0YTQwLDQwLDAsMCwwLTcwLjUxLTI1LjgzbC0zLjgzLTMuODNBOCw4LDAsMCwwLDY0LDM0NEw0MSwzNDMuODdhMzEuODMsMzEuODMsMCwwLDEsMjMuODItMjMuMjNaTTQwLDM1OS44NmwyMC42Ny4xMiw0LjkxLDQuOTFBMzkuNzcsMzkuNzcsMCwwLDAsNjQsMzc2SDQwWiIgY2xhc3M9ImNvbG9yZjU2YzFkIHN2Z1NoYXBlIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZlYWYzOCIgZD0iTTIwMCAzMzZoMTZhOCA4IDAgMDAwLTE2SDIwMGE4IDggMCAwMDAgMTZ6TTMxMiAzMjBIMjk2YTggOCAwIDAwMCAxNmgxNmE4IDggMCAwMDAtMTZ6TTI0MCAyMDhhOCA4IDAgMDA1LjY2LTIuMzRsNDAtNDBhOCA4IDAgMTAtMTEuMzItMTEuMzJMMjQwIDE4OC42OWwtMTAuMzQtMTAuMzVhOCA4IDAgMDAtMTEuMzIgMTEuMzJsMTYgMTZBOCA4IDAgMDAyNDAgMjA4eiIgY2xhc3M9ImNvbG9yZjU2YzFkIHN2Z1NoYXBlIj48L3BhdGg+PC9zdmc+PC9nPjwvc3ZnPg==' alt='' className='choose-content-img'/>
                        </div>
                        <p style={{color:'white'}} className='choose-content-paragraph'>Unbranded Vehicles For<br/> Added Security</p>
                     </div>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop:'80px'}}>
                <Row justify='center'>
                    <Col lg={5} sm={24} xs={24}>
                     <div className='choose-contentfive'>
                        <div>
                            <img src='data:image/svg+xml;base64,PHN2ZyBpZD0iU3ZnanNTdmcxMDM3IiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjI4OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmdqcz0iaHR0cDovL3N2Z2pzLmNvbS9zdmdqcyI+PGRlZnMgaWQ9IlN2Z2pzRGVmczEwMzgiPjwvZGVmcz48ZyBpZD0iU3ZnanNHMTAzOSI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSIyODgiIGhlaWdodD0iMjg4Ij48cGF0aCBmaWxsPSIjZmVhZjM4IiBkPSJNMjk2LjY3IDM5OS4yNEgyMTUuMzNhMTIuNjYgMTIuNjYgMCAwMDAgMjUuMzFoODEuMzRhMTIuNjYgMTIuNjYgMCAxMDAtMjUuMzF6TTIxNiAzMDEuOTFhMzkuNzUgMzkuNzUgMCAwMDY2LjggMzQuOTRsNzQuNyAzOS4wOWExMi42NiAxMi42NiAwIDAwMTEuNzMtMjIuNDNsLTc0LjcxLTM5LjA5YTM5Ljc1IDM5Ljc1IDAgMDAtNjYuNzgtMzQuOTNsLTE3LjU3LTkuMmExMi42NiAxMi42NiAwIDEwLTExLjc0IDIyLjQzeiIgY2xhc3M9ImNvbG9yZjU2YzFkIHN2Z1NoYXBlIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZlYWYzOCIgZD0iTTI1Niw4Ny40NWMtMTE5LjEsMC0yMTYsOTYuODktMjE2LDIxNmEyMTUuODMsMjE1LjgzLDAsMCwwLDI4Ljk0LDEwOCwxMi42NiwxMi42NiwwLDAsMCwxNy4yOCw0LjYybDM1LjIzLTIwLjMzYTEyLjY2LDEyLjY2LDAsMCwwLTEyLjY2LTIxLjkzbC0yMy45LDEzLjgxQTE5MC41MiwxOTAuNTIsMCwwLDEsNjUuNzUsMzE2LjFIOTMuMzJhMTIuNjYsMTIuNjYsMCwxLDAsMC0yNS4zMUg2NS43NGExODkuMTksMTg5LjE5LDAsMCwxLDE5LjE4LTcxLjVsMjMuODcsMTMuNzhhMTIuNjYsMTIuNjYsMCwxLDAsMTIuNjYtMjEuOTJMOTcuNjEsMTk3LjM4YTE5Mi4zNCwxOTIuMzQsMCwwLDEsNTIuMzMtNTIuMzNsMTMuNzYsMjMuODRhMTIuNjUsMTIuNjUsMCwwLDAsMjEuOTItMTIuNjVsLTEzLjc4LTIzLjg3YTE4OS4yNCwxODkuMjQsMCwwLDEsNzEuNS0xOS4xOHYyNy41OGExMi42NiwxMi42NiwwLDAsMCwyNS4zMiwwVjExMy4xOWExODkuMjQsMTg5LjI0LDAsMCwxLDcxLjUsMTkuMThsLTEzLjc4LDIzLjg3YTEyLjY1LDEyLjY1LDAsMCwwLDIxLjkyLDEyLjY1bDEzLjc2LTIzLjg0YTE5Mi4zNCwxOTIuMzQsMCwwLDEsNTIuMzMsNTIuMzNsLTIzLjg0LDEzLjc3YTEyLjY2LDEyLjY2LDAsMCwwLDEyLjY2LDIxLjkybDIzLjg3LTEzLjc4YTE4OS4xOSwxODkuMTksMCwwLDEsMTkuMTgsNzEuNUg0MTguNjdhMTIuNjYsMTIuNjYsMCwwLDAsMCwyNS4zMWgyNy41OGExOTAuNDcsMTkwLjQ3LDAsMCwxLTE5LjE0LDcxLjUybC0yMy45LTEzLjhhMTIuNjYsMTIuNjYsMCwwLDAtMTIuNjYsMjEuOTJsMzUuMjMsMjAuMzRhMTIuNjYsMTIuNjYsMCwwLDAsMTcuMjgtNC42MiwyMTUuODMsMjE1LjgzLDAsMCwwLDI4Ljk0LTEwOGMwLTExOS4xMS05Ni45LTIxNi0yMTYtMjE2WiIgY2xhc3M9ImNvbG9yZjU2YzFkIHN2Z1NoYXBlIj48L3BhdGg+PC9zdmc+PC9nPjwvc3ZnPg==' alt='' className='choose-content-img'/>
                        </div>
                        <p style={{color:'white'}} className='choose-content-paragraph'>Unlimited Mileage For<br/> Complete Freedom</p>
                     </div>
                    </Col>
                    <Col lg={5} sm={24} xs={24}>
                     <div className='choose-contentsix'>
                        <div>
                            <img src='data:image/svg+xml;base64,PHN2ZyBpZD0iU3ZnanNTdmcxMDQzIiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjI4OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmdqcz0iaHR0cDovL3N2Z2pzLmNvbS9zdmdqcyI+PGRlZnMgaWQ9IlN2Z2pzRGVmczEwNDQiPjwvZGVmcz48ZyBpZD0iU3ZnanNHMTA0NSI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSIyODgiIGhlaWdodD0iMjg4Ij48cGF0aCBmaWxsPSIjZmVhZjM4IiBkPSJNNDc3LjIxLDE2MC43N2wtNTYtNDhhOCw4LDAsMCwwLTUuMTgtMS45M0gyNDEuMzNBNDQuMTQsNDQuMTQsMCwwLDAsMjIwLDExNi4zOGwtNjIuNTksMzQuNzdMNTQuNzgsMTY2Ljk0YTgsOCwwLDAsMC01LjQ0LDMuNDZsLTE2LDI0QTguMDcsOC4wNywwLDAsMCwzMiwxOTguODR2NDBhOCw4LDAsMCwwLDUuNDcsNy41OWw0NC43OCwxNC45M2E0OCw0OCwwLDAsMCw5MSwxLjQ4aDE4MS41YTQ4LDQ4LDAsMCwwLDkwLjUsMEg0NTZhOCw4LDAsMCwwLDcuNDMtNWwxNi00MGE3LjkyLDcuOTIsMCwwLDAsLjU3LTN2LTQ4QTgsOCwwLDAsMCw0NzcuMjEsMTYwLjc3Wk00NTYsMjA2Ljg0YTgsOCwwLDAsMSwwLTE2aDh2MTZabS0xNjgsNDB2LTgwaDY0djI5LjQ0bC0zNi4xMiw1MC41NlptMC05NnYtMjRIMzk5LjM2bC0xOS4yMSwyNFptLTYwLjI3LTIwLjQ3YTI4LjEzLDI4LjEzLDAsMCwxLDEzLjYtMy41M0gyNzJ2MjRIMTkwLjg3Wk03OCwxNzkuNTVsLTEsMy4wOWExMiwxMiwwLDAsMS0xMS4zOSw4LjJINTVsNS43NS04LjYzWk00OCwyMzAuODRIODIuNzVhNDgsNDgsMCwwLDAtMi42NCwxMi45NEw0OCwyMzMuMDhabTgwLDQ4YTMyLDMyLDAsMSwxLDMyLTMyQTMyLDMyLDAsMCwxLDEyOCwyNzguODRabTAtODBhNDcuOTEsNDcuOTEsMCwwLDAtMzUuNzQsMTZINDh2LThINjUuNThBMjgsMjgsMCwwLDAsOTIuMTUsMTg3LjdsMy40NC0xMC4zM2E0Ljk0LDQuOTQsMCwwLDAsLjE1LS41NWw2NC44Ny0xMEgyNzJ2ODBIMTc2QTQ4LjA2LDQ4LjA2LDAsMCwwLDEyOCwxOTguODRabTIyNCw0OEgzMzUuNTVsMzEtNDMuMzVhOCw4LDAsMCwwLDEuNDktNC42NXYtMzJoMTZhOCw4LDAsMCwwLDYuMjUtM2wyNi44My0zMy41NEw0NjQsMTcwLjUydjQuMzJoLThhMjQsMjQsMCwwLDAtMjQsMjQsMjMuNzYsMjMuNzYsMCwwLDAsMS4zOCw4aC02Ljg5YTQ4LDQ4LDAsMCwwLTc0LjQ5LDQwWm00OCwzMmEzMiwzMiwwLDEsMSwzMi0zMkEzMiwzMiwwLDAsMSw0MDAsMjc4Ljg0Wm01MC41OC0zMkg0NDhhNDcuNjIsNDcuNjIsMCwwLDAtNi40Ni0yNGgxOC42NFoiIGNsYXNzPSJjb2xvcmY1NmMxZCBzdmdTaGFwZSI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZWFmMzgiIGQ9Ik00MDAgMjIyLjg0YTI0IDI0IDAgMTAyNCAyNEEyNCAyNCAwIDAwNDAwIDIyMi44NHptMCAzMmE4IDggMCAxMTgtOEE4IDggMCAwMTQwMCAyNTQuODR6TTEyOCAyMjIuODRhMjQgMjQgMCAxMDI0IDI0QTI0IDI0IDAgMDAxMjggMjIyLjg0em0wIDMyYTggOCAwIDExOC04QTggOCAwIDAxMTI4IDI1NC44NHpNMzI4IDE4Mi44NEgzMTJhOCA4IDAgMDAwIDE2aDE2YTggOCAwIDAwMC0xNnpNMjQ4IDE4Mi44NEgyMzJhOCA4IDAgMDAwIDE2aDE2YTggOCAwIDAwMC0xNnpNMjkyLjQ0IDMzNC40MWwtMTktLjQ3TDI2Ny4xMSAzMTZhMTEuODYgMTEuODYgMCAwMC0xMS4zMS04aDBhMTEuODcgMTEuODcgMCAwMC0xMS4zMiA4bC02LjMyIDE3LjkzLTE5IC40N2ExMiAxMiAwIDAwLTcgMjEuNTNsMTUuMSAxMS41NS01LjQzIDE4LjIyQTEyIDEyIDAgMDAyNDAuMTQgMzk5bDE1LjY1LTEwLjhMMjcxLjQ0IDM5OWExMiAxMiAwIDAwMTguMzEtMTMuM2wtNS40My0xOC4yMiAxNS4xLTExLjU1YTEyIDEyIDAgMDAtNy0yMS41M3ptLTIwIDIyYTEyLjA3IDEyLjA3IDAgMDAtNC4yMSAxM2wzIDEwLTguNTctNS45MWExMi4wNyAxMi4wNyAwIDAwLTEzLjYzIDBsLTguNTcgNS45MSAzLTEwYTEyLjA2IDEyLjA2IDAgMDAtNC4yMS0xMi45NWwtOC4yNy02LjMzIDEwLjQxLS4yNWExMi4wOCAxMi4wOCAwIDAwMTEtOEwyNTUuOCAzMzJsMy40NiA5LjgzYTEyLjA4IDEyLjA4IDAgMDAxMSA4bDEwLjQyLjI2ek00MDQuMjkgMzM0LjQxbC0xOS0uNDdMMzc5IDMxNmExMiAxMiAwIDAwLTIyLjYzIDBMMzUwIDMzMy45NGwtMTkgLjQ3YTEyIDEyIDAgMDAtNyAyMS41M2wxNS4xIDExLjU1LTUuNDMgMTguMjJBMTIgMTIgMCAwMDM1MiAzOTlsMTUuNjUtMTAuNzlMMzgzLjMgMzk5YTEyIDEyIDAgMDAxOC4zMS0xMy4zbC01LjQzLTE4LjIyIDE1LjEtMTEuNTVhMTIgMTIgMCAwMC03LTIxLjUzem0tMjAgMjJhMTIuMDcgMTIuMDcgMCAwMC00LjIxIDEzbDMgMTAtOC41Ny01LjkxYTEyLjA3IDEyLjA3IDAgMDAtMTMuNjMgMGwtOC41NyA1LjkxIDMtMTBhMTIuMDYgMTIuMDYgMCAwMC00LjIxLTEzbC04LjI3LTYuMzMgMTAuNDEtLjI1YTEyLjA4IDEyLjA4IDAgMDAxMS04bDMuNDctOS44MyAzLjQ2IDkuODNhMTIuMDkgMTIuMDkgMCAwMDExIDhsMTAuNDEuMjV6TTE4MSAzMzQuNDFsLTE5LS40N0wxNTUuNjggMzE2YTEyIDEyIDAgMDAtMjIuNjMgMGwtNi4zMyAxNy45My0xOSAuNDdhMTIgMTIgMCAwMC03IDIxLjUzbDE1LjEgMTEuNTUtNS40MyAxOC4yMkExMiAxMiAwIDAwMTI4LjcgMzk5bDE1LjY1LTEwLjhMMTYwIDM5OWExMiAxMiAwIDAwMTguMzEtMTMuM2wtNS40My0xOC4yMkwxODggMzU1Ljk0YTEyIDEyIDAgMDAtNy0yMS41M3ptLTIwIDIyYTEyLjA3IDEyLjA3IDAgMDAtNC4yMSAxM2wzIDEwLTguNTgtNS45MWExMi4wNiAxMi4wNiAwIDAwLTEzLjYyIDBMMTI5IDM3OS4zOWwzLTEwYTEyLjA1IDEyLjA1IDAgMDAtNC4yLTEzbC04LjI4LTYuMzMgMTAuNDItLjI1YTEyLjA5IDEyLjA5IDAgMDAxMS04bDMuNDYtOS44MyAzLjQ2IDkuODNhMTIuMDkgMTIuMDkgMCAwMDExIDhsMTAuNDIuMjV6IiBjbGFzcz0iY29sb3JmNTZjMWQgc3ZnU2hhcGUiPjwvcGF0aD48L3N2Zz48L2c+PC9zdmc+' alt='' className='choose-content-img'/>
                        </div>
                        <p style={{color:'white'}} className='choose-content-paragraph'>Trusted Positive Reviews<br/> By Our Customers</p>
                     </div>
                    </Col>
                    <Col lg={5} sm={24} xs={24}>
                     <div className='choose-contentseven'>
                        <div>
                            <img src='data:image/svg+xml;base64,PHN2ZyBpZD0iU3ZnanNTdmcxMDQ5IiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjI4OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmdqcz0iaHR0cDovL3N2Z2pzLmNvbS9zdmdqcyI+PGRlZnMgaWQ9IlN2Z2pzRGVmczEwNTAiPjwvZGVmcz48ZyBpZD0iU3ZnanNHMTA1MSI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSIyODgiIGhlaWdodD0iMjg4Ij48cGF0aCBmaWxsPSIjZmVhZjM4IiBkPSJNNDcyLDE2OEg0NDhWODhhOCw4LDAsMCwwLTgtOCw4LjExLDguMTEsMCwwLDAtMS44NC4yMUwxNTUuNywxNDcuMTFhMzUuODgsMzUuODgsMCwwLDAtMjcuNywzNVYyNDhINjRhNDgsNDgsMCwwLDAtNDgsNDcuOTRWNDAwYTgsOCwwLDAsMCw4LDhINTdhMzIsMzIsMCwwLDAsNjIsMEgyODlhMzIsMzIsMCwwLDAsNjIsMGg3M2E4LDgsMCwwLDAsOC04VjM2OGE4LDgsMCwwLDAtOC04SDI0NS40MmwtMTQtMzVhOCw4LDAsMCwwLTcuNDMtNUgxOTJWMjA1Ljg4bDIwOC02NVYxNjhIMzYwYTI0LDI0LDAsMCwwLTI0LDIzLjE0TDMyMS42NSwyNjcuOGwtMTAuMDcsMS42MUEyNy44OCwyNy44OCwwLDAsMCwyODgsMjk3LjA2VjMyMGE4LDgsMCwwLDAsOCw4aDE3LjM4YTI0LDI0LDAsMCwwLDQ1LjI0LDBoOTAuNzZBMjQsMjQsMCwwLDAsNDk2LDMyMFYxOTJBMjQsMjQsMCwwLDAsNDcyLDE2OFpNMzIsMjk2YTMyLDMyLDAsMCwxLDMyLTMySDgwdjQ1LjE5TDUyLjE1LDM0NEgzMlpNODgsNDE2YTE2LDE2LDAsMSwxLDE2LTE2QTE2LDE2LDAsMCwxLDg4LDQxNlptNDAtMjRoLTlhMzIsMzIsMCwwLDAtNjIsMEgzMlYzNjBINTZhOCw4LDAsMCwwLDYuMjUtM2wzMi00MEE4LDgsMCwwLDAsOTYsMzEyVjI2NGgzMlptMTg1LjM2LTgwSDMwNFYyOTcuMDZhMTEuOTQsMTEuOTQsMCwwLDEsMTAuMTEtMTEuODVsNC40MS0uN1pNMTc2LDM5MkgxNDRWMjA4aDMyWm0yNDAtMTZ2MTZIMzUxYTMyLDMyLDAsMCwwLTkuODYtMTZabS05Niw4YTE2LDE2LDAsMSwxLTE2LDE2QTE2LDE2LDAsMCwxLDMyMCwzODRabS0yMS4xMy04QTMyLDMyLDAsMCwwLDI4OSwzOTJIMTkyVjM3NlptLTgwLjI5LTQwLDkuNiwyNEgxOTJWMzM2Wm0tMzUuOC0xNDRIMTQ0di05Ljg2YTE5LjkyLDE5LjkyLDAsMCwxLDE1LjM5LTE5LjQ2TDQzMiw5OC4xMnYxNlpNNDE2LDEzNS44OGwxNi01VjE2OEg0MTZWMTM2YS40OS40OSwwLDAsMCwwLS4xMlpNMzM2LDMyOGE4LDgsMCwwLDEtOC03LjQxbC43NS00QTgsOCwwLDEsMSwzMzYsMzI4Wm03Mi0xNkgzNTguNjJhMjQsMjQsMCwwLDAtMjYtMTUuNzVsMi43LTE0LjQyTDM0Ni43MiwyODBINDA4Wm0wLTQ4SDM2MGw5LTEyYTEwLjA1LDEwLjA1LDAsMCwxLDgtNGgzMVptNjQsNjRhOCw4LDAsMSwxLDgtOEE4LDgsMCwwLDEsNDcyLDMyOFptOC0zMC42MkEyNCwyNCwwLDAsMCw0NDkuMzgsMzEydjBINDI0VjI4MGg1NlpNNDI0LDI2NFYyNDhoMjQuNTRhMTAsMTAsMCwwLDEsNy4wOCwyLjkzTDQ2OC42OSwyNjRabTU2LTExLjMxLTEzLjA3LTEzLjA3QTI1LjgyLDI1LjgyLDAsMCwwLDQ0OC41NCwyMzJIMzc3YTI2LjEyLDI2LjEyLDAsMCwwLTIwLjgsMTAuNEwzMzkuMjYsMjY1bC0uODMuMTMsOS43OS01Mi4yMkEyMy45NCwyMy45NCwwLDAsMCwzNjAsMjE2SDQ3MmEyMy43LDIzLjcsMCwwLDAsOC0xLjM4Wk00NzIsMjAwSDM2MGE4LDgsMCwwLDEsMC0xNkg0NzJhOCw4LDAsMCwxLDAsMTZaIiBjbGFzcz0iY29sb3JmNTZjMWQgc3ZnU2hhcGUiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmVhZjM4IiBkPSJNODAsMzUyYTgsOCwwLDAsMCw4LDhoMTZhOCw4LDAsMCwwLDAtMTZIODhBOCw4LDAsMCwwLDgwLDM1MloiIGNsYXNzPSJjb2xvcmY1NmMxZCBzdmdTaGFwZSI+PC9wYXRoPjwvc3ZnPjwvZz48L3N2Zz4=' alt='' className='choose-content-img'/>
                        </div>
                        <p style={{color:'white'}} className='choose-content-paragraph'>24/7 Customer Support<br/> And Assistance</p>
                     </div>
                    </Col>
                    <Col lg={5} sm={24} xs={24}>
                     <div className='choose-contenteight'>
                        <div>
                            <img src='data:image/svg+xml;base64,PHN2ZyBpZD0iU3ZnanNTdmcxMDU1IiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjI4OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmdqcz0iaHR0cDovL3N2Z2pzLmNvbS9zdmdqcyI+PGRlZnMgaWQ9IlN2Z2pzRGVmczEwNTYiPjwvZGVmcz48ZyBpZD0iU3ZnanNHMTA1NyI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSIyODgiIGhlaWdodD0iMjg4Ij48cGF0aCBmaWxsPSIjZmVhZjM4IiBkPSJNMzg0LjgyLDQxMmMtMi45MSw0MC41Ni04LjU1LDQ2LjItNDMuODUsNDYuMy00Mi44LjEyLTQ3Ljc4LTQuMTEtNTEuMzctNDguNTUtNy42MiwzLjc4LTE3LjM0LDUuMzItMTkuNTEsMTAuMjItMTEuMzIsMjUuNDctMjkuNiwzOS40NC01Ny41MywzNy43OS0yNy4xNS0xLjU5LTQzLjItMTgtNTEuMjEtNDUuNzUtMzQuNDYsMC02OC45LjE0LTEwMy4zMy0uMDYtMTQuODItLjA5LTE0LjgyLS40MS0xNS41OC0xNy42NGgxMTVjOC44Mi0xMywxNC4zNi0yNS41NSwyMy42Ny0zNCwyNi43Ni0yNC4xNCw2Ny43OC0xNC4xNSw4Ni4yOCwxOC43OCwzLjg2LDYuODYsMTEuNSwxMS41OSwxNy40LDE3LjMxbDYuMjUtNGMwLTI1LjI1LjY3LTUwLjUyLS4yOC03NS43My0uNDctMTIuNjEtOS4zOC0yMi45Mi0yMS4yNC0xNC45MS0yNC4yNywxNi4zOC0yNC43OCwyLTI1LjQ3LTE2LjA3LS4xNi00LjI3LTIuNzYtOC40Ni01LjQ2LTE2LjE1LTEwLDUuMTMtMTkuNzUsOC0yNi42LDE0LjExLTEyLjIxLDEwLjktMjAuMTYsNy42LTI3LjU5LTQuNTctLjQtLjY2LTEtMS4yMS0xLjMyLTEuODktMjQuNzktNTEtNjUuNDItNjguNjktMTIwLjU2LTYwLjA5LTE4Ljk0LDMtMTkuMzUuMzUtMjAtMTUuNDRDMTA3LjY5LDE5Mi4xNCwxNjksMTkyLDE5NS42NiwyNjguMjFjNDYuOS0yMi4yMSw1My44Mi0yMC42Miw2OC4yNSwxMS4yN2wzNS45Myw2LjI1YzExLjU3LTI5LjU3LDI1LjE1LTYwLjQ2LDM1LjY5LTkyLjM3LDktMjcuMTUsMjYuODUtNDMsNTMuMzEtNDksMjAuOTItNC43NSw0Mi40Mi03LjQzLDYzLjgyLTkuMTksNS4xMi0uNDIsMTAuODQsNi40NywxNi4yOCwxMGwtMy4zNSw2LjExYy0xNy40NSwyLTM1LDMuNDItNTIuMzQsNi4xNC0yOS43MSw0LjY3LTU0LjY5LDE1LjU3LTYyLjc5LDQ4Ljg3LTIuODksMTEuODctOSwyMi45My0xMi44LDM0LjYyLTcuNzQsMjMuNjgtMywzMS4yNCwyMi4xNSwzMS44NywzNC42MS44Nyw2OS4yNS4yMiwxMDkuNzUuMjItNC40NCw4LjIxLTcuMTgsMTcuNzYtMTAsMTcuNzgtNDUsLjMyLTkwLS41OC0xNDAuOTUtMS4yOC0xNi41NSwyNC44Ni03LjU0LDYwLjg4LTcuNjksOTUuMzUsMCwyLjg1LDExLjcxLDguMTUsMTguMDUsOC4yNSw0NC42OS43Miw4OS4zOS4zOCwxMzQuNzguMzgsNS42MSwxMS45MSw1LjMsMTguOTMtMTAuMzcsMTguNjJDNDMxLjEzLDQxMS42OCw0MDguODUsNDEyLDM4NC44Miw0MTJabS0xMzAuOS04LjM4Yy41MS0yMC4wNy0xNS4zMi0zNi44LTM1LjcyLTM3LjcyLTIwLjg5LTEtMzYuOTEsMTMuNzItMzgsMzQuODEtMS4xMywyMi4xMSwxNC41LDM4LjksMzYuMiwzOC45QTM3LjExLDM3LjExLDAsMCwwLDI1My45Miw0MDMuNjNabTUyLjQ3LDkuMTRjNC4yNiwxMC42Miw2LjIxLDI0LDEwLjYsMjQuODVBMTA5LjM1LDEwOS4zNSwwLDAsMCwzNTkuNiw0MzdjMy42OS0uNzgsNC41OC0xNC43Niw3LjE4LTI0LjJaIiBjbGFzcz0iY29sb3JmNTZjMWQgc3ZnU2hhcGUiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmVhZjM4IiBkPSJNMjEwLjIzIDkxLjFsMTMtMjIuNDNjNC43NiAyLjM1IDkuMjYgMy4wOSAxMS4wOSA1LjdDMjQ4LjkxIDk1LjE4IDI2Ny44NCA5Ny42MiAyOTAuNDcgOTBjNC43OC0xLjYgMTEuMTcgMS41OSAxNi44MiAyLjU3LTIuMjIgNS44LTMgMTMtNyAxNy4xLTcuMzUgNy42OC0xNi41NSAxMy41OC0yOC44OCAyMy4zIDE1LjA4IDEzLjU5IDI2LjQxIDIyLjY5IDM2LjI1IDMzLjE4IDQuNTMgNC44MyA2LjE0IDEyLjQxIDkuMDcgMTguNzQtNy4xMiAxLjA2LTE0LjM1IDMuNDMtMjEuMzUgMi45LTE0LjQyLTEuMDgtMjguNzMtMy43Mi00NC4xNi01Ljg2LTUuMTUgMTIuMDYtOS40MSAyMy41Mi0xNSAzNC4zMS0yLjEgNC4wOC02LjggOC4wNy0xMS4xIDkuMjQtMiAuNTYtNi40Ny01LjI3LTguNzctOC44N2E0Mi4yNSA0Mi4yNSAwIDAxLTUuMjgtMTIuNzNjLTQuMzctMTguMzMtMTQuNjctMjYuNDEtMzQuMzEtMjMuNzktNy4zNSAxLTE1LjQzLTMuNDgtMjMuMTgtNS40NiAzLTYuNyA0LjMyLTE1IDkuMTgtMTkuOCAxNS0xNC43NyAxMy45NC0yOCAxLjQzLTQzLjg4LTkuOTUtMTIuNi0xOC0yNi44Ny0yNS42MS00MS4wNi0yLjMxLTQuMjgtLjU3LTEwLjc2LS42OC0xNi4yMyA0LjkuNTggMTAuNjYtLjMgMTQuNTcgMkMxNzEuOCA2Ni44NyAxOTAuNTcgNzguOTEgMjEwLjIzIDkxLjF6bTY4LjE1IDc1LjQyQzI1NC44MyAxMzIgMjU0LjgzIDEzMiAyNjMgMTE4LjY5TDIzMC43OSAxMDAuNGMtMTcuNjMgMzUuMzYtMzIuNzgtNi4xLTUyLjIyLS44MyAxMi42NCAxOS4zOSAzMS45NCAzOC44OSAyLjUzIDYyLjMxIDI1LjY3LTUuNjYgMzcuNjYgNi4zMiA0OC4xMyAzMi4xN0MyMzMuMTYgMTUwLjMxIDI1OC41MyAxNjUuNzYgMjc4LjM4IDE2Ni41MnpNMzYxLjMyIDMwMC45NGM4LjA5IDAgMTAuNC4xMSAxMi43MSAwIDE5LjE4LTEgMzcuODMgMy40MiA0Mi40NyAyMy40MiAyLjggMTIuMTItLjY1IDI5LjYxLTguMiAzOS4zMy0xMyAxNi43My0zMi43OCAxMy4xOS01MC44MSA1LjExYTYyLjcyIDYyLjcyIDAgMDEtNi4xMS0zLjI1Yy0xNi41OS05Ljc1LTM2LjgyLTE4LjM2LTMxLjI4LTQyLjZDMzI1Ljg3IDI5Ny42NyAzNDcuNzggMzAwLjY0IDM2MS4zMiAzMDAuOTR6bTguOTIgMTQuNTlsLTIgMy45M2MtMy44NSAwLTcuOS0uNzctMTEuNTIuMTctNi4yMSAxLjYtMTIuMTYgNC4yNi0xOC4yMSA2LjQ3IDQgNS44NCA3LjggMTEuOTIgMTIuMjcgMTcuNDFhMTMuNTUgMTMuNTUgMCAwMDcuODkgNC41NWMxMi4xMSAxLjYyIDI0LjM4IDMuNzEgMzYuNDEgMi44OCAyLjI2LS4xNiA3LjE2LTE3LjA3IDQuOC0xOS4wNUMzOTEuMzkgMzI0Ljc3IDM4MC4zMyAzMjAuNzMgMzcwLjI0IDMxNS41M3oiIGNsYXNzPSJjb2xvcmY1NmMxZCBzdmdTaGFwZSI+PC9wYXRoPjwvc3ZnPjwvZz48L3N2Zz4=' alt='' className='choose-content-img'/>
                        </div>
                        <p style={{color:'white'}} className='choose-content-paragraph'>Reliable Vehicle Accessories<br/> For Customers</p>
                     </div>
                    </Col>
                </Row>
            </div>
            <br/>
            <br/>
            <br/>
            <RequestForm/>
            <Chat/>
        </DefaultLayout>
    )
}

export default ContactUs