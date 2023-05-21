import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAdminReports,updateReportStatus } from '../redux/actions/reportActions';
import moment from 'moment';
import { Row, Col,Select, DatePicker } from 'antd';
import Spinner from '../components/Spinner';
import AdminDefaultLayout from '../components/AdminDefaultLayout';
const { Option } = Select;

function AdminReportList() {
  const dispatch = useDispatch();
  const {reports} = useSelector(state => state.reportsReducer);
  const {loading} = useSelector((state)=> state.alertsReducer);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');


  const handleChangeStatusFilter = (value) => {
    setFilterStatus(value);
  };
 
  const handleChangeDateFilter = (date) => {
    setFilterDate(date);
  };

  const handleChange = (reportId, value) => {
    dispatch(updateReportStatus(reportId, value));
  };

  useEffect(() => {
    dispatch(getAllAdminReports());
  }, []);

  const filteredReports = reports
  .filter((report) => filterStatus ? report.status === filterStatus : true)
  .filter((report) => filterDate ? moment(report.accidentDate).isSame(filterDate, 'day') : true);
  

  return (
    <AdminDefaultLayout>

{loading && (<Spinner/>)}
    <br/>
    <h3 className='text-center' style={{color:'rgb(254, 175, 56)'}}>All Incident Reports</h3>
    <Row justify='center' gutter={16} style={{marginTop:'32px'}}>
    <Col lg={12} sm={24}>
    <div>
            <label className='text-center' style={{ color: 'rgb(254, 175, 56)' }}>Filter by Status:</label>
            <Select
              style={{ width: 150, marginLeft: '12px' }}
              onChange={handleChangeStatusFilter}
              value={filterStatus}
            >
              <Option value=''>All</Option>
              <Option value='orderplaced'>Report Received</Option>
              <Option value='orderconfirmed'>Under Review</Option>
              <Option value='outfordelivery'>Action Taken</Option>
              <Option value='complete'>Closed</Option>
            </Select>
            <label className='text-center' style={{ color: 'rgb(254, 175, 56)' ,marginLeft:'12px'}}>Filter by Date: </label>
            <DatePicker onChange={handleChangeDateFilter} style={{marginLeft:'12px'}}/>
            <label className='text-center' style={{ color: 'rgb(254, 175, 56)',marginLeft:'12px' }}>Sort by:</label>
            <Select
              defaultValue='desc'
              style={{ width: 120, marginLeft: '12px' }}
              onChange={(value) => setSortOrder(value)}
            >
              <Option value='desc'>Latest first</Option>
              <Option value='asc'>Oldest first</Option>
            </Select>
          </div>
      {filteredReports.sort((a, b) =>
        sortOrder === 'desc'
          ? moment(b.createdAt).diff(a.createdAt)
          : moment(a.createdAt).diff(b.createdAt)
      ).map((report) => {
        return <Row  gutter={16} className='bs1 mt-3 p-2 text-left'  style={{backgroundColor:'rgb(254, 175, 56)',borderRadius:5,height:'auto',width:'auto'}}>

        <Col lg={11} sm={24} className='userbookingscolone'>
            <p style={{marginLeft:'8px'}}>User: <b>{report.user.username}</b></p>
            <p style={{marginLeft:'8px'}}>Car: <b>{report.car.name}</b></p>
            <p style={{marginLeft:'8px'}}>Incident Cause: <b> <p style={{width:'695px'}}>{report.accidentCause}</p></b></p>
            <p style={{marginLeft:'8px'}}>Incident Location: <b>{report.accidentLocation}</b></p>
            <p style={{marginLeft:'8px'}}>Incident Date: <b>{moment(report.accidentDate).format('MMM DD YYYY')}</b></p>
            <p style={{marginLeft:'8px'}}>Incident Time: <b>{report.accidentTime}</b></p>
            <p style={{marginLeft:'8px'}}>Update Status: <Select
  value={report.status}
  style={{
    width: 172,
    textAlign:'center',
    marginLeft:'12px'
  }}
  className='adminselectbox'
  onChange={(value) => handleChange(report._id, value)}
  options={[    {      value: 'orderplaced',      label: 'Report Received',    },    {      value: 'orderconfirmed',      label: 'Under Review',    },    {      value: 'outfordelivery',      label: 'Action Taken',    },    {      value: 'complete',      label: 'Closed'    },  ]}
/></p>
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
    </AdminDefaultLayout>
  );
}

export default AdminReportList;
