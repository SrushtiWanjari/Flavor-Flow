import React, { useEffect, useState } from 'react'
import API from '../api'
import RecipeCard from '../components/RecipeCard'
import { toast } from 'react-toastify'

export default function Recipes(){
  const [recipes, setRecipes] = useState([])
  const [q, setQ] = useState('')

  useEffect(()=>{ fetchAll() },[])

  const fetchAll = async () => {
    try {
      const res = await API.get("/recipes")
      setRecipes(res.data)
    } catch (err) { toast.error('Could not fetch recipes') }
  }

  const search = async (e) => {
    e.preventDefault()
    try {
      const res = await API.get("/recipes", { params: { q } })
      setRecipes(res.data)
    } catch (err) { toast.error('Search failed') }
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-semibold'>All Recipes</h2>
        <form onSubmit={search} className='flex gap-2'>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Search title...' className='px-3 py-2 rounded-lg bg-white/3 text-slate-100' />
          <button className='px-4 py-2 rounded-lg bg-gradient-to-r from-ff-mint to-ff-indigo text-black font-semibold'>Search</button>
        </form>
      </div>
      <div className='grid gap-4'>
        {recipes.map(r=> <RecipeCard key={r._id} recipe={r} />)}
      </div>
    </div>
  )
}
