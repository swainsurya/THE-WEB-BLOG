import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HeroSection from './components/HeroSection'
import BlogDetailPage from './pages/BlogDetailPage'
import CreateBlogPage from './pages/CreateBlogPage'
import ProtectedRoute from './lib/ProtectedRoute'
import OwnBlogPage from './pages/OwnBlogsPage'

const App = () => {
  return (
    <Routes>
      <Route element={<HomePage />}>
        <Route path='/' element={<HeroSection/>} />
        <Route path='/blog/:id' element={<BlogDetailPage/>} />
        <Route path='/:page' element={<HeroSection/>} />
      </Route>
      <Route element={<ProtectedRoute/>}>
        <Route path='/create' element={<CreateBlogPage/>} />
        <Route path='/ownblogs/:uid' element={<OwnBlogPage/>} />
        <Route path='/edit/:id' element={<CreateBlogPage/>} />
      </Route>
    </Routes>
  )
}

export default App
