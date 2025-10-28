import React, { useState } from 'react'
import API from '../api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/login', { email, password })
      localStorage.setItem('ff_token', res.data.token)
      localStorage.setItem('ff_name', res.data.user.name)
      toast.success('Welcome back!')
      navigate('/')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className='max-w-md mx-auto mt-16 bg-white/5 p-8 rounded-2xl backdrop-blur'>
      <h2 className='text-2xl font-semibold mb-4'>Welcome back</h2>
      <form className='grid gap-3' onSubmit={submit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className='px-4 py-3 rounded-lg bg-white/3' />
        <input value={password} onChange={e=>setPassword(e.target.value)} type='password' placeholder='Password' className='px-4 py-3 rounded-lg bg-white/3' />
        <button className='mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-ff-mint to-ff-indigo text-black font-semibold'>Login</button>
      </form>
    </div>
  )
}
