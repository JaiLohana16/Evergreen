import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios"

import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext()

export const ShopContextProvider = ({ children }) => {

    const currency = 'Rs.'
    const [delivery_fee, setDelivery_fee] = useState(0)
    const backendURl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)
    const [products, setProducts] = useState([])
    const [token, setToken] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const addToCart = async (itemId, colour) => {

        let cartData = structuredClone(cartItems)

        if (!colour) {
            setError("Please Select Colour")
            return
        }
        if (cartData[itemId]) {
            if (cartData[itemId][colour]) {
                cartData[itemId][colour] += 1
                setSuccess("Quantity Updated")
            }
            else {
                cartData[itemId][colour] = 1
                setSuccess("Product Added")
            }
        }

        else {
            cartData[itemId] = {}
            cartData[itemId][colour] = 1
            setSuccess("Product Added")
        }
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendURl + "/api/cart/add", { itemId, colour }, { headers: { token } })
            } catch (error) {
                console.log(error)
                setError(error.message)
            }
        }
    }



    const getCartCount = () => {
        let totalCount = 0
        for (const Idkeys in cartItems) {
            for (const Colourkeys in cartItems[Idkeys]) {
                try {
                    if (cartItems[Idkeys][Colourkeys] > 0) {
                        totalCount += cartItems[Idkeys][Colourkeys]
                    }
                } catch (error) {
                    setError(error)
                }

            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId, colour, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId][colour] = quantity
        setCartItems(cartData)
        if (token) {
            try {
                await axios.post(backendURl + "/api/cart/update", { itemId, colour, quantity }, { headers: { token } })
            } catch (error) {
                setError(error)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0
        for (const Idkeys in cartItems) {
            let iteminfo = products.find((item, index) => item._id == Idkeys)
            for (const colour in cartItems[Idkeys]) {
                try {
                    if (cartItems[Idkeys][colour] > 0) {
                        totalAmount += (iteminfo.price) * cartItems[Idkeys][colour]

                    }
                    if (totalAmount > 0) {
                        setDelivery_fee(100)
                        setIsDisabled(false)
                    }
                    else {
                        setDelivery_fee(0)
                        setIsDisabled(true)
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount

    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendURl + "/api/product/list")
            if (response.data.products) {
                setLoading(false)
                setProducts(response.data.products)
            }
            else {
                setError(response.data.message)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendURl + "/api/cart/get", {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        setError("")
        setTimeout(() => {
            setSuccess("")
        }, 5000);
    }, [cartItems])



    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            getUserCart(localStorage.getItem("token"))
        }
    }, [])




    return (
        <ShopContext.Provider value={{ loading,setLoading,products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, setCartItems, addToCart, error, success, getCartCount, updateQuantity, getCartAmount, isDisabled, navigate, backendURl, setError, setSuccess, token, setToken, getUserCart }}>
            {children}
        </ShopContext.Provider>
    )
}
