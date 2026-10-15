'use client'
import Navbar from '@/components/seller/Navbar'
import Sidebar from '@/components/seller/Sidebar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-800">
      <Navbar />
      <div className='flex w-full'>
        <Sidebar />
        <main className="flex-1 p-6 md:p-10 max-w-5xl">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout