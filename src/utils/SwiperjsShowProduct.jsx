// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// // Import Swiper modules
// import { Pagination, Autoplay, Navigation } from "swiper/modules";
// import axios from "axios";

// const SwiperjsShowProduct = ({ children }) => {
//   return (
//     <Swiper
//       slidesPerView={4}
//       spaceBetween={20}
//       navigation={true}
//       autoplay={{
//         delay: 3000,
//         disableOnInteraction: false,
//       }}
//       breakpoints={{
//         320: {
//             slidesPerView: 2,
//             spaceBetween: 20,
//           },
//         640: {
//           slidesPerView: 3,
//           spaceBetween: 20,
//         },
//         768: {
//           slidesPerView: 4,
//           spaceBetween: 40,
//         },
//         1024: {
//           slidesPerView: 5,
//           spaceBetween: 50,
//         },
//       }}
//       modules={[Pagination, Autoplay, Navigation]}
//       className="mySwiper rounded-lg shadow-md"
//     >
//       {children}
//     </Swiper>
//   );
// };

// export default SwiperjsShowProduct;


import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const SwiperjsShowProduct = ({ children }) => {
  return (
    <div className="w-full h-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper rounded-lg shadow-md"
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperjsShowProduct;
