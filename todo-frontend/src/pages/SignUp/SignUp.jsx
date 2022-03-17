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

const SignUp = ({apis}) => {
  const [data, setData] = useState(initialData);
  
  const signupSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(apis.signup, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    if(response.status === 201){
      document.location.reload();
    }
  } 
  return (
    <div className='form-container'>
      <div className="title">Register</div>
    <form className='form' onSubmit={signupSubmit}>
      <div className="form-control username">
        <FaUserAlt/>
        <input type="text" placeholder='username' value={data.username} onChange={e=> setData({...data, username: e.target.value})}/>
      </div>
      <div className="form-control email">
        <FaEnvelope/>
        <input type="email" name="email" placeholder='email' value={data.email} onChange={e=> setData({...data, email: e.target.value})} />
      </div>
      <div className="form-control firstname">
        <FaUserAlt/>
        <input type="text" name="firstname" placeholder='first name' value={data.firstName} onChange={e=> setData({...data, firstName: e.target.value})} />
      </div>
      <div className="form-control middlename">
          <FaUserAlt/>
        <input type="text" name='middlename' placeholder='middle name' value={data.middleName} onChange={e=> setData({...data, middleName: e.target.value})}/>
      </div>
      <div className="form-control lastname">
        <FaUserAlt/>
        <input type="text" placeholder='lastname' value={data.lastName} onChange={e=> setData({...data, lastName: e.target.value})}/>
      </div>
      <div className="form-control password">
        <FaLock/>
        <input type="password" placeholder='password' value={data.password} onChange={e=> setData({...data, password: e.target.value})}/>
      </div>
      <div className="form-control confirm-password">
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