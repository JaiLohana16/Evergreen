import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Login = () => {
  const[currentState,setCurrentState]=useState("Login")
  const {token,setToken,navigate,backendURl,error,setError}=useContext(ShopContext)
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [type,setType]=useState("password")

  const handleSubmit=async (e)=>{
      e.preventDefault()
      try {
        if (currentState=="Login") {
          const response=await axios.post(backendURl+"/api/user/login",{email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            
          }
          else{
            setError(response.data.message)
          }
          
        }
        else{
          const response=await axios.post(backendURl+"/api/user/register",{name,email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setName("")
            setEmail("")
            setPassword("")
            
          }
          else{
            setError(response.data.message)
          }
        }
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(() => {
    if(token){
      navigate("/")
    }
  }, [token])
  
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black '>
      <div className='flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr  className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState==="Login"?"":<input value={name} onChange={(e)=>setName(e.target.value)} type="text" className='w-full px-3 py-2 border border-gray-800 rounded-lg' placeholder='Name' required/>}
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border border-gray-800 rounded-lg' placeholder='Email' required/> <div className='flex w-full items-center relative'>
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type={type} className='w-full px-3 py-2 border border-gray-800 rounded-lg' placeholder='Password' required/> <span className='absolute right-5 cursor-pointer' onClick={type=="password"?()=>setType("text"):()=>setType("password")}>{type=="password"?"Show":"Hide"}</span></div>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <Link to={"https://evergreen-admin.onrender.com"} className='cursor-pointer'>{currentState=="Login"?"Admin Login":""}</Link>
        {
          currentState=="Login"?<p className='cursor-pointer' onClick={()=>{setCurrentState("Sign Up")}}>Create Account</p>:
          <p onClick={()=>{setCurrentState("Login")}} className='cursor-pointer'>Already Registered? Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 '>{currentState=="Login"?"Login":"Sign Up"}</button>
      <p className='text-xl text-red-600'>{error}</p>
    </form>
     
    
  )
}

export default Login
