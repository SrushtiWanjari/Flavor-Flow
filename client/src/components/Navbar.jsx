import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Navbar(){
  const navigate = useNavigate()
  const token = localStorage.getItem('ff_token')
  const name = localStorage.getItem('ff_name')

  const logout = () => {
    localStorage.removeItem('ff_token')
    localStorage.removeItem('ff_name')
    toast.success('Logged out')
    navigate('/login')
  }

  return (
    <header className='backdrop-blur sticky top-0 z-40 bg-black/30 border-b border-white/5'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-ff-rose via-ff-indigo to-ff-gold flex items-center justify-center shadow-lg'>
            <span className='font-display text-lg font-bold text-black'>FF</span>
          </div>
          <div>
            <div className='text-lg font-semibold'>FlavorFlow</div>
            <div className='text-xs text-slate-400 -mt-1'>Share. Discover. Savor.</div>
          </div>
        </Link>
        <nav className='flex items-center gap-4'>
          <Link to='/recipes' className='text-slate-300 hover:text-white transition'>Recipes</Link>
          <Link to='/create' className='text-slate-300 hover:text-white transition'>Create</Link>
          {token ? (
            <>
              <Link to='/profile' className='text-slate-300 hover:text-white transition'>{name || 'Profile'}</Link>
              <button onClick={logout} className='ml-2 px-3 py-2 rounded-md bg-gradient-to-r from-ff-rose to-ff-gold text-black font-semibold shadow'>Logout</button>
            </>
          ) : (
            <>
              <Link to='/login' className='px-3 py-2 rounded-md border border-white/6 text-slate-200 hover:bg-white/3 transition'>Login</Link>
              <Link to='/signup' className='ml-2 px-3 py-2 rounded-md bg-gradient-to-r from-ff-mint to-ff-indigo text-black font-semibold shadow'>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
