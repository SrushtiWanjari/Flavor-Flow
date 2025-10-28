import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import CreateRecipe from './pages/CreateRecipe'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'

export default function App(){
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='container mx-auto px-4 py-8 flex-1'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/recipes' element={<Recipes/>} />
          <Route path='/create' element={<CreateRecipe/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" />
    </div>
  )
}
