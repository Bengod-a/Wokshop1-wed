// import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom'

// const loadingToRedirect = () => {

//   const [count, setCount] = useState(10)
//   const [redirect, setRedirect] = useState(false)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCount((currenCount) => {
//         if (currenCount === 1) {
//           clearInterval(interval)
//           setRedirect(true)
//         }
//         return currenCount - 1
//       })

//     }, 1000)
//     return () => clearInterval (interval)
//   }, [])

//   if(redirect){
//     return <Navigate to={'/'} />
//   }




//   return (
//     <div>No Permission, Redirrect in {count}</div>
//   )
// }

// export default loadingToRedirect


import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3); // เริ่มต้น 3 วินาที
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount <= 0.5) {
          clearInterval(interval); // หยุด interval
          setRedirect(true); // เปลี่ยน state redirect
        }
        return currentCount - 0.5;
      });
    }, 1000); // นับถอยหลังทีละ 1 วินาที

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
  }, []);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex items-center justify-center h-screen text-2xl font-bold text-gray-800">
      No Permission, Redirect in {count} seconds...
    </div>
  );
};

export default LoadingToRedirect;
