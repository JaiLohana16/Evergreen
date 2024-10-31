import React, { useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
const Hero = () => {
    const {getCartCount,token,getUserCart}=useContext(ShopContext)
    useEffect(() => {
      getUserCart(token)  
      getCartCount()
    }, [token])
    
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            {/* hero left */}
            <div className=' w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>
                    <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                    <div className='flex items-center gap-2'>
                        <Link to={"/collection"} className='font-semibold text-sm md:text-base bg-black text-white p-2'>SHOP NOW</Link>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>

            {/* hero right */}
            
                <img src={assets.Hero2} alt="hero" className='w-full sm:w-1/2 h-[400px] aspect-square border border-l-black' />
            
        </div>
    )
}

export default Hero
