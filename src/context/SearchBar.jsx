import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { ShopContext } from './ShopContext';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible]=useState(false)
    const location= useLocation();

    useEffect(() => {
        // show the search bar only on the collection page when the context allows it
        if (location?.pathname?.toLowerCase().includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location?.pathname, showSearch])


    return showSearch && visible ? (
        <div className='border-t border-b bg-gray-50'>
                <div className='flex items-center mx-auto border border-gray-300 px-3 py-2 my-4 rounded-full w-full sm:w-3/4 md:w-1/2 lg:w-1/3'>
                        <img className='w-5 sm:w-4 mr-3 opacity-60' src={assets.search_icon} alt="Search Icon" />
                        <input 
                                type="text" 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                                placeholder="Search products..." 
                                aria-label='Search products'
                                className="flex-1 outline-none bg-inherit text-sm sm:text-base"/>
                        <button onClick={()=>setShowSearch(false)} aria-label='Close search' className='ml-2 p-2 rounded hover:bg-gray-100'>
                            <img className='w-5 sm:w-4' src={assets.cross_icon} alt="Close Search" />
                        </button>
                </div>
        </div>
    ) : null;
}

export default SearchBar