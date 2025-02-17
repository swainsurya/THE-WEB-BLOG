import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='container max-w-screen mx-auto'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default HomePage
