import React from 'react'
import Title from "../components/Title"
import { assets } from '../assets/assets'
import {useEffect} from "react"
const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      <div className='text-center text-2xl border-t pt-10'>
        <Title text1={"CONTACT"} text2={"US"}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img src={assets.contact_img} alt="contact" className='w-full max-w-[480px]' />
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
            <p className='text-gray-500'>Madina Masjid <br /> Umerkot Sindh Pakistan</p>
            <p className='text-gray-500'>Tel:+92 3453777143 <br />Email:evergreen@gmail.com</p>
            <p className='font-semibold text-xl text-gray-600 '>Careers at Evergreen</p>
            <p className='text-gray-500'>Learn more about our team and job openings.</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
          </div>
      </div>
    </div>
  )
}

export default Contact
