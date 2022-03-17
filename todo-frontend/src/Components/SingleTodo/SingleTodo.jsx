import React, { useState } from 'react';
import './singletodo.css'

const SingleTodo = ({title, description,id, token, apis}) => {

  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({id, title, description});

  const handleSubmit = async ()=> {
    const response = await fetch(apis.todo + id, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if(200 <= response.status < 300)
      setIsEdit(false);

  }
  const handleDelete = async () => {
    const response = await fetch(apis.todo + id, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
  });
  if(200 <= response.status < 300)
      setData(null);

}
  if(isEdit){
    return (
      <div className="single-todo-container">
        <input type="text" value={data?.title} onChange={(e)=> setData({...data, title: e.target.value})} />
        <textarea type="text" className='description' value={data?.description} onChange={(e)=> setData({...data, description: e.target.value})} />
        <div className="btn-container">
          <button className="btn cancel-btn" onClick={()=> setIsEdit(false)}>Cancel</button>
          <button className="btn edit-btn" onClick={handleSubmit}>Edit</button>
        </div>
      </div>
    )
  }
  return (data &&
    <div className='single-todo-container'>
        <div className="single-todo-title">{data?.title}</div>
        <div className='single-todo-description'>{data?.description}</div>
        <div className="btn-container">
            <button className="btn edit-btn" onClick={()=> setIsEdit(true)}>Edit</button>
            <button className="btn delete-btn" onClick={handleDelete}>Delete</button>
        </div>
    </div>
  )
}

export default SingleTodo;
