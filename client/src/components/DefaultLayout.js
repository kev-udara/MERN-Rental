import { React,Component ,useState } from 'react'
import { Button, Dropdown, Menu, Space ,Row,Col} from 'antd';
import { FaUser,FaPlus,FaCar,FaTools,FaMoneyCheck, FaHome, FaBookmark, FaPhone, FaCarCrash } from "react-icons/fa";
import {Link} from 'react-router-dom';


function DefaultLayout(props){

  const [selectedPage, setSelectedPage] = useState('Home');
  const user = JSON.parse(localStorage.getItem('user'))
  const menu = (
    <Menu style={{backgroundColor:'rgb(254, 175, 56)'}}>
      <Menu.Item onClick={()=>{
        localStorage.removeItem('user');
        window.location.href='/login'
      }}>
        <li>Logout</li>
      </Menu.Item>
    </Menu>
  )
  const savedmenu =(
    <Menu style={{backgroundColor:'rgb(254, 175, 56)'}}>
    <Menu.Item>
      <a href='/userbookings'>
       Car Rentals
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href='/accessorybookings'>
       Accessory Rentals
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href='/userreportlist'>
      Submitted Reports
      </a>
    </Menu.Item>
  </Menu>
  )
  
    return(
        <div>
          <div className='header bs1'>
              <div className='d-flex justify-content-between'>
              <a href='/' style={{color:'rgb(254, 175, 56)'}} className='image-logo'>
              <h1 className='logo'>EZ-Auto</h1>
              </a>
              <a href='/' style={{color:'rgb(254, 175, 56)'}} onClick={() => setSelectedPage('Home')} >
              <h1 className={`adminhomeheading ${selectedPage === 'Home' ? 'selected-page' : ''}`}>Home <FaHome style={{marginBottom:'2px',marginLeft:'3px'}}/>
              </h1>
              </a>
              <a href='/fleet' style={{color:'rgb(254, 175, 56)' }} onClick={() => setSelectedPage('Fleet')}>
              <h1 className={`adminfleetheading ${selectedPage === 'Fleet' ? 'selected-page' : ''}`}>Our Fleet <FaCar style={{marginBottom:'2px',marginLeft:'3px',width:'10px'}}/>
              </h1>
              </a>
              <a href='/accessory' style={{color:'rgb(254, 175, 56)'}}onClick={() => setSelectedPage('Accessories')}>
              <h1 className={`adminouraccessoriesheading ${selectedPage === 'Accessories' ? 'selected-page' : ''}`}>Our Accessories <FaTools style={{marginBottom:'2px',marginLeft:'3px',width:'10px'}}/>
              </h1>
              </a>
              <a href='/report' style={{color:'rgb(254, 175, 56)'}}onClick={() => setSelectedPage('Bookings')}>
              <h1 className={`adminmybookingsheading ${selectedPage === 'Bookings' ? 'selected-page' : ''}`}>Report Incident <FaCarCrash style={{marginBottom:'2px',marginLeft:'3px',width:'10px'}}/>
              </h1>
              </a>
              <a href='/contactus' style={{color:'rgb(254, 175, 56)'}}onClick={() => setSelectedPage('Report')}>
              <h1 className={`adminreportheading ${selectedPage === 'Report' ? 'selected-page' : ''}`}>Contact Us <FaPhone style={{marginBottom:'2px',marginLeft:'3px',width:'10px'}}/>
              </h1>
              </a>
              <Dropdown overlay={menu} placement="bottomCenter">
                <Button className='headerbtn'><FaUser style={{marginBottom:'3px',marginRight:'4px'}}/><b style={{marginBottom:'65px'}}>{user.username}</b></Button>
              </Dropdown>
              <Dropdown overlay={savedmenu} placement="bottomLeft">
                <FaBookmark style={{marginBottom:'3px',marginRight:'4px'}} className='savedbtn'/>
              </Dropdown>
            </div>
          
          </div>
          <div className='content'>
            
          {props.children}

          
          </div>
          
        </div>
        
    )
}

export default DefaultLayout