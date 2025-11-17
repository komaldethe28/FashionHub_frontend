import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find((item) => item._id === productId);
      if (found) {
        setProductData(found);
        setImage(found.image[0]);
      }
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="opacity-0">Loading...</div>;
  }

  return (
    <div className="border-t-2 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* IMAGE SECTION */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">

          {/* Thumbnail images */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto p-1 sm:w-[150px] w-full">
            {productData.image?.map((img) => (
              <img
                key={img}
                src={img}
                onClick={() => setImage(img)}
                className={`h-20 w-20 object-cover rounded-md border cursor-pointer 
                ${image === img ? "border-black" : "border-gray-300"}`}
                alt="thumbnail"
              />
            ))}
          </div>

          {/* Main image */}
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              className="w-full h-auto object-contain rounded-md"
              alt="main"
            />
          </div>

        </div>

        {/* DETAILS SECTION */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Stars */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_dull_icon} className="w-3" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}{productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* SIZE SELECTOR */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>

            <div className="flex gap-2">
              {productData.sizes?.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`border py-2 px-2 bg-gray-100 rounded-md 
                  ${size === s ? "border-orange-500" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={() => {
              if (!size) {
                alert("Please select a size");
                return;
              }
              addToCart(productData._id, size);
            }}
            className="bg-black text-white px-8 py-3 text-sm rounded-md active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          {/* EXTRA INFO */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>

        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border p-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, aperiam.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.</p>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
