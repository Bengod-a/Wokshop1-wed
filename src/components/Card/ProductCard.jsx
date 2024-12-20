// import { ShoppingCart } from "lucide-react";
// import React from "react";
// import useEcomStore from "../../store/ecom";
// import { numberFormat } from "../../utils/number";
// import { motion } from "motion/react";


// const ProductCard = ({ item }) => {
//   const actionAddtocart = useEcomStore((state)=>state.actionAddtocart)

//   return (
//     <motion.div
//       className="box"
//       initial={{ opacity: 0, scale: 0.5 }}
//       animate={{ opacity: 1, scale: 1 }}  >
//     <div className="border bg-white  rounded-md shadow-md p-8 w-64 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
//       <div className="relative">
//         {item.images && item.images.length > 0 ? (
//           <img
//             className="rounded-md w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
//             src={item.images[0].url}
//             alt={item.title}
//           />
//         ) : (
//           <div className="w-full h-40 bg-gray-200 rounded-md text-center flex items-center justify-center shadow-md">
//             No image
//           </div>
//         )}
//       </div>

//       <div className="py-4">
//         <p className="text-sm font-semibold mt-0 leading-5">{item.title}</p>
//         <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
//       </div>

//       <div className="flex justify-between items-center mt-4">
//         <span style={{color:"rgb(43, 52, 69)"}} className="text-lg leading-5 font-mono">฿{numberFormat(item.price)} </span>
//         <button 
//         onClick={()=>actionAddtocart(item)}
//         className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 shadow-md transition-all duration-300">
//           <ShoppingCart size={18} />
//         </button>
//       </div>
//     </div>
//     </motion.div>
//   );
// };

// export default ProductCard;


import { ShoppingCart } from "lucide-react";
import React from "react";
import useEcomStore from "../../store/ecom";
import { numberFormat } from "../../utils/number";
import { motion } from "motion/react";

const ProductCard = ({ item }) => {
  const actionAddtocart = useEcomStore((state) => state.actionAddtocart);

  return (
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="border bg-white rounded-md shadow-md p-8 w-64 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="relative flex-grow">
          {item.images && item.images.length > 0 ? (
            <img
              className="rounded-md w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
              src={item.images[0].url}
              alt={item.title}
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded-md text-center flex items-center justify-center shadow-md">
              No image
            </div>
          )}
        </div>

        <div className="py-4 flex-grow">
          <p className="text-sm font-semibold mt-0 leading-5">{item.title}</p>
          <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span
            style={{ color: "rgb(43, 52, 69)" }}
            className="text-lg leading-5 font-mono"
          >
            ฿{numberFormat(item.price)}
          </span>
          <button
            onClick={() => actionAddtocart(item)}
            className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 shadow-md transition-all duration-300"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
