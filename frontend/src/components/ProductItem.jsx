import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext)
    return (
        <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
            <img src={image[0]} className='sm:hover:scale-110 transition ease-in-out hover:scale-105 aspect-square' alt="image" />
            <p className='pt-3 pb-1 text-sm '>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
    )
}

export default ProductItem

// products ek array of objects hai jis main 52 objects hai ab har ek object ke andhar _id  name description and sab hai
// ab jo ek product hai uske 4 suppose images hai so ek array main stored hai woh sab so yahan pe abhi sirf bahar jahan pe show karwa rahe hai wahan pe sirf uss array main se phele wale image lene hai woh display karwane hai 


// <Link> tag: The <Link> component (from react-router-dom) acts as a block-level element, which means it will stack its children (the image and paragraphs) vertically.