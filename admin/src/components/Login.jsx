import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { backendUrl } from '../App'

const Login = ({setToken}) => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const[type,setType]=useState("password")

  const handleSubmit=async(e)=>{
    try {
      e.preventDefault()
      const response=await axios.post(backendUrl+"api/user/admin",{email,password})
      if (response.data.success) {
        setToken(response.data.token)
      }
      else{
        setError(response.data.message)
      }
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center'> 
    <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
      <h1 className='text-2xl font-bold mb-4 '>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3 min-w-72 '>
            <p className='text-sm font-medium text-gray-700 mb-2 '>Email Address</p>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Admin Email' />
        </div>
        <div className='mb-3 min-w-72 '>
            <p className='text-sm font-medium text-gray-700 mb-2 '>Password</p>
            <div  className='flex w-full items-center relative'>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type={type} placeholder='Admin Password' /> <span className='absolute cursor-pointer left-60 ' onClick={type=="password"?()=>setType("text"):()=>setType("password")}>{type=="password"?"Show":"Hide"}</span>
            </div>
        </div>

        <p className='text-red-600'>{error}</p>
        <button type='submit' className='mt-2 w-full px-4 py-2 rounded-md text-white bg-black'>Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Login
