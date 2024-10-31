import React from 'react'
import {assets} from "../assets/assets.js"
import { NavLink } from 'react-router-dom'
const Navbar = ({setToken}) => {
  const handleLogout=()=>{
   setToken("")   
  }
  return (
    
    <div className='flex items-center py-2 px-[4%] justify-between bg-[#ffebf5]'>
      <NavLink to="/"><img className='w-[max(20%,150px)]' src={assets.logo} alt="logo" /></NavLink>
      <button onClick={handleLogout} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
