import React from 'react'

export default function Footer(){
  return (
    <footer className='mt-12 py-8 text-center text-slate-400'>
      <div className='container mx-auto px-4'>
        <div className='mb-4'>© {new Date().getFullYear()} FlavorFlow — Made with ❤</div>
      </div>
    </footer>
  )
}
