
// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { Link } from 'react-router-dom';
// const Cart = () => {
//   const { products, currency} = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);


// //   useEffect(() => {
// //     const fetchCartData = async () => {
// //       const updatedCartData = await Promise.all(
// //         cartItems.map(async (item) => {
// //           const productData = products.find((product) => product._id === item.Id);
// //           return { ...productData, quantity: item.quantity };
// //         })
// //       );
// //       setCartData(updatedCartData);
// //     };

// //     fetchCartData();
// // }, [cartItems, products]);

// //   const deleteProducts=(indexclicked)=>{
// //     const cpydata=[...cartData]
// //     let updated =cpydata.filter((item,index)=>{
// //       index!=indexclicked
// //     })
// //     setCartData(updated)

// //   }





//   return (
//     <div>
//       {cartData.length > 0 ? (
//         cartData.map((item, index) => (
//           <div key={index} className='flex gap-5 m-5'>
//             <Link to={`/product/${item._id}`}><img src={item.image[0]} alt="image" className='w-24' />
//             </Link>            
//             <div>
//             <p>{item.name}</p>
//             <p>{currency} {(item.price*10)-1}</p>
//             <p>Quantity: {item.quantity}</p>
//             <button onClick={()=>deleteProducts(index)}>Delete</button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, isDisabled, navigate, token, getUserCart } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])


  // const handleDelete=(item,clickedIndex)=>{
  //   const updated=cartData.filter((item,index)=>{
  //     index!=clickedIndex
  //     item.quantity -= 1
  //   })
  //   setCartData(updated)
  // }
  // useEffect(() => {
  //   if (products.length > 0) {
  //     const Data = []
  //     for (const Idkeys in cartItems) {
  //       for (const Sizekeys in cartItems[Idkeys]) {
  //         if (cartItems[Idkeys][Sizekeys] > 0) {
  //           Data.push({
  //             _id: Idkeys,
  //             size: Sizekeys,
  //             quantity: cartItems[Idkeys][Sizekeys]
  //           })
  //         }
  //       }
  //     }
  //     setCartData(Data)
  //   }
  // }, [cartItems,products])

  useEffect(() => {
    console.log('Cart Items:', cartItems);
    console.log('Products:', products);

    if (products.length > 0) {
      const Data = [];
      for (const Idkeys in cartItems) {
        for (const Colourkeys in cartItems[Idkeys]) {
          if (cartItems[Idkeys][Colourkeys] > 0) {
            Data.push({
              _id: Idkeys,
              colour: Colourkeys,
              quantity: cartItems[Idkeys][Colourkeys],
            });
          }
        }
      }
      console.log('Cart Data:', Data); // Add this log to see the constructed cart data
      setCartData(Data);
    }
  }, [cartItems, products]);
  useEffect(() => {
    getUserCart(token)
  }, [token])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div className=''>

        {
          cartData.map((item, index) => {
            const selectedItem = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img src={selectedItem.image[0]} alt="image" className='w-16 sm:w-20' />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{selectedItem.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{selectedItem.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.colour}</p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) => e.target.value === "0" || e.target.value === "" ? null : updateQuantity(item._id, item.colour, Number(e.target.value))}
                  type="number"
                  min={1}
                  value={item.quantity}
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                />
                <img src={assets.bin_icon} alt="delete" className='w-4 mr-4 sm:w-5 cursor-pointer' onClick={() => updateQuantity(item._id, item.colour, 0)} />
              </div>
            )
          })
        }


      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate("/place-order")} className={`bg-black text-white text-sm my-8 px-8 py-3`} disabled={isDisabled}>
              {isDisabled ? <Link to={"/collection"}>ADD ITEMS</Link> : "CHECKOUT"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
