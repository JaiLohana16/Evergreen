import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'



const Navbar = () => {

    const [visible, setVisible] = useState(false)
    const{search,setSearch,showSearch,setShowSearch,getCartCount,navigate,token,setToken,setCartItems } =useContext(ShopContext)
    
    const Logout=()=>{
        navigate("/login")
        
        localStorage.removeItem("token")
        localStorage.removeItem("cartitems")
        setToken("")
        setCartItems({})  
    }
    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to={"/"}>
            <p className='w-52  text-center rounded-lg font-extrabold bg-green-700 text-3xl text-white italic' >EVERGREEN
            <p className='w-20  text-center  font-extrabold text-sm text-white relative left-24 italic' >Communication</p></p>
                {/* <img src={assets.logo} className='w-32 rounded-lg bg-green-500' alt="logo" /> */}
            </Link>

            <ul className='hidden sm:flex gap-5  text-sm text-gray-700'>
                {/* what sense this makes is ke sm ke upar wale sabhi sizes ke liye display show aise es hisab se karne hai and otw hidden  */}
                <NavLink className="flex flex-col items-center gap-1" to={"/"} >
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink className="flex flex-col items-center gap-1" to={"/collection"} >
                    <p>ACCESSORIES</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink className="flex flex-col items-center gap-1" to={"/MobileCollection"} >
                    <p>MOBILE</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink className="flex flex-col items-center gap-1" to={"/about"} >
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink className="flex flex-col items-center gap-1" to={"/contact"} >
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6 relative'>
                <img src={assets.search_icon} alt="search_icon" className='w-5 cursor-pointer'  onClick={()=>setShowSearch(true)}/>
                <div className='group relative'>
                   <img onClick={()=>token?null:navigate("/login")} src={assets.profile_icon} alt="profile_icon" className='w-5 cursor-pointer' />
                                     {token&&<div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>   {/* group name ke class de hai koi tailwing ke class nahi hai froup and jab uss pe hover karen toh display block ho jaye otw hidden rahe and absolute position diya hai ke woh apne div ke absolute lage and parent div ko relative diya hai and phir es div ko dropdown-menu name ke class de hai again woh ek yailwind class nahi hai  */}
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                           <Link to={"/orders"} > <p className='cursor-pointer hover:text-black'>My Orders</p></Link>
                            <p className='cursor-pointer hover:text-black' onClick={()=>Logout()}>Logout</p>
                        </div> </div>}
                    
                    
                </div>
                <Link to={"/cart"} className='relative'>
                    <img src={assets.cart_icon} alt="cartIcon" className='w-5 cursor-pointer min-w-5' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu_icon" className='w-5 cursor-pointer sm:hidden' />
            </div>
            {/* sidebar menu for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div className='flex items-center gap-4 p-3 cursor-pointer ' onClick={() => setVisible(false)}>
                        <img src={assets.dropdown_icon} alt="DropDown" className='h-4 rotate-180' />
                        <p>Back</p>
                    </div>
                    <NavLink className="py-2 pl-6 border" onClick={() => { setVisible(false) }} to={"/"}>HOME</NavLink>
                    <NavLink className="py-2 pl-6 border" onClick={() => { setVisible(false) }} to={"/MobileCollection"}>MOBILE</NavLink>
                    <NavLink className="py-2 pl-6 border" onClick={() => { setVisible(false) }} to={"/collection"}>ACCESSORIES</NavLink>
                    <NavLink className="py-2 pl-6 border" onClick={() => { setVisible(false) }} to={"/about"}>ABOUT</NavLink>
                    <NavLink className="py-2 pl-6 border" onClick={() => { setVisible(false) }} to={"/contact"}>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
