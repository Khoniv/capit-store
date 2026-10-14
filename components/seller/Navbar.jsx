import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-black/[0.05] px-4 md:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          onClick={() => router.push("/")}
          className="flex items-center cursor-pointer select-none group"
        >
          <span className="text-xl font-black tracking-tight text-neutral-950 font-sans group-hover:opacity-80 transition">
            capitstore
          </span>
          <span className="ml-2 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-neutral-900 text-white tracking-wider">
            Seller Hub
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/")}
          className="text-xs font-semibold px-4 py-1.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-neutral-700 transition"
        >
          ← Back to Store
        </button>
      </div>
    </header>
  )
}

export default Navbar