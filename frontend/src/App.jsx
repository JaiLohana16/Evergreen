import React from "react"
import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Collection from './pages/Collection' 
import Cart from "./pages/Cart"
import Contact from './pages/Contact'
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import PlaceOrder from "./pages/PlaceOrder"
import Product from './pages/Product'
import About from "./pages/About"
import Navbar from "./components/Navbar"
import Footer from './components/Footer'
import SearchBar from "./components/SearchBar"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react"
import { ShopContext } from "./context/ShopContext"
import MobileCollection from "./pages/MobileCollection"
export const backendURl = import.meta.env.VITE_BACKEND_URL

function App() {
  
const {error,success,setSuccess,setError}=useContext(ShopContext)


  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* <p className="text-green-400 text-lg">{success}</p>
      <p className="text-red-500 text-lg">{error}</p>
       */}
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path="https://evergreen-hpwm.onrender.com/" element={<Home/>}/>
        <Route path="https://evergreen-hpwm.onrender.com/collection" element={<Collection/>}/>
        <Route path="https://evergreen-hpwm.onrender.com/mobilecollection" element={<MobileCollection/>}/>
        <Route path="https://evergreen-hpwm.onrender.com/about" element={<About/>}/>
        <Route path="https://evergreen-hpwm.onrender.com/cart" element={<Cart/>}/>
        <Route path="https://evergreen-hpwm.onrender.com/contact" element={<Contact/>}/>
        <Route path="https://evergreen-hpwm.onrender.com/login" element={<Login/>}/>
        <Route path="https://evergreen-hpwm.onrender.com/orders" element={<Orders/>}/>
        <Route path="https://evergreen-hpwm.onrender.com/place-order" element={<PlaceOrder/>}/>
        <Route path="https://evergreen-hpwm.onrender.com/product/:productId" element={<Product/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
