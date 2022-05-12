import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const BASE_SERVER_URL = 'http://localhost:8000/';
const APIS = {
  signup: BASE_SERVER_URL + 'auth/signup/',
  signin: BASE_SERVER_URL + 'auth/signin/',
  getUser: BASE_SERVER_URL + 'users/me/',
  editUser: BASE_SERVER_URL + 'users/',
  todo: BASE_SERVER_URL + 'todo/',
}
function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthorized, setIsAuthorized] = useState(false);

    // validate email in frontend
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    // handle error in frontend
    const handleFrontendError = (message, setData)=> {
      setData({status: true, message});
      setTimeout(() => {
        setData({status: false, messahe: ""});
      }, 2000);
      return;
    }


  const checkAuthorization = async (url, token)=> {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if(response.status === 200){
      setIsAuthorized(true);
    } else{
      setIsAuthorized(false)
    }
  }
  useEffect(()=> {
    checkAuthorization(APIS.todo, token);
  }, [token, APIS.todo]);

  return (
    <Router>
      <div className="app">
        <div className="home-title">Task App</div>
        <Routes>
          <Route path="/" element={isAuthorized ? <Home apis={APIS} token={token} isAuthorized={isAuthorized} setAuthorized={setIsAuthorized} setToken={setToken}/> : <Navigate to="/login" />}/>
          <Route path="/login" element={isAuthorized ? <Navigate to="/"/>:<Login apis= {APIS} setToken={setToken} token={token} isAuthorized={isAuthorized} handleFrontendError={handleFrontendError}/>}/>
          <Route path="/signup" element={<SignUp apis={APIS} validateEmail={validateEmail} handleFrontendError={handleFrontendError}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
