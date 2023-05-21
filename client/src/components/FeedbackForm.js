import React, { useState } from 'react';
import {Row, Col, Form, Input} from 'antd'
import { FaStar } from 'react-icons/fa';

function FeedbackForm() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFeedback = {
      name: name,
      comment: comment,
    };
    setFeedbackList([...feedbackList, newFeedback]);
    setName('');
    setComment('');
  };
  const [showMore, setShowMore] = useState(false);


  return (
    <div className='feedback'>
       <h1 style={{color:'white', marginLeft:'12px'}}><b>What Our Customers Say</b></h1>
                <p style={{color:'white',marginLeft:'12px'}}>Trusted Feedback From Our Loyal Customers</p>
                <hr style={{backgroundColor:'white',height:'5px',width:'1462px',marginLeft:'-42px'}}></hr>
                
                <div>
                <Row justify='center'>
                <Col lg={11} sm={24}>
      <form onSubmit={handleSubmit} style={{marginTop:'70px'}} className='feedback-form p-5'>
      <h1 className='feedback-form-title'>Feedback Form</h1>
        <hr />
        <label htmlFor="name" style={{color:'white',marginRight:'540px',}}>Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          style={{marginRight:'-30px'}}
          className='feedback-name'
        />
        <br/>
        
        <label htmlFor="comment" style={{color:'white',marginRight:'1285px'}}>Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          style={{marginLeft:'30px'}}
          className='comment'
        ></textarea>
        <br/>
        <div style={{marginRight:'30px'}}>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
      <p style={{color:'white'}}>{rating} out of 5 stars</p>
    </div>
        <button type="submit" class="feedbacksubmit-btn">Submit</button>
      </form>
      </Col>
      <Col lg={10}>
      {feedbackList.length > 0 && (
      <div style={{marginTop:'-52px'}}>
        <h1 className='feedback-list-title'>Customer Feedback List</h1>
        <ul style={{marginTop:'40px',color:'transparent'}}>
          {feedbackList.map((feedback, index) => (
            <div className='feedback-box'>
            <li key={index} style={{marginRight:'140px'}}>
              <p style={{color:'white',marginLeft:'144px'}} className='feedback-list-name'><b>{feedback.name}</b></p>
              {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i} className='listfeedback-star'>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="feedbacklist-star"
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={20}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
              <p className='feedback-list-comment'>  {showMore ? feedback.comment : `${feedback.comment.substring(0, 295)}`}
  <span onClick={() => setShowMore(!showMore)} style={{cursor: 'pointer',fontWeight:'bold'}}>
    {showMore ? ' less' : ' more...'}
  </span></p>
              
            </li>
            
            </div>
            
          ))}
        </ul>
        </div>)}
        <br/>
      </Col>
      
      </Row>
      </div>
    </div>
  );
}

export default FeedbackForm;
