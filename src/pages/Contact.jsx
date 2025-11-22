import React from 'react'
import Title from '../components/Title'
// import assets from '../assets/assets'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='flex flex-col justify-center my-10 md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>address: Lorem ipsum dolor sit amet,<br />ctetur adipisicing elit. Dolore, earum.</p>

          <p className='text-gray-500'>Tel: (+91) 89404 03333<br />FashionHub@gmail.com</p>

          <p className='font-semibold text-xl text-gray-600'>@ Komal Dethe</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact