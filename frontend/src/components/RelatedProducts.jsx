import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const RelatedProducts = ({category,subCategory,id}) => {
    const {products } =useContext(ShopContext)
    const [related,setRelated]=useState([])


    useEffect(() => {
      if (products.length>0) {
        let cpyProducts=products.slice()
        cpyProducts=cpyProducts.filter((item,index)=>(category==item.category))
        cpyProducts=cpyProducts.filter((item,index)=>(subCategory==item.subCategory))
        cpyProducts=cpyProducts.filter((item,index)=>(id!=item._id))
        setRelated(cpyProducts.slice(0,6).sort((a,b)=>(a.price-b.price)))
      }
    }, [products])
    
  return (
    <div className='sm:flex sm:flex-row sm:gap-5 grid grid-cols-2 gap-5'>
      {related.map((item,index)=>(
        <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
      ))}
    </div>
  )
}

export default RelatedProducts
