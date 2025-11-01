import { useState, useLayoutEffect } from 'react';
import './style.css';
import { CallApi_Without_Token } from '../../Services/Client';
import { API } from '../../Services/Apis';

function Firstcome(props) {
  
  const inputs={Name:'',Email:'',Phone:'',Message:''};
  const [inputData,setinputData]=useState(inputs);
  const [isModalOpen,setIsModalOpen]=useState(true);
  const [errormessage,setErrormessage]=useState({});

// console.log(sessondata)
const fetchInfo = async () => {
    var formdata = new FormData();
    formdata.append("request_type", 'get_in_touch');
    formdata.append("first_name", inputData.Name);
    formdata.append("email", inputData.Email);
    formdata.append("phone", inputData.Phone);
    formdata.append("message", inputData.Message);
    const data = await CallApi_Without_Token('POST', API.CONTACT_US, formdata)
    // setLoading(false)
    if (data.status === 1) {
        setIsModalOpen(false)
        sessionStorage.setItem('notshowagain',1);
        props.message(1);
    } else {
        setIsModalOpen(true)
        // setErrormessage(data.message)
        setErrormessage(validate(inputData));
    }
}

// validate form
const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!values.Name) {
      errors.name = 'Name is required';
  }
  if (!values.Phone) {
      errors.phone = 'Phone is required';
  }
  if (!values.Email) {
      errors.email = 'Email is required';
  } else if (!regex.test(values.Email)) {
      errors.email = 'This is not a valid email format';
  }
  if (!values.Message) {
      errors.message = 'Message is required';
  } else if (values.Message.length < 5) {
      errors.message = 'Message must be atleast 5 charecter';
  }

  return errors;
};
// const compairDataString = sessionStorage.getItem("credential");
//   const compairData = JSON.parse(compairDataString);

  const modalClose = () => {
    setIsModalOpen(false);
    sessionStorage.setItem('notshowagain',0);
  }
  const inputHandleChange = (e) => {
    setinputData({...inputData,[e.target.name]:e.target.value})
  }
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetchInfo();
    
  }

  
  return (
    <>
    <div className="header">
      <div className="menu_list">
        {(isModalOpen) ?<div className="login_modal">
          <div className="firstcome_wrapper">
        <div className='firstcomeimg'>
            <img src={require("../../image/firstcome_bg.jpg")} alt="" />
            </div>
          <form action="" onSubmit={handleLoginSubmit} >
            <h4>Get In Touch</h4>
            <button className='close_btn' onClick={modalClose} type='submit'><span></span></button>
            <div style={{position:'relative'}}>
            {/* <label htmlFor="">Name</label> */}
            <input type="text" name='Name' placeholder='Enter Your Name' value={inputData.Name}
          onChange={inputHandleChange}/>
          <p className='error'>{errormessage.name}</p>
            </div>
            <div style={{position:'relative'}}>
            {/* <label htmlFor="">Email</label> */}
            <input type="Email" name='Email' placeholder='Enter Your Email' value={inputData.Email}
          onChange={inputHandleChange}/>
          <p className='error'>{errormessage.email}</p>
            </div>
            <div style={{position:'relative'}}>
            {/* <label htmlFor="">Phone</label> */}
            <input type="text" name='Phone' placeholder='Enter Your Number' value={inputData.Phone}
          onChange={inputHandleChange}/>
          <p className='error'>{errormessage.phone}</p>
            </div>
            <div style={{position:'relative'}}>
            {/* <label htmlFor="">Message</label> */}
              <textarea name="Message" placeholder="Message" value={inputData.Message} onChange={inputHandleChange}></textarea>
              <p className='error'>{errormessage.message}</p>
              </div>
            <button className='login_submit btn' type='submit'>Submit</button>
          </form>
          </div>
        </div>:''}
      </div>
    </div>
    </>
  );
}

export default  Firstcome;
