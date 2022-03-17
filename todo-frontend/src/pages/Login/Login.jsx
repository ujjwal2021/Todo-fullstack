import React, { useCallback, useState } from 'react'
import { FaLock, FaUser, FaUserAlt } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';

const intialData = {
  username: '',
  password: ''
}
const Login = ({apis, setToken, token}) => {

  const [data, setData] = useState(intialData);
  
  const submitForm = async (e) => {
    e.preventDefault();
    const response = await fetch(apis.signin, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if(json.access_token){
      localStorage.setItem("token", json.access_token);
      setToken(localStorage.getItem("token"));
    }
  };

  return (
    <div className='form-container'>
      <div className="title">Login</div>
      <form className="form" onSubmit={submitForm}>
        <div className="form-control username">
          <FaUserAlt/>
          <input type="text" placeholder='username' value={data.username} onChange={e=> setData({...data, username: e.target.value})}/>
        </div>
        <div className="form-control password" value={data.password} >
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