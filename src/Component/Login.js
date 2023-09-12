import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'

const Login = (props) => {
  const navigate = useNavigate ()
  const [credentials, setcredentials] = useState({mail:"",password:""});
  const onChange = (e) => {
    setcredentials({...credentials, [e.target.name] : e.target.value})
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    let url = "http://127.0.0.1:4000/api/auth/"
    const response = await fetch(`${url}login` , {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({mail:credentials.mail, password:credentials.password})

    })
    const json = await response.json()
    // console.log(authToken)
    if(json.success){
      localStorage.setItem('token', json.authToken)
      props.showAlert('Logged in successfully', 'success')
      navigate('/')
    }else{
      // alert("Invalid credentials")'
      props.showAlert('Invalid Login credentials', 'danger')
    }
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control my-2" name="mail" id="mail" value={credentials.mail} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" required/>
          <small id="emailHelp" className="form-text text-muted my-2">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control my-2" name="password" id="password" value = {credentials.password} onChange={onChange} placeholder="Password" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </>
  )
}

export default Login
