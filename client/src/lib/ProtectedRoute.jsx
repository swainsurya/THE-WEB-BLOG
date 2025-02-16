import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const getLogin = localStorage.getItem("protected") ;
  return (
    getLogin ? <Outlet/> : <Navigate to={"/login"} />
  )
}

export default ProtectedRoute