import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAdminRequests } from '../redux/actions/requestActions';
import moment from 'moment';
import { Row, Col, Select, DatePicker,notification } from 'antd';
import Spinner from '../components/Spinner';
import AdminDefaultLayout from '../components/AdminDefaultLayout';
import axios from 'axios';


const { Option } = Select;

function AdminRequestList() {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requestsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [filterQuestionType, setFilterQuestionType] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [responseText, setResponseText] = useState('');

const [responseTextMap, setResponseTextMap] = useState({});

  const formatQuestionType = (questionType) => {
    switch (questionType) {
      case 'thankyou':
        return 'Thank You';
      case 'suggestion':
        return 'Suggestion';
      case 'question':
        return 'Question';
      case 'complaint':
        return 'Complaint';
      default:
        return '';
    }
  };
  
  const formatTopic = (topic) => {
    switch (topic) {
      case 'general':
        return 'General';
      case 'vehicle':
        return 'Vehicle';
      case 'service':
        return 'Service';
      case 'website':
        return 'Website';
      case 'other':
        return 'Other';
      default:
        return '';
    }
  };
  

  useEffect(() => {
    dispatch(getAllAdminRequests());
  }, []);

  const handleChangeQuestionTypeFilter = (value) => {
    setFilterQuestionType(value);
  };

  const handleChangeTopicFilter = (value) => {
    setFilterTopic(value);
  };

  const handleSendResponse = async (requestId, email) => {
    try {
      notification.success({
        message: 'Success',
        description: 'Response was sent to the user email'
      });
  
      await axios.post('/api/requests/sendresponse', {
        requestId,
        
      responseText: responseTextMap[requestId] || ''
      });
      

      setResponseTextMap((prevState) => ({
        ...prevState,
        [requestId]: ''
      }));
      dispatch(getAllAdminRequests());
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Error',
        description: 'Failed to send the response'
      });
    }
  };

  const handleResponseTextChange = (event, requestId) => {
    const { value } = event.target;
  
    setResponseTextMap((prevState) => ({
      ...prevState,
      [requestId]: value
    }));
  };
  

  const filteredRequests = requests.filter((request) =>
    filterQuestionType ? request.questiontype === filterQuestionType : true
  ).filter((request) => filterTopic ? request.topic === filterTopic : true);

  return (
    <AdminDefaultLayout>
      {loading && <Spinner />}
      <br />
      <h3 className='text-center' style={{ color: 'rgb(254, 175, 56)' }}>Customer Requests List</h3>
      <Row justify='center' gutter={16} style={{ marginTop: '32px' }}>
        <Col lg={12} sm={24}>
          <div>
            <label className='text-center' style={{ color: 'rgb(254, 175, 56)' }}>Filter by Question Type:</label>
            <Select
              style={{ width: 150, marginLeft: '12px' }}
              onChange={handleChangeQuestionTypeFilter}
              value={filterQuestionType}
            >
              <Option value=''>All</Option>
              <Option value='thankyou'>Thank You</Option>
              <Option value='suggestion'>Suggestion</Option>
              <Option value='question'>Question</Option>
              <Option value='complaint'>Complaint</Option>
            </Select>
            <label className='text-center' style={{ color: 'rgb(254, 175, 56)', marginLeft: '12px' }}>Filter by Topic:</label>
            <Select
              style={{ width: 150, marginLeft: '12px' }}
              onChange={handleChangeTopicFilter}
              value={filterTopic}
            >
              <Option value=''>All</Option>
              <Option value='general'>General</Option>
              <Option value='vehicle'>Vehicle</Option>
              <Option value='service'>Service</Option>
              <Option value='website'>Website</Option>
              <Option value='other'>Other</Option>
            </Select>
          </div>
          {filteredRequests.map((request) => (
            <Row gutter={16} className='bs1 mt-3 p-2 text-left' style={{ backgroundColor: 'rgb(254, 175, 56)', borderRadius: 5, height: 'auto', width: 'auto' }}>
              <Col lg={11} sm={24} className='userbookingscolone'>
                <p style={{ marginLeft: '8px' }}>User: <b>{request.name}</b></p>
                <p style={{ marginLeft: '8px' }}>Comment: <p style={{textAlign:'start',display: 'inline-block',margin:'0',padding:'0' }}><b>{request.comment}</b></p></p>
                <p style={{ marginLeft: '8px' }}>Question Type: <b>{formatQuestionType(request.questiontype)}</b></p>
                <p style={{ marginLeft: '8px' }}>Topic: <b>{formatTopic(request.topic)}</b></p>
              </Col>
              <Col lg={11} sm={24} className='userbookingscolone'>
                <p style={{ marginLeft: '52px' }}><b>Respond to Customer Request</b></p>
                <textarea
    style={{ marginLeft: '52px', height: '195px', width: '300px', border: 'none', backgroundColor: 'rgb(220, 140, 16)', outline: 'none' }}
    value={responseTextMap[request._id] || ''}
    onChange={(event) => handleResponseTextChange(event, request._id)}
  />
                <button className='btn1' style={{marginLeft:'142px',marginTop:'10px'}} onClick={handleSendResponse.bind(null, request._id, request.email)}>Send Response</button>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

    </AdminDefaultLayout>
  );
}

export default AdminRequestList;

