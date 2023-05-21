import React ,{ useState } from 'react';
import {Row, Col, Form, Input, Select} from 'antd'
import { FaStar } from 'react-icons/fa';
import { userSubmit } from '../redux/actions/requestActions';
import { useDispatch } from 'react-redux';
const { Option } = Select;

function RequestForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [questionType, setQuestionType] = useState('thankyou');
  const [topic, setTopic] = useState('general');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleCommentChange = e => {
    setComment(e.target.value);
  };

  const handleQuestionTypeChange = value => {
    setQuestionType(value);
  };

  const handleTopicChange = value => {
    setTopic(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const requestData = {
      name,
      comment,
      email,
      questiontype: questionType,
      topic,
    };
    dispatch(userSubmit(requestData));
  };


  return (
    <div className='feedback'>
       <h1 style={{color:'white', marginLeft:'12px'}}><b>What Our Customers Say</b></h1>
                <p style={{color:'white',marginLeft:'12px'}}>For more information, Please fill out the request Form below</p>
                <hr style={{backgroundColor:'white',height:'5px',width:'1462px',marginLeft:'-42px'}}></hr>
                
                <div style={{marginLeft:'242px',marginTop:'-42px'}}>
                <Row justify='center'>
                <Col lg={17} sm={24}>
      <form onSubmit={handleSubmit} style={{marginTop:'70px'}} className='feedback-form p-5'>
      <h1 className='feedback-form-title'>Request Form</h1>
        <hr />
        <br/>
        <Row>
        <Col>
        <label style={{color:'white',marginRight:'1285px',width:'99px'}}>Type of question:</label>
        <Select
  style={{
    width: 142,
    textAlign:'center',
    backgroundColor:'red',
    marginBottom:'-62px'
  }}
  className='questionselectbox'
  value={questionType}
  onChange={handleQuestionTypeChange}
>
<Option value='thankyou'>Thank You</Option>
<Option value='suggestion'>Suggestion</Option>
<Option value='question'>Question</Option>
<Option value='complaint'>Complaint</Option>
</Select>
</Col>
<Col style={{marginLeft:'250px',marginTop:'-56px'}}>
        <label  style={{color:'white',marginRight:'1285px',width:'99px'}}>Topic:</label>
        <Select
        value={topic}
       onChange={handleTopicChange}
  style={{
    width: 142,
    textAlign:'center',
    backgroundColor:'red',
    marginBottom:'-62px',
    marginRight:'62px'
  }}
  className='questionselectbox'
>
<Option value='general'>General</Option>
<Option value='vehicle'>Vehicle</Option>
<Option value='service'>Service</Option>
<Option value='website'>Website</Option>
<Option value='other'>Other</Option>
</Select>
</Col>
</Row>
        <br/>
        <br/>
        <label htmlFor="comment" style={{color:'white',marginRight:'1285px'}}>Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={handleCommentChange}
          style={{marginLeft:'30px'}}
          className='comment'
        ></textarea>
        <br/>
        <label htmlFor="name" style={{color:'white',marginRight:'540px',}}>Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          style={{marginRight:'-30px'}}
          className='feedback-name'
        />
        <br/>
        <label htmlFor="email" style={{color:'white',marginRight:'540px',}}>Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
          style={{marginRight:'-30px'}}
          className='feedback-name'
        />
        <button type="submit" className="feedbacksubmit-btn">Submit</button>
      </form>
      </Col>
      <Col lg={10}>
        <br/>
      </Col>
      
      </Row>
      </div>
    </div>
  );
}

export default RequestForm;