import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../Redux/Reducers/userSlice'
import { toast } from 'react-toastify'
import './SignIn.css'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error, message , isAuth} = useSelector((state) => state.user)

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    if (message) toast.success(message)
    if(error) toast.error(error)  

    if(isAuth){
      navigate('/', {replace : true})
    }
  }, [message,error])

  
  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={loginHandler}>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to manage your flights</p>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@airline.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="auth-btn" type="submit" >
          Sign In
        </button>

        <span className="auth-footer">
          Secure access · Global airline booking
        </span>
        <Link to="/register" className="auth-footer underline">Don't have account..</Link>
      </form>
    </div>
  )
}

export default SignIn