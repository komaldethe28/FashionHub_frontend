import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import { Latest, Collection } from "../assets/assets.js";

// import React, { createContext, useState } from 'react';
const LatestCollection = () => {
  const {products}=useContext(ShopContext);
  // console.log(products);


  return (
    <div className='my-10'>
      <div>
        <Title text1={'Latest'} text2={'Collection'}/>
      </div>
        
    </div>
  )
}

export default LatestCollection