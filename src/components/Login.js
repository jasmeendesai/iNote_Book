import React, { useContext, useState } from 'react'

import usercontext from '../contexts/user/UserContext'
import {Link, useNavigate} from 'react-router-dom'

function Login(props) {
    const context = useContext(usercontext)
    const {login} = context
    const navigate = useNavigate();
    const {showAlert} = props

    const [user, setuser] = useState({email: '', password:''})
    
    const handleSumbit=async (e)=>{
        e.preventDefault()
        // login(user.email, user.password)
        const json =await login(user.email, user.password)
          if(json.status){
            //redirect and set token
            localStorage.setItem('token', json.token)
            showAlert(json.message, 'success')
            navigate("/")
          }else{
            showAlert(json.message, 'danger')
          }
        

    }
    const handleChange = (e)=>{
        setuser({...user, [e.target.name] : e.target.value})
    }
  return (
    <div className="mt-3 mx-auto" style={{ maxWidth: "400px" }}>
    <form className="mb-3" onSubmit={handleSumbit}>
  <div className="form-label my-2">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name='email' onChange={handleChange}/>
  </div>
  <div className="form-label my-2">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={handleChange}/>
  </div>
  <div className="form-label my-5">
    <button type="submit" className="btn btn-primary">Login</button>
    <p className='my-3'>New User? <Link to='/signup'>Register</Link> </p>
  </div>
</form>
    </div>
  )
}

export default Login
