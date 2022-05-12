import React, { useCallback, useState } from 'react'
import { FaLock, FaUser, FaUserAlt } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';

const intialData = {
  username: '',
  password: ''
}
const initialError = {
  status: false,
  message :''
}
const Login = ({apis, setToken, handleFrontendError}) => {
  const [error, setError] = useState(initialError);
  const [data, setData] = useState(intialData);
  


  const submitForm = async (e) => {
    e.preventDefault();
    if(!data.username){
      return handleFrontendError("UserName cannot be empty", setError);
      
    }
    if(data.username.length < 6){
      return handleFrontendError("Username should be greater than 5 character", setError)
    }
    if(!data.password){
      return handleFrontendError("Passowrd cannot be empty", setError);
    }
    try{
      const response = await fetch(apis.signin, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if(response.status !== 200){
        throw new Error(json.message);
      }
      if(json.access_token){
        localStorage.setItem("token", json.access_token);
        setToken(localStorage.getItem("token"));
      }
    } catch(error){
        handleFrontendError(error.message, setError); 
    }
  };

  return (
    <div className='form-container'>
      <div className="title">Login</div>
      {
        error.status && <div className="error active">{error.message}</div>
      }
      <form className="form" onSubmit={submitForm}>
        <div className="form-control username">
          <span className='star'>*</span>
          <FaUserAlt/>
          <input type="text" placeholder='username' value={data.username} onChange={e=> setData({...data, username: e.target.value})}/>
        </div>
        <div className="form-control password" value={data.password} >
          <span className='star'>*</span>
          <FaLock/>
          <input type="password" placeholder='password' value={data.password} onChange={e=> setData({...data, password: e.target.value})}/>
        </div>
        <div className="form-control submit">
          <button className='btn submit-btn'>Login</button>
        </div>
        <Link to="/signup">
          <div className="register-login-link">don't have an account? <span className="link-main">Register</span></div>
        </Link>
      </form>
    </div>
  )
}

export default Login