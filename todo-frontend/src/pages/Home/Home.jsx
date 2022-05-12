import React, { useEffect, useState } from 'react';
import "./home.css";
import SingleTodo from '../../Components/SingleTodo/SingleTodo';
import { Navigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const initialData = {
  title: "",
  description: ""
}
const Home = ({apis, token, isAuthorized, setToken, setIsAuthorized}) => {

  const [data, setData] = useState(initialData);
  const [userData, setUserData] = useState({});
  
  const [allTodos, setAllTodos] = useState([]);



  const handleSubmit = async (e)=> {
    e.preventDefault();
    const response = await fetch(apis.todo, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if( response.status === 201){
      const json = await response.json();
      console.log(json);
      setAllTodos([...allTodos, json])
    }
    setData(initialData);
  }

  const fetchData = async(url, setData)=> {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

    })
    if(response.status === 200){
      const json = await response.json();
      setData(json);
    }
  }


  const handleLogoutClick = () => {
      localStorage.removeItem("token");
      setToken(localStorage.getItem("token"));
      // document.location.reload();
  }

  useEffect(()=> {
    fetchData(apis.todo, setAllTodos);
    fetchData(apis.getUser, setUserData);
  }, [apis.todo, apis.getUser, token]);

  if(!isAuthorized){
    return(
      <Navigate to="/login"/>
    )
  }
  else{
    return (
      <div className='home-container'>
        <div className='home-top'>Hello, <span className="user">{userData?.user?.firstName}</span></div>
        <div className="logout" type='submit' onClick={handleLogoutClick}>Logout <FaSignOutAlt/></div>
        <div className="add-todo-container">
          <div className="title">Add tasks</div>
          <form className="add-form" onSubmit={handleSubmit}>
              <input type="text" placeholder='title' name='title' value={data.title} onChange={(e)=> setData({...data, title: e.target.value})}/>
              <input type="text" name="description" placeholder='description' value={data.description} onChange={(e)=> setData({...data, description: e.target.value})}/>
              <button type="submit" className='btn todo-submit-btn'>Add task</button>
          </form>
        </div>
  
        <div className="todo-list">
          <div className="title">All tasks</div>
          {allTodos.map((todo)=> {
            const {title, description, id} = todo;
            return <SingleTodo key={id} id={id} title= {title} description={description} token={token} apis={apis}/>
          })}
        </div>
      </div>
    )
  }
}

export default Home;