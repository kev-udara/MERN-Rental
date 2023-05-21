import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReports } from '../redux/actions/reportActions';
import moment from 'moment';
import { Row, Col } from 'antd';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';

function UserReportList() {
  const dispatch = useDispatch();
  const {reports} = useSelector(state => state.reportsReducer);
  const {loading} = useSelector((state)=> state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllReports());
  }, []);
  

  return (
    <DefaultLayout>

{loading && (<Spinner/>)}
    <br/>
    <h3 className='text-center' style={{color:'rgb(254, 175, 56)'}}>Submitted Reports</h3>
    <Row justify='center' gutter={16}>
    <Col lg={12} sm={24}>
      {reports.filter(o=>o.user == user._id).map((report) => {
        return <Row  gutter={16} className='bs1 mt-3 p-2 text-left'  style={{backgroundColor:'rgb(254, 175, 56)',borderRadius:5}}>

        <Col lg={8} sm={24} className='userbookingscolone'>
            <p style={{marginLeft:'8px'}}>Car: <b>{report.car.name}</b></p>
            <p style={{marginLeft:'8px'}}>Incident Cause: <b><p style={{width:'695px'}}>{report.accidentCause}</p></b></p>
            <p style={{marginLeft:'8px'}}>Incident Location: <b>{report.accidentLocation}</b></p>
            <p style={{marginLeft:'8px'}}>Incident Date: <b>{moment(report.accidentDate).format('MMM DD YYYY')}</b></p>
            <p style={{marginLeft:'8px'}}>Incident Time: <b>{report.accidentTime}</b></p>
            <p style={{marginLeft:'8px'}}>Status: <b>{report.status === 'orderplaced' ? 'Report Received' : report.status === 'orderconfirmed' ? 'Under Review' : report.status === 'outfordelivery' ? 'Action Taken' : 'Closed'}</b></p>
        </Col>
        </Row>
      })}
      </Col>
    </Row>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    </DefaultLayout>
  );
}

export default UserReportList;
