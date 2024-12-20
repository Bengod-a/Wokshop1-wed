// // import React, { useState, useEffect } from "react";
// // import useEcomStore from "../../store/ecom";
// // import Slider from "rc-slider";
// // import "rc-slider/assets/index.css";
// // import { numberFormat } from "../../utils/number";
// // import { Cpu } from "lucide-react";

// // const SearchCard = () => {
// //   const getProduct = useEcomStore((state) => state.getProduct);
// //   const products = useEcomStore((state) => state.products);
// //   const actionSearchFilters = useEcomStore(
// //     (state) => state.actionSearchFilters
// //   );

// //   const getCategoty = useEcomStore((state) => state.getCategoty);
// //   const categorys = useEcomStore((state) => state.categorys);

// //   const [text, setText] = useState("");
// //   const [categorySelected, setcategorySelected] = useState([]);
// //   const [price, setPrice] = useState([1000, 100000]);
// //   const [ok, setOk] = useState(false);

// //   useEffect(() => {
// //     getCategoty();
// //   }, []);

// //   // Debounce for search functionality
// //   useEffect(() => {
// //     const delay = setTimeout(() => {
// //       if (text) {
// //         actionSearchFilters({ query: text });
// //       } else {
// //         getProduct();
// //       }
// //     }, 100);

// //     return () => clearTimeout(delay);
// //   }, [text]);

// //   const handleCheck = (e) => {
// //     const inCheck = e.target.value;
// //     const inState = [...categorySelected];
// //     const findCheck = inState.indexOf(inCheck);

// //     if (findCheck === -1) {
// //       inState.push(inCheck);
// //     } else {
// //       inState.splice(findCheck, 1);
// //     }
// //     setcategorySelected(inState);

// //     if (inState.length > 0) {
// //       actionSearchFilters({ category: inState });
// //     } else {
// //       getProduct();
// //     }
// //   };

// //   useEffect(() => {
// //     actionSearchFilters({ price });
// //   }, [ok]);

// //   const handlePrice = (value) => {
// //     setPrice(value);
// //     setTimeout(() => {
// //       setOk(!ok);
// //     }, 100);
// //   };

// //   return (
// //     <div className="bg-gradient-to-r   rounded-xl p-8 max-w-xl mx-auto transform transition duration-300 ">
// //       <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
// //         ค้นหาสินค้า
// //       </h1>

// //       {/* Search Input */}
// //       <div className="relative mb-6">
// //         <input
// //           type="text"
// //           value={text}
// //           onChange={(e) => setText(e.target.value)}
// //           className="border border-gray-300 rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-md"
// //           placeholder="ค้นหาสินค้า..."
// //         />
// //         <svg
// //           xmlns="http://www.w3.org/2000/svg"
// //           className="h-6 w-6 text-gray-500 absolute top-3 right-3 pointer-events-none"
// //           fill="none"
// //           viewBox="0 0 24 24"
// //           stroke="currentColor"
// //         >
// //           <path
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //             strokeWidth={2}
// //             d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65l4.35 4.35z"
// //           />
// //         </svg>
// //       </div>

// //       {/* Category Filter */}
// //       <div className="mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
// //           หมวดหมู่สินค้า
// //         </h2>
// //         <div className="flex flex-col ">
// //           {categorys.map((item, index) => (
// //             <div key={index} className="flex items-center py-2 ">
// //               <div
// //               onClick={handleCheck}
// //               className="flex bg-white shadow-md px-5 py-3 items-center w-52 rounded-2xl hover:shadow-sm">
// //                 <Cpu  />
// //                   <span className="px-4">
// //                 {item.name}
// //                   </span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Price Range Filter */}
// //       <div>
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
// //           ค้นหาราคา
// //         </h2>
// //         <div className="mb-4">
// //           <div className="flex justify-between text-sm font-medium text-gray-600">
// //             <span>Min: {numberFormat(price[0])} ฿</span>
// //             <span>Max: {numberFormat(price[1])} ฿</span>
// //           </div>
// //           <Slider
// //             onChange={handlePrice}
// //             range
// //             min={0}
// //             max={100000}
// //             defaultValue={[1000, 30000]}
// //             trackStyle={{ backgroundColor: "#3b82f6" }}
// //             handleStyle={{
// //               borderColor: "#3b82f6",
// //               backgroundColor: "#3b82f6",
// //             }}
// //             railStyle={{ backgroundColor: "#d1d5db" }}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SearchCard;

// import React, { useState, useEffect } from "react";
// import useEcomStore from "../../store/ecom";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import { numberFormat } from "../../utils/number";
// import { NavLink } from "react-router-dom";
// import { Cpu, Monitor, HardDrive, Keyboard } from "lucide-react";

// const categories = [
//   { name: "CPU", icon: <Cpu size={24} className="text-blue-500" /> },
//   { name: "GPU", icon: <Monitor size={24} className="text-red-500" /> },
//   { name: "RAM", icon: <HardDrive size={24} className="text-green-500" /> },
//   { name: "Keyboard", icon: <Keyboard size={24} className="text-yellow-500" /> },
// ];

// const SearchCard = () => {
//   const getProduct = useEcomStore((state) => state.getProduct);
//   const products = useEcomStore((state) => state.products);
//   const actionSearchFilters = useEcomStore(
//     (state) => state.actionSearchFilters
//   );

//   const getCategoty = useEcomStore((state) => state.getCategoty);
//   const categorys = useEcomStore((state) => state.categorys);

//   const [text, setText] = useState("");
//   const [categorySelected, setCategorySelected] = useState([]);
//   const [price, setPrice] = useState([1000, 100000]);
//   const [ok, setOk] = useState(false);

//   const [activeCategory, setActiveCategory] = useState(null);

//   useEffect(() => {
//     getCategoty();
//   }, [getCategoty]);

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       if (text) {
//         actionSearchFilters({ query: text });
//       } else {
//         getProduct();
//       }
//     }, 300);

//     return () => clearTimeout(delay);
//   }, [text, getProduct, actionSearchFilters]);

//   const toggleActive = (categoryId) => {
//     setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
//   };

//   const handleCheck = (categoryName) => {
//     if (categorySelected.includes(categoryName)) {
//       setCategorySelected([]);
//       getProduct();
//     } else {
//       // ถ้าไม่ถูกเลือก ให้เลือกหมวดหมู่ใหม่
//       setCategorySelected([categoryName]);

//       // ฟิลเตอร์สินค้าเฉพาะหมวดหมู่ที่เลือก
//       actionSearchFilters({ category: [categoryName] });
//     }
//   };

//   useEffect(() => {
//     actionSearchFilters({ price });
//   }, [price, actionSearchFilters]);

//   const handlePrice = (value) => {
//     setPrice(value);
//     setTimeout(() => {
//       setOk(!ok);
//     }, 100);
//   };

//   return (
//     <div className="bg-gradient-to-r rounded-xl p-8 max-w-xl mx-auto transform transition duration-300">
//       <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
//         ค้นหาสินค้า
//       </h1>

//       {/* Search Input */}
//       <div className="relative mb-6">
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="border border-gray-300 rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-md"
//           placeholder="ค้นหาสินค้า..."
//         />
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6 text-gray-500 absolute top-3 right-3 pointer-events-none"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65l4.35 4.35z"
//           />
//         </svg>
//       </div>

//       {/* Category Filter */}
//       <div className="mb-8 ">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           หมวดหมู่สินค้า
//         </h2>
//         <div className="flex flex-col ">
//           {categorys.map((item) => (
//             <div className="flex items-center py-2" key={item.id}>
//               <button
//                 onClick={() => {
//                   handleCheck(item.id);
//                   toggleActive(item.id);
//                 }}
//                 className={`flex shadow-md px-5 py-3 items-center w-52 rounded-2xl cursor-pointer ${
//                   activeCategory === item.id
//                     ? "bg-white "
//                     : "bg-gray-200 hover:bg-gray-300"
//                 }`}
//               >
//                  {categories.icon}
//                 <span className="px-2 w-full">{item.name}</span>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Price Range Filter */}
//       {/* <div>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
//           ค้นหาราคา
//         </h2>
//         <div className="mb-4">
//           <div className="flex justify-between text-sm font-medium text-gray-600">
//             <span>Min: {numberFormat(price[0])} ฿</span>
//             <span>Max: {numberFormat(price[1])} ฿</span>
//           </div>
//           <Slider
//             onChange={handlePrice}
//             range
//             min={0}
//             max={100000}
//             value={price} // ใช้ค่า price ใน slider
//             trackStyle={{ backgroundColor: "#3b82f6" }}
//             handleStyle={{
//               borderColor: "#3b82f6",
//               backgroundColor: "#3b82f6",
//             }}
//             railStyle={{ backgroundColor: "#d1d5db" }}
//           />
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default SearchCard;

import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../../utils/number";
import "bootstrap-icons/font/bootstrap-icons.css";



const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );
  const getCategoty = useEcomStore((state) => state.getCategoty);
  const categorys = useEcomStore((state) => state.categorys);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([1000, 100000]);
  const [ok, setOk] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    getCategoty();
  }, [getCategoty]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delay);
  }, [text, getProduct, actionSearchFilters]);

  const toggleActive = (categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleCheck = (categoryName) => {
    if (categorySelected.includes(categoryName)) {
      setCategorySelected([]); // ยกเลิกหมวดหมู่ถ้าเลือกซ้ำ
      getProduct();
    } else {
      setCategorySelected([categoryName]);
      actionSearchFilters({ category: [categoryName] });
    }
  };

  useEffect(() => {
    actionSearchFilters({ price });
  }, [price, actionSearchFilters]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 100);
  };

  return (
    <div className="bg-gradient-to-r rounded-xl p-8 max-w-xl mx-auto transform transition duration-300">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        ค้นหาสินค้า
      </h1>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-md"
          placeholder="ค้นหาสินค้า..."
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500 absolute top-3 right-3 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65l4.35 4.35z"
          />
        </svg>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          หมวดหมู่สินค้า
        </h2>
        <div className="flex flex-col">
          {categorys.map((item) => (
            <div className="flex items-center py-2" key={item.id}>
              <button
                onClick={() => {
                  handleCheck(item.id);
                  toggleActive(item.id);
                }}
                className={`flex shadow-md px-5 py-3 items-center w-52 rounded-2xl cursor-pointer ${
                  activeCategory === item.id
                    ? "bg-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <span className="px-2 w-full">{item.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          ค้นหาราคา
        </h2>
        <div className="mb-4">
          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span>Min: {numberFormat(price[0])} ฿</span>
            <span>Max: {numberFormat(price[1])} ฿</span>
          </div>
          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={100000}
            value={price}
            trackStyle={{ backgroundColor: "#3b82f6" }}
            handleStyle={{
              borderColor: "#3b82f6",
              backgroundColor: "#3b82f6",
            }}
            railStyle={{ backgroundColor: "#d1d5db" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
