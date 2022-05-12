import React, { useState } from 'react';
import './signup.css';
import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const initialData = {
  username: '',
  email: '',
  firstName: '',
  middleName: '',
  lastName: '',
  password: '',
  confirmPas: ''
}
const initialError = {
  status: false,
  message :''
}

const SignUp = ({apis, validateEmail, handleFrontendError}) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialError);
  
  const signupSubmit = async (e) => {
    e.preventDefault();

    if(!data.username || !data.password || !data.email || !data.lastName || !data.firstName){
      handleFrontendError("Please populate all the required input field", setError);
    }
    if(validateEmail(data.email) === false){
      handleFrontendError("email format not valid", setError);
    }
    if(!(data.password === data.confirmPas)){
      return handleFrontendError("passwords donot match", setError);
    }
    try{
      const response = await fetch(apis.signup, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if(json.status === 400){
        throw new Error(json.message);
      }
      // if(response.status === 201){
      //   document.location.reload();
      // }
    } catch (error){
      handleFrontendError(error.message, setError);
    }
  } 
  return (
    <div className='form-container'>
      <div className="title">Register</div>
      {
        error.status && <div className="error active">{error.message}</div>
      }
    <form className='form' onSubmit={signupSubmit}>
      <div className="form-control username">
        <span className='star'>*</span>
        <FaUserAlt/>
        <input type="text" placeholder='username' value={data.username} onChange={e=> setData({...data, username: e.target.value})}/>
      </div>
      <div className="form-control email">
        <span className='star'>*</span>
        <FaEnvelope/>
        <input type="email" name="email" placeholder='email' value={data.email} onChange={e=> setData({...data, email: e.target.value})} />
      </div>
      <div className="form-control firstname">
        <span className='star'>*</span>
        <FaUserAlt/>
        <input type="text" name="firstname" placeholder='first name' value={data.firstName} onChange={e=> setData({...data, firstName: e.target.value})} />
      </div>
      <div className="form-control middlename">
          <FaUserAlt/>
        <input type="text" name='middlename' placeholder='middle name' value={data.middleName} onChange={e=> setData({...data, middleName: e.target.value})}/>
      </div>
      <div className="form-control lastname">
        <span className='star'>*</span>
        <FaUserAlt/>
        <input type="text" placeholder='lastname' value={data.lastName} onChange={e=> setData({...data, lastName: e.target.value})}/>
      </div>
      <div className="form-control password">
        <span className='star'>*</span>
        <FaLock/>
        <input type="password" placeholder='password' value={data.password} onChange={e=> setData({...data, password: e.target.value})}/>
      </div>
      <div className="form-control confirm-password">
        <span className='star'>*</span>
        <FaLock/>
        <input type="password" placeholder='confirm password' value={data.confirmPas} onChange={e=> setData({...data, confirmPas: e.target.value})}/>
      </div>
      <div className="form-control submit">
        <button className='btn submit-btn' type='submit'>Signup</button>
      </div>
    <Link to="/login">
      <div className="register-login-link">already have an account? <span className="link-main">Login</span></div>
    </Link>
    </form>
  </div>
  )
}

export default SignUp;