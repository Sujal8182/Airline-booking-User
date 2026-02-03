import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserProtectedRoute = () => {

    const {isAuth} = useSelector(state => state.user)

    if(!isAuth){
        toast.error("Login first..")
        return <Navigate to="/login" />;
    }
  return <Outlet />
    
}

export default UserProtectedRoute