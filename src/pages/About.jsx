import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'


const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, ipsam?</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ex dignissimos explicabo non quod, perspiciatis quidem magnam id dicta officiis?</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.</p>
        </div>
      </div>
      <div className='text-2xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>

        <div className='border px-1 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus odit quod ipsa commodi labore. Voluptatem vitae dolorem praesentium similique rem?
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus odit quod ipsa commodi labore. Voluptatem vitae dolorem praesentium similique rem?
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer:</b>
          <p className='text-gray-600'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus odit quod ipsa commodi labore. Voluptatem vitae dolorem praesentium similique rem?
          </p>
        </div>

      </div>

    <NewsLetterBox/>
    </div>
  )
}

export default About