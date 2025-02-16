import React from 'react'
import { Button } from './components/ui/button'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import HeroSection from './components/HeroSection'
import BlogDetailPage from './pages/BlogDetailPage'
import CreateBlogPage from './pages/CreateBlogPage'
import useServer from './store/useServer'
import ProtectedRoute from './lib/ProtectedRoute'
import OwnBlogPage from './pages/OwnBlogsPage'

const App = () => {
  const {isLoggedIn} = useServer() ;
  return (
    <Routes>
      <Route element={<HomePage />}>
        <Route path='/' element={<HeroSection/>} />
        <Route path='/blog/:id' element={<BlogDetailPage/>} />
        <Route path='/:page' element={<HeroSection/>} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route element={<ProtectedRoute/>}>
        <Route path='/create' element={<CreateBlogPage/>} />
        <Route path='/ownblogs' element={<OwnBlogPage/>} />
        <Route path='/edit/:id' element={<CreateBlogPage/>} />
      </Route>
    </Routes>
  )
}

export default App
