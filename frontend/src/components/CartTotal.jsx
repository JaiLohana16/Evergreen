import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from "../components/Title";

const CartTotal = () => {
  const { getCartAmount, delivery_fee, currency } = useContext(ShopContext);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    // Calculate the cart amount and store it in local state
    const amount = getCartAmount();
    setCartAmount(amount);
  }, [getCartAmount]); // Add getCartAmount as a dependency

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>SubTotal</p>
          <p>{currency} {cartAmount}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Total</p>
          <p>{currency}{cartAmount === 0 ? 0 : cartAmount + delivery_fee}.00</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
