import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import useEcomStore from "../../store/ecom";
import { Link } from "react-router-dom";
import { numberFormat } from "../../utils/number";


const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemovProduct = useEcomStore((state) => state.actionRemovProduct);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  //   console.log(carts);

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        ตะกร้าสินค้า
      </h1>
      {carts.map((item, index) => (
        <div className="p-2" key={index}>
          {/* Card Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            {/* Product Info */}

            <div className="flex justify-between items-center">
              {/* Left */}
              <div className="flex gap-4 items-center">
                {item.images && item.images.length > 0 ? (
                  <img
                    className="w-20 h-20 bg-gray-200 rounded-md"
                    src={item.images[0].url}
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-md flex justify-center items-center text-sm text-gray-500">
                    No Image
                  </div>
                )}

                <div>
                  <p className="text-lg font-bold text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              {/* Right */}
              <div
                onClick={() => actionRemovProduct(item.id)}
                className="text-red-500 cursor-pointer hover:text-red-600 transition"
              >
                <Trash2 size={24} />
              </div>
            </div>

            {/* Quantity and Price */}
            <div className="flex justify-between items-center mt-4">
              {/* Quantity */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                  className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                >
                  <Minus size={16} strokeWidth="2" color="#454545" />
                </button>

                <span className="text-lg font-semibold text-gray-800">
                  {item.count}
                </span>

                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  <Plus size={16} strokeWidth="2" />
                </button>
              </div>
              {/* Price */}
              <div className="text-lg font-bold text-gray-800">
                { numberFormat(item.price  * item.count) }
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Total Section */}
      <div className="bg-white p-4 mt-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-600">รวม</span>
          <span className="text-xl font-bold text-gray-800">
            ฿{numberFormat(getTotalPrice()) }
          </span>
        </div>

      {
        carts.length
        ?<Link to={"/cart"}>
        <button className="mt-4 w-full bg-green-500 text-white py-3 rounded-md text-lg font-medium shadow-md hover:bg-green-600 transition">
          ดำเนินการต่อ
        </button>
      </Link>
        : <Link 
        >
        <button 
        className={`${
            carts.length < 1 
            ?"mt-4 w-full bg-gray-400 text-white  py-3 rounded-md text-lg font-medium shadow-md "
            :"mt-4 w-full bg-green-500 text-white py-3 rounded-md text-lg font-medium shadow-md hover:bg-green-600 transition"
          }`}
          >
          ดำเนินการต่อ
        </button>
      </Link>
      }

        
      </div>
    </div>
  );
};

export default CartCard;
