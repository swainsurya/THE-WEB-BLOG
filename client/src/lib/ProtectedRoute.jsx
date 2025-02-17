import App from '@/App';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  return (
    <Outlet />
  )
}

export default ProtectedRoute