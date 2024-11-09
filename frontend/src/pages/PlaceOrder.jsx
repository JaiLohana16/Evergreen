import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from "axios"


const PlaceOrder = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const { navigate, backendURl, delivery_fee, token, cartItems, setCartItems, getCartAmount, products,setError,error } = useContext(ShopContext)
  const [method, setMethod] = useState("cod")
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", street: "", city: "", state: "", zipcode: "", country: "", phone: "" })

  const onChangeHandler = (e) => {

    setFormData(data => ({ ...data, [e.target.name]: e.target.value }))
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (!token) {
        return navigate("/login")
      }
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id == items))
            if (itemInfo) {
              itemInfo.colour=item
              itemInfo.quantity= cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData={
        userDetails:formData,
        items:orderItems,
        amount:getCartAmount() +delivery_fee

      }

      switch(method){
        case "cod":
          const response =await axios.post(backendURl+"/api/order/place",orderData,{headers:{token}})
          if(response.data.success){
            setCartItems(null)
            navigate("/orders")
          }
          else{
            setError(response.data.message)
          }
        break 
      }
      switch(method){
        case "EasyPaisa":
          const response =await axios.post(backendURl+"/api/order/Easy",orderData,{headers:{token}})
          if(response.data.success){
            setCartItems(null)
            navigate("/orders")
          }
          else{
            setError(response.data.message)
          }
        break 
      }
      switch(method){
        case "JazzCash":
          const response =await axios.post(backendURl+"/api/order/Jazz",orderData,{headers:{token}})
          if(response.data.success){
            setCartItems(null)
            navigate("/orders")
          }
          else{
            setError(response.data.message)
          }
        break 
      }
    }
    
    
    
    catch (error) {
        setError(error.message)
    }
  }
  return (
    <form  onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div  className='flex flex-col w-full gap-4 sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3 '>
          <Title text1={"CONFIRM"} text2={"ORDER"} />
        </div>
        <Title text1={"Delivery"} text2={"Address"} />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>
      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 win-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod("EasyPaisa")} className='flex items-center gap-3 border  p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-800 rounded-full ${method == "EasyPaisa" ? 'bg-green-400' : ''}  `}></p>
              <img className='h-12 mx-4' src={assets.easyPaisa_logo} alt="easyPaisa" />

            </div>
            <div onClick={() => setMethod("JazzCash")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full border-gray-800 ${method == "JazzCash" ? 'bg-green-400' : ''} `}></p>
              <img className='h-12 mx-4' src={assets.JazzCash} alt="JazzCash" />

            </div>
            <div onClick={() => setMethod("cod")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full border-gray-800 ${method == "cod" ? 'bg-green-400' : ''} `}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <p className='text-lg text-red-700'>{error}</p>
          <div className='w-full text-end mt-8'>
            <button onSubmit={onSubmitHandler} className='bg-black text-white px-16 py-3 text-sm w-full' type='submit'>PLACE ORDER</button>
          </div>
        </div>
      </div>
        
    </form>
    
  )
}

export default PlaceOrder
