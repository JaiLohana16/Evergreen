import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm'>
        <div>   
            {/* <img src={assets.logo} alt="logo" className='mb-5 w-32 ' /> */}
            <Link to={"/"}>
            <p className='w-52  text-center rounded-lg font-extrabold bg-green-700 text-3xl text-white italic' >EVERGREEN
            <p className='w-20  text-center  font-extrabold text-sm text-white relative left-24 italic' >Communication</p></p>
                {/* <img src={assets.logo} className='w-32 rounded-lg bg-green-500' alt="logo" /> */}
            </Link>
            
            <p className='w-full md:w-2/3 text-gray-600'>Stay Connected with Us!

Explore our extensive range of mobile phones and accessories designed to enhance your communication experience.</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <Link to={"/"}>Home</Link>
                <Link to={'/about'}>About Us</Link>
                <Link to={"/contact"}>Help</Link>
                <Link>Privacy Policy</Link>
            </ul>
        </div>
        <div className=''>
            <p className='text-xl font-medium mb-5 '>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+92-3453777143</li>
                <li>contact@evergreen.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center '>Copyright 2024@ evergreen.com - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
