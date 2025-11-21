import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
// import assets from '../assets/assets';
import { assets } from '../assets/assets';
import CarTotal from '../components/CarTotal';
import PlaceOrder from './PlaceOrder';

const Cart = () => {

  const { products, currency, cartItem, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItem[productId][size]
          });
        }
      }
    }

    setCartData(tempData);

  }, [cartItem]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      <div className='flex flex-col gap-6'>
        {cartData.map((item, index) => {
          const product = products.find((p) => p._id === item._id);
          if (!product) return null;

          return (
            <div
              key={index}
              className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-6 border-b pb-5"
            >

              {/* Product Image */}
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />

              {/* Product Info */}
              <div>
                <p className="text-lg font-medium">{product.name}</p>

                <p className="text-gray-700 font-semibold">
                  {currency}{product.price}
                </p>

                <span className="inline-block mt-1 px-3 py-1 bg-gray-200 rounded text-sm">
                  {item.size}
                </span>
              </div>

              {/* Quantity box (center aligned like screenshot) */}
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, item.size, Number(e.target.value))}
                className="border w-16 px-2 py-1 rounded"
                style={{
                  appearance: "auto",
                  WebkitAppearance: "auto",
                  MozAppearance: "textfield"
                }}
              />


              {/* Delete Icon */}
              <img onClick={() => updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                alt="delete"
                className="w-5 cursor-pointer opacity-70 hover:opacity-100"
              />
            </div>

          );
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CarTotal />

          <div className='w-full text-end'>
            <button onClick={()=> navigate('/place-order')} className='bg-black text-white text-sm my-8 py-3'>Proceed to Checkout</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
