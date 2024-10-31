import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { backendUrl,currency } from "../App"
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [done, setDone] = useState("")
  const [error, setError] = useState("")


  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      }
      else {
        setError(response.data.message)
      }
    } catch (error) {
      setError(error.message)
    }
  }
  const statusHandler=async(e,orderId)=>{
    try {
      const response=await axios.post(backendUrl+"/api/order/status",{orderId,status:event.target.value},{headers:{token}})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
        console.log(error)
        setError(response.data.message)
    }
  }
  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (

    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-sm text-gray-700' key={index}>
            <img className='w-12' src={assets.parcel_icon} alt="image" />
            <div>
              <div>
              {order.items.map((item, index) => {
                if (index==order.items.length-1) {
                  return <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>{item.colour}</span></p>
                }
                else{
                  return <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>{item.colour}</span>,</p>

                }
              })}
            </div>
            <p className='mt-3 mb-2 font-medium'>{order.userDetails.firstName+" "+order.userDetails.lastName}</p>
            <div>
              <p>{order.userDetails.street +","}</p>
              <p>{order.userDetails.city +", "+order.userDetails.state +", "+order.userDetails.country +", "+order.userDetails.zipcode}</p>
            </div>
            <p>{order.userDetails.phone}</p>
          </div>
          <div>
            <p className='text-sm sm:text-[15px]'>Items:{order.items.length}</p>
            <p className='mt-3'>Method:{order.paymentMethod}</p>
            <p>Payment:{order.payment?"Done":"Pending"}</p>
            <p>Date:{new Date(order.date).toLocaleDateString()}</p>
          </div>
          <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
          <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className='p-2 font-semibold'>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
