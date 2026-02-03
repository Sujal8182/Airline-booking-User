import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import './SignIn.css' 
import { register } from '../Redux/Reducers/userSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { message, error } = useSelector((state) => state.user)

  const registerHandler = (e) => {
    e.preventDefault()
    dispatch(register({ name, email, password }))
  }
  const AirRegister = ()=>{
    if(setEmail === "" && setName === "" && setPassword === "") return toast("All fields are required")
    
    if(message === "Registraion Successfull!") {
      navigate('/login')
    }  
  }

  useEffect(() => {
    if (message) return toast(message)

      if (error) return toast(error)
  }, [message])

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={registerHandler}>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">
          Join us and start your journey
        </p>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="auth-btn" type="submit" onClick={AirRegister}>
          Create Account
        </button>

        <span className="auth-footer">
          Secure registration · Global airline platform
        </span>
      </form>
    </div>
  )
}

export default Register
