import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from 'antd';
import DefaultLayout from '../components/DefaultLayout';
import moment from 'moment';
import { userSubmit } from '../redux/actions/reportActions';
import { useDispatch, useSelector } from 'react-redux';

const { RangePicker } = DatePicker;

const Report = () => {
  const dispatch = useDispatch();
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');
  const [accidentCause, setAccidentCause] = useState('');
  const [accidentDate, setAccidentDate] = useState('');
  const [accidentTime, setAccidentTime] = useState('');
  const [accidentLocation, setAccidentLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [accidentImage, setAccidentImage] = useState(null); // New state for the accident image

  const [showAccidentCauseTextarea, setShowAccidentCauseTextarea] = useState(false);

  useEffect(() => {
    // Fetch all cars from the API and set the state
    axios
      .get('/api/cars/getallcars')
      .then(res => setCars(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleCarChange = e => {
    setSelectedCar(e.target.value);
  };

  const handleCauseChange = e => {
    setAccidentCause(e.target.value);
  };

  const handleDateChange = e => {
    setAccidentDate(e.target.value);
  };

  const handleTimeChange = e => {
    setAccidentTime(e.target.value);
  };

  const handleLocationChange = e => {
    setAccidentLocation(e.target.value);
  };

  const handleLocationSelect = e => {
    const { lat, lng } = e.latlng;
    setAccidentLocation(`${lat}, ${lng}`);
  };

  const handleAccidentCauseClick = () => {
    setShowAccidentCauseTextarea(true);
  };

  const handleAccidentCauseBlur = () => {
    setShowAccidentCauseTextarea(false);
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      setAccidentImage(imageData);
    };
    reader.readAsDataURL(file);
  };
  

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      user: JSON.parse(localStorage.getItem('user'))._id,
      car: selectedCar,
      accidentCause,
      accidentDate,
      accidentTime,
      accidentLocation,
      accidentImage
    };
  
    dispatch(userSubmit(data));
  };
  

  return (
    <DefaultLayout>
      <h3 className="text-center" style={{ color: 'rgb(254, 175, 56)' }}>
        Report Incident
      </h3>
      <br />
      <form onSubmit={handleSubmit} style={{ marginTop: '-12px' }}>
        <div>
          <label htmlFor="car" style={{ color: 'rgb(254, 175, 56)' }}>
            Car:
          </label>
          <select
            id="car"
            value={selectedCar}
            onChange={handleCarChange}
            className="indicentreportcars"
          >
            <option value="">Select a car</option>
            {cars.map(car => (
              <option key={car._id} value={car._id}>
                {car.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cause" style={{ color: 'rgb(254, 175, 56)' }} className="accidentcauselabel">
            Accident Cause:
          </label>
          {showAccidentCauseTextarea ? (
            <textarea
              id="cause"
              value={accidentCause}
              onChange={handleCauseChange}
              onBlur={handleAccidentCauseBlur}
              className="accidentcauseinput"
            />
          ) : (
            <input
              type="text"
              id="cause"
              value={accidentCause}
              onClick={handleAccidentCauseClick}
              className="accidentcauseinput"
            />
          )}
        </div>
        <div>
          <label htmlFor="date" style={{ color: 'rgb(254, 175, 56)' }} className="accidentdatelabel">
            Accident Date:
          </label>
          <input
            type="date"
            id="date"
            value={accidentDate}
            onChange={handleDateChange}
            className="reportincidentdate"
          />
          <label htmlFor="time" style={{ color: 'rgb(254, 175, 56)' }} className="accidenttimelabel">
            Accident Time:
          </label>
          <input
            type="time"
            id="time"
            value={accidentTime}
            onChange={handleTimeChange}
            className="reportincidenttime"
          />
        </div>
        <div>
          <label htmlFor="location" style={{ color: 'rgb(254, 175, 56)', marginLeft: '358px' }} className="accidentlocationlabel">
            Accident Location:
          </label>
          <input
            type="text"
            id="location"
            onChange={handleLocationChange}
          />
          <label htmlFor="image" style={{ color: 'rgb(254, 175, 56)', marginLeft: '12px' }}>
  Accident Image:
</label>
<input type="file" id="image" accept="image/*" onChange={handleImageChange} style={{marginLeft:'12px'}}/>

          <br />
          <br />
          <label htmlFor="location" style={{ color: 'rgb(254, 175, 56)', marginLeft: '165px' }} className="accidentlocationlabel">
            You can also select your location from the map
          </label>
          <br />
          <Map onClick={handleLocationSelect} />
        </div>
        <br />
        <button type="submit" className="submitreportbtn">
          Submit Report
        </button>
      </form>
      <br />
      <br />
      <br />
    </DefaultLayout>
  );
};

export default Report;
