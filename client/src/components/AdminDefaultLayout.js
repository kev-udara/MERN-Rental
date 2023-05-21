import { React,Component,useState } from 'react'
import { Button, Dropdown, Menu, Space ,Row,Col} from 'antd';
import { FaUser,FaPlus, FaMoneyBill, FaMoneyCheck, FaCarCrash, FaWpforms } from "react-icons/fa";
import {Link} from 'react-router-dom';

import {FaCar,FaTools} from "react-icons/fa";


function AdminDefaultLayout(props){

  const [selectedPage, setSelectedPage] = useState('Cars');

  const user = JSON.parse(localStorage.getItem('admin'))
  const menu = (
    <Menu style={{backgroundColor:'rgb(254, 175, 56)'}}>
      <Menu.Item onClick={()=>{
        localStorage.removeItem('admin');
        window.location.href='/login'
      }}>
        <li>Logout</li>
      </Menu.Item>
    </Menu>
  )
  
    return(
        <div>
          <div className='admin-header bs1'>
              <div className='d-flex justify-content-between'>
              <a href='/admin' style={{color:'rgb(254, 175, 56)'}} className='image-logo' >
              <h1 className='logo'>EZ-Auto</h1>
              </a>
              <a href='/admin' style={{color:'rgb(254, 175, 56)'}} onClick={() => setSelectedPage('Cars')} >
              <h1 className={`admincarheading ${selectedPage === 'Cars' ? 'selected-page' : ''}`}>Cars <FaCar style={{marginBottom:'2px',marginLeft:'3px'}}/>
              </h1>
              </a>
              <a href='/adminaccessory' style={{color:'rgb(254, 175, 56)' }} onClick={() => setSelectedPage('Accessories')}>
              <h1 className={`adminaccessoriesheading ${selectedPage === 'Accessories' ? 'selected-page' : ''}`}>Accessories <FaTools style={{marginBottom:'2px',marginLeft:'3px',width:'10px'}}/>
              </h1>
              </a>
              <a href='/payments' style={{color:'rgb(254, 175, 56)'}}onClick={() => setSelectedPage('Payments')}>
              <h1 className={`adminpaymentsheading ${selectedPage === 'Payments' ? 'selected-page' : ''}`}>Payment History <FaMoneyCheck style={{marginBottom:'2px',marginLeft:'3px',width:'10px'}}/>
              </h1>
              </a>
              <a href='/adminreports' style={{color:'rgb(254, 175, 56)'}}onClick={() => setSelectedPage('Reports')}>
              <h1 className={`adminreportsheading ${selectedPage === 'Reports' ? 'selected-page' : ''}`}>Incident Reports <FaCarCrash style={{marginBottom:'2px',marginLeft:'3px',width:'10px'}}/>
              </h1>
              </a>
              <a href='/adminrequests' style={{color:'rgb(254, 175, 56)'}}onClick={() => setSelectedPage('Reports')}>
              <h1 className={`adminrequestsheading ${selectedPage === 'Reports' ? 'selected-page' : ''}`}>Customer Requests <FaWpforms style={{marginBottom:'2px',marginLeft:'3px',width:'10px'}}/>
              </h1>
              </a>
              <Dropdown overlay={menu} placement="bottomCenter">
              
                <Button className='admin-headerbtn'><FaUser style={{marginBottom:'3px',marginRight:'4px'}}/><b style={{marginBottom:'65px'}}>{user.username}</b></Button>
              </Dropdown>
              
            </div>
          
          </div>
          <div className='content'>
            
          {props.children}

          
          </div>
          
        </div>
        
    )
}

export default AdminDefaultLayout