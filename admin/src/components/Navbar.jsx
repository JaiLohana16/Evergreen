import React from 'react'
import {assets} from "../assets/assets.js"
import { NavLink } from 'react-router-dom'
const Navbar = ({setToken}) => {
  const handleLogout=()=>{
   setToken("")   
  }
  return (
    
    <div className='flex items-center py-2 px-[4%] justify-between bg-[#5dfa28]'>
      <NavLink to="/" className={{"bg-green-500"}}><p className='text-3xl text-white'  >EVERGREEN</p>
      <p className='text-white text-xl'>Admin Panel</p></NavLink>
      <button onClick={handleLogout} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
