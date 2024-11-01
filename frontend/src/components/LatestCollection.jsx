import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { useState } from 'react'
const LatestCollection = () => {
    
    const {products,loading,setLoading} =useContext(ShopContext)
    const[latestProducts,setLatestProducts]=useState([])
    console.log(products)

    
    
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }

  useEffect(() => {
      const shuffledProducts = shuffleArray([...products]);
      setLatestProducts(shuffledProducts.slice(0, 20));
  }, [products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
        <Title text1={"LATEST"} text2={"COLLECTION"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Connect, Capture, Create: Your Gateway to Modern Communication!</p>
        </div>

        {/* Rendering Items */}
        {loading?<div className='text-xl font-bold'>Loading Products Please Wait</div>:
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {latestProducts.map((item,index)=>(
                <ProductItem key={index} image={item.image} name={item.name} id={item._id} price={item.price} />
            ))}
        </div>}
    </div>
  )
}

export default LatestCollection
