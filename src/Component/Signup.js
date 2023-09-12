import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({name:"",mail:"",password:""});
  const {name,mail,password} = credentials
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value})
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const url = "http://127.0.0.1:4000/api/auth/"
    const response = await fetch(`${url}createuser`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name,mail,password})
    })
    const json = await response.json()
    // console.log(json)
    if(json.success){
      localStorage.setItem('token',json.authToken)
      props.showAlert('User account created successfully', 'success')
      navigate('/')
    }
    else{
      props.showAlert('Invalid details', 'danger')
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Email name</label>
          <input type="text" className="form-control my-2" name="name" id="name" value={name} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter name" required/>
        </div>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control my-2" name="mail" id="mail" value={mail} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" required/>
          <small id="emailHelp" className="form-text text-muted my-2">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control my-2" name="password" id="password" value = {password} onChange={onChange} placeholder="Password" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </>
  )
}

export default Signup
