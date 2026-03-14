import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../components/Title'

const OrderSuccess = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-[60vh]'>
      <div className='text-center'>
        <div className='text-6xl mb-4'>✅</div>
        <Title text1={'ORDER'} text2={'PLACED SUCCESSFULLY'} />
        <p className='text-gray-600 mt-4 mb-8'>
          Thank you for your order! Your order has been placed successfully.
          You will receive a confirmation email shortly.
        </p>
        <div className='flex gap-4 justify-center'>
          <Link
            to='/'
            className='bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors'
          >
            Continue Shopping
          </Link>
          <Link
            to='/orders'
            className='bg-gray-200 text-black px-8 py-3 rounded-md hover:bg-gray-300 transition-colors'
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess