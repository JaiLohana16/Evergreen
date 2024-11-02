import React, { useEffect } from 'react'
import { useState } from 'react'
import {backendUrl} from "../App"
import axios from "axios"

const List = ({token}) => {
  const [list,setList] =useState([])
  const [done,setDone] =useState("")
  const [error,setError]=useState("")

  const fetchList=async () => {
    try {
      const response =await axios.get(backendUrl + "api/product/list")
      console.log(response.data.products)
      setList(response.data.products)
    } catch (error) {
      console.log(error)
    }
  }
const RemoveProduct =async(id)=>{
  try {
    const response =await axios.post(backendUrl+"api/product/remove",{id},{ headers: { Authorization: `Bearer ${token}` }})
    if(response.data.success){
      setDone("Product Deleted Successfully")    
      await fetchList()
      setTimeout(() => {
        setDone("");
      }, 2000);
    }
    else{
      setError("Not Deleted")
    }
  } catch (error) {
    
  }
}

  useEffect(() => {
    fetchList()
  }, [])
  
  return (
    <div>
      <p className='text-red-600 text-3xl'>{error}</p>
      <p className='text-green-600 text-3xl'>{done}</p>
      <p className='mb-2'>All Products</p>
      <div className='flex flex-col gap-2 '>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm '> 
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}

        {
          list.map((item,index)=>(
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text -sm'>
            <img className='w-12'src={item.image[0]} alt="image" />
            <p >{item.name}</p>
            <p className=''>{item.category}</p>
            <p>Rs.{item.price}</p>
            <p className='text-right md:text-center  cursor-pointer text-lg' onClick={()=>RemoveProduct(item._id)}>DELETE</p>
            </div>
          )) 
        }
      </div>
    </div>
  )
}

export default List
