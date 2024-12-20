import React, { useEffect } from "react";
import ProductCard from "../components/Card/ProductCard";
import useEcomStore from "../store/ecom";
import SearchCard from "../components/Card/SearchCard";
import CartCard from "../components/Card/CartCard";

const shop = () => {
  // const getCategoty = useEcomStore((state) => state.getCategoty);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className='flex justify-between bg-gray-100'>
      <div className="w-1/4 p-4 bg-gray-100 h-screen">
        <SearchCard />
      </div>

      {/* Product */}
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <p className="text-2xl font-bold mb-4">สินค้าทั้งหมด</p>
        <div className="flex flex-wrap gap-4">
          {/* Product Card */}
          {products?.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}

          {/* Product Card */}
        </div>
      </div>

      <div className="w-1/6 bg-gray-100 p-4 overflow-y-auto">
        <CartCard />
      </div>
    </div>
  );
};

export default shop;
