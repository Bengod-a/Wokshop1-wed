// import React, { useState, useEffect } from "react";
// import { getOrders } from "../../api/User";
// import useEcomStore from "../../store/ecom";
// import { dateFormat } from "../../utils/datefomat";
// import { numberFormat } from "../../utils/number";

// const HistoryCard = () => {
//   const token = useEcomStore((s) => s.token);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     hdlgetOrders(token);
//   }, []);

//   const hdlgetOrders = (token) => {
//     getOrders(token)
//       .then((res) => {
//         // console.log(res);
//         setOrders(res.data.order);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const getStatusColor = (satatus) => {
//     switch (satatus) {
//       case "Not Process":
//         return "bg-gray-200";
//       case "Processing":
//         return "bg-blue-200";
//       case "Completed":
//         return "bg-green-200";
//       case "Cancel":
//         return "bg-red-400";
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อ</h1>

//       {/* คลุม  */}
//       <div className="">
//         {/* Card */}
//         {orders?.map((item, index) => {
//           // console.log(item);
//           return (
//             <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
//               {/* Header */}
//               <div className="flex justify-between">
//                 <div>
//                   <p className="text-sm">Order date</p>
//                   <p className="font-bold">{dateFormat(item.updatedAt)}</p>
//                 </div>
//                 <div>
//                   <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
//                     {item.orderStatus}
//                   </span>
//                 </div>
//               </div>

//               {/* table Loob product */}
//               <div>
//                 <table className="border w-full ">
//                   <thead>
//                     <tr className="bg-gray-200">
//                       <th>สินค้า</th>
//                       <th>ราคา</th>
//                       <th>จำนวน</th>
//                       <th>ราคารวม</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {item.products?.map((product, index) => {
//                       return (
//                         <tr key={index}>
//                           <td>{product.product?.title || "ไม่พบชื่อสินค้า"}</td>
//                           <td>{numberFormat(product.price)}</td>
//                           <td>{product.count}</td>
//                           <td>{numberFormat(product.price * product.count)}</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>

//               {/* total */}
//               <div>
//                 <div className="text-right">
//                   <p>รวมสุทธิ</p>
//                   <p>{numberFormat(item.cartTotal)}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default HistoryCard;


import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/User";
import useEcomStore from "../../store/ecom";
import { dateFormat } from "../../utils/datefomat";
import { numberFormat } from "../../utils/number";

const HistoryCard = () => {
  const token = useEcomStore((s) => s.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders(token);
  }, []);

  const fetchOrders = (token) => {
    getOrders(token)
      .then((res) => {
        setOrders(res.data.order || []); // กรณีไม่มีคำสั่งซื้อ
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-200 text-gray-800";
      case "Processing":
        return "bg-blue-200 text-blue-800";
      case "Completed":
        return "bg-green-200 text-green-800";
      case "Cancel":
        return "bg-red-400 text-white";
      default:
        return "bg-gray-400 text-gray-100"; // กรณีสถานะไม่ได้ระบุ
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">ประวัติการสั่งซื้อ</h1>

      {/* กรณีไม่มีคำสั่งซื้อ */}
      {orders.length === 0 ? (
        <p className="text-gray-500">ไม่มีประวัติการสั่งซื้อในขณะนี้</p>
      ) : (
        <div className="space-y-6">
          {/* รายการคำสั่งซื้อ */}
          {orders.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-md shadow-lg">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold text-gray-800">{dateFormat(item.updatedAt)}</p>
                </div>
                <div>
                  <span
                    className={`${getStatusColor(
                      item.orderStatus
                    )} px-3 py-1 rounded-full font-medium`}
                  >
                    {item.orderStatus}
                  </span>
                </div>
              </div>

              {/* Product Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-300 rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 text-gray-800">
                      <th className="px-4 py-2 border">สินค้า</th>
                      <th className="px-4 py-2 border">ราคา</th>
                      <th className="px-4 py-2 border">จำนวน</th>
                      <th className="px-4 py-2 border">ราคารวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products?.map((product, index) => (
                      <tr key={index} className="text-center border-t">
                        <td className="px-4 py-2">{product.product?.title || "ไม่พบชื่อสินค้า"}</td>
                        <td className="px-4 py-2">{numberFormat(product.price)}</td>
                        <td className="px-4 py-2">{product.count}</td>
                        <td className="px-4 py-2">
                          {numberFormat(product.price * product.count)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="text-right mt-4">
                <p className="text-gray-600">รวมสุทธิ</p>
                <p className="text-xl font-semibold text-gray-800">
                  {numberFormat(item.cartTotal)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryCard;
