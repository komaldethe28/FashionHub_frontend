import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

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
    return <div className="opacity-0"></div>;
  }

  return (
    <div className="border-t-2 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* IMAGE SECTION */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">

          {/* Thumbnail images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[180px] w-full">
            {productData.image.map((item, index) => (
              <img key={index} src={item}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer"
                alt="thumbnail"
              />
            ))}
          </div>

          {/* Main image */}
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="main" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Product;
