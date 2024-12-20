// import React, { useEffect, useState } from "react";
// import { changeUserRole, getListAllUsers } from "../../api/admin";
// import useEcomStore from "../../store/ecom";
// import { changeUserStatus } from "../../api/admin";
// import { toast } from "react-toastify";

// const TableUsers = () => {
//   const token = useEcomStore((s) => s.token);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     hdlGetUsers(token);
//   }, []);

//   const hdlGetUsers = (token) => {
//     getListAllUsers(token)
//       .then((res) => {
//         setUsers(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const hdlChangeUserStatus = (userId, UserStatus) => {
//     console.log(userId, UserStatus);
//     const value = {
//       id: userId,
//       enabled: !useState,
//     };
//     changeUserStatus(token, value)
//       .then((res) => {
//         console.log(res);
//         hdlGetUsers(token);
//       })
//       .catch((err) => console.log(err));
//   };

//   const hdlChangeUserRole = (userId, UserRole) => {
//     // console.log(userId, UserStatus);
//     const value = {
//       id: userId,
//       role: UserRole,
//     };
//     changeUserRole(token, value)
//       .then((res) => {
//         console.log(res);
//         hdlGetUsers(token);
//         toast.success('เปลื่ยนสิทธ์สำเร็จ')
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div>
//       <div className="container mx-auto p-8 bg-white shadow-lg rounded-xl">
//         <table className="w-full">
//           <thead>
//             <tr>
//               <th>ลำดับ</th>
//               <th>Email</th>
//               {/* <th>วันที่แก้ไขล่าสุด</th> */}
//               <th>สิทธิ์</th>
//               <th>สถานะ</th>
//               <th>จัดการ</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users?.map((el, i) => (
//               <tr key={el.id}>
//                 <td>{i + 1}</td>
//                 <td>{el.email}</td>
//                 {/* <td>{el.updatedAt}</td> */}

//                 <td>
//                   <select 
//                   onChange={(e)=>hdlChangeUserRole(el.id, e.target.value)}
//                   value={el.role}>
//                     <option>user</option>
//                     <option>admin</option>
//                   </select>
//                 </td>

//                 <td>{el.enabled ? "เปิดใช้งานอยู่" : "ปิดใช้งาน"}</td>
//                 <td>
//                   <button
//                     className="bg-yellow-300 p-1 rounded-md shadow-md"
//                     onClick={() => hdlChangeUserStatus(el.id, el.enabled)}
//                   >
//                     {el.enabled ? "ปิด" : "เปิด"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TableUsers;


import React, { useEffect, useState } from "react";
import { changeUserRole, getListAllUsers, changeUserStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEcomStore((s) => s.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    hdlGetUsers(token);
  }, []);

  const hdlGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
      });
  };

  const hdlChangeUserStatus = (userId, currentStatus) => {
    const value = {
      id: userId,
      enabled: !currentStatus, // Toggle the current status
    };
    changeUserStatus(token, value)
      .then((res) => {
        toast.success("เปลี่ยนสถานะสำเร็จ");
        hdlGetUsers(token);
      })
      .catch((err) => {
        console.error(err);
        toast.error("เกิดข้อผิดพลาดในการเปลี่ยนสถานะ");
      });
  };

  const hdlChangeUserRole = (userId, newRole) => {
    const value = {
      id: userId,
      role: newRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        toast.success("เปลี่ยนสิทธิ์สำเร็จ");
        hdlGetUsers(token);
      })
      .catch((err) => {
        console.error(err);
        toast.error("เกิดข้อผิดพลาดในการเปลี่ยนสิทธิ์");
      });
  };

  return (
    <div>
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-xl">
        <table className="w-full">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>Email</th>
              <th>สิทธิ์</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((el, i) => (
              <tr key={el.id}>
                <td>{i + 1}</td>
                <td>{el.email}</td>
                <td>
                  <select
                    onChange={(e) => hdlChangeUserRole(el.id, e.target.value)}
                    value={el.role} // Ensure correct role is displayed
                    className="bg-gray-100 border p-1 rounded-md"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td>{el.enabled ? "เปิดใช้งานอยู่" : "ปิดใช้งาน"}</td>
                <td>
                  <button
                    className={`p-2 rounded-md shadow-md ${
                      el.enabled ? "bg-red-500 text-white" : "bg-green-500 text-white"
                    }`}
                    onClick={() => hdlChangeUserStatus(el.id, el.enabled)}
                  >
                    {el.enabled ? "ปิด" : "เปิด"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableUsers;
