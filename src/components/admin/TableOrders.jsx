// import React, { useEffect, useState } from "react";
// import { getOrdersadmin, changeStatus } from "../../api/admin";
// import useEcomStore from "../../store/ecom";
// import { toast } from "react-toastify";
// import { numberFormat } from "../../utils/number";
// import { dateFormat } from "../../utils/datefomat";

// const TableOrders = () => {
//   const token = useEcomStore((s) => s.token);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     hdlgetOrders(token);

//   }, []);

//   const hdlgetOrders = (token) => {
//     getOrdersadmin(token)
//       .then((res) => {
//         setOrders(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const hdlChangeStatus = (token, orderId, orderStatus) => {
//     console.log(orderId, orderStatus);
//     changeStatus(token, orderId, orderStatus)
//       .then((res) => {
//         console.log(res);
//         toast.success("อัพเดท Status สำเร็จ");
//         hdlgetOrders(token);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };


//   const getStatusColor = (satatus)=>{
//     switch (satatus){
//       case "Not Process":
//         return 'bg-gray-200'
//          case "Processing":
//         return 'bg-blue-200'
//          case "Completed":
//         return 'bg-green-200'
//          case "Cancel":
//         return 'bg-red-400'
//     }
//   }




//   return (
//     <div className="container mx-auto p-8 bg-white shadow-lg rounded-xl">
//       <div>
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-200 border">
//               <th>ลำดับ</th>
//               <th>ผู้ใช้งาน</th>
//               <th>วันที่</th>
//               <th>สินค้า</th>
//               <th>รวม</th>
//               <th>สถานะ</th>
//               <th>จัดการ</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders?.map((item, index) => {
//               // console.log(item);
//               return (
//                 <tr key={index} className="border">
//                   <td className="text-center">{index + 1}</td>
//                   <td>{item.orderby.email}</td>
//                   <td>{item.orderby.address}</td>

//                   <td>
//                      {dateFormat(item.createdAt)}
//                   </td>

//                   <td className="px-2 py-4">
//                     {item.products?.map((product, index) => (
//                       <li key={index}>
//                         {product.product.title} {"  "}
//                         <span className="text-sm">
//                           {product.count} x {numberFormat(product.price)}
//                         </span>
//                       </li>
//                     ))}
//                   </td>

//                   <td>{ numberFormat(item.cartTotal)}</td>

//                   <td>
//                     <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
//                       {item.orderStatus}
//                     </span>
//                   </td>

//                   <td
//                     onChange={(e) =>
//                       hdlChangeStatus(token, item.id, e.target.value)
//                     }
//                   >
//                     <select value={item.orderStatus}>
//                       <option>Not Process</option>
//                       <option>Processing</option>
//                       <option>Completed</option>
//                       <option>Cancel</option>
//                     </select>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TableOrders;


import React, { useEffect, useState } from "react";
import { getOrdersadmin, changeStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/datefomat";

const TableOrders = () => {
  const token = useEcomStore((s) => s.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlgetOrders(token);
  }, []);

  const hdlgetOrders = (token) => {
    getOrdersadmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const hdlChangeStatus = (token, orderId, orderStatus) => {
    changeStatus(token, orderId, orderStatus)
      .then((res) => {
        toast.success("อัพเดทสถานะสำเร็จ");
        hdlgetOrders(token);
      })
      .catch((err) => {
        console.error(err);
        toast.error("เกิดข้อผิดพลาดในการอัพเดทสถานะ");
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
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">รายการคำสั่งซื้อ</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="px-4 py-2 border">ลำดับ</th>
              <th className="px-4 py-2 border">ผู้ใช้งาน</th>
              <th className="px-4 py-2 border">ที่อยู่</th>
              <th className="px-4 py-2 border">วันที่</th>
              <th className="px-4 py-2 border">สินค้า</th>
              <th className="px-4 py-2 border">รวม</th>
              <th className="px-4 py-2 border">สถานะ</th>
              <th className="px-4 py-2 border">จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item, index) => (
              <tr key={index} className="text-center border hover:bg-gray-100 transition">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{item.orderby.email}</td>
                <td className="px-4 py-2 border">{item.orderby.address}</td>
                <td className="px-4 py-2 border">{dateFormat(item.createdAt)}</td>
                <td className="px-4 py-2 border">
                  <ul className="list-disc list-inside">
                    {item.products?.map((product, idx) => (
                      <li key={idx}>
                        {product.product.title} ({product.count} x {numberFormat(product.price)})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 border">{numberFormat(item.cartTotal)}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`${getStatusColor(
                      item.orderStatus
                    )} px-3 py-1 rounded-full font-semibold flex items-center justify-center`}
                  >
                    {item.orderStatus}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-800 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={item.orderStatus}
                    onChange={(e) =>
                      hdlChangeStatus(token, item.id, e.target.value)
                    }
                  >
                    <option value="Not Process">Not Process</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
