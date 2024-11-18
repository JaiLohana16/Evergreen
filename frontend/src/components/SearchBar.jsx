import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import {  useLocation } from 'react-router-dom'

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch}=useContext(ShopContext)
    const location =useLocation()
    
  return (
    <div>
      {showSearch &&location.pathname.includes("collection" || "mobilecollection")  ?<div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 '>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
        <img src={assets.search_icon} alt="searchicon" className='w-4' />
        </div>
        <img src={assets.cross_icon} alt="crossIcon" className='inline cursor-pointer w-3 ' onClick={()=>setShowSearch(false)} />
      </div> :null}
    </div>
  )
}

export default SearchBar
