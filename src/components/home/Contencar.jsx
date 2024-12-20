import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";

const Contencar = () => {
  const [data, setData] = useState([]); // State สำหรับเก็บรูปภาพ

  useEffect(() => {
    fetchImages();
  }, []);

  // Function ดึงรูปจาก API
  const fetchImages = () => {
    axios
      .get("https://picsum.photos/v2/list?page=1&limit=10") // ใช้ Picsum API
      .then((res) => {
        setData(res.data); // Set รูปภาพลงใน state
      })
      .catch((err) => {
        console.error("Error fetching images:", err);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      {/* Swiper ตัวแรก - ขนาดใหญ่เต็มความกว้าง */}
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper rounded-lg shadow-md mb-8"
      >
        {data.length > 0 ? (
          data.map((item) => (
            <SwiperSlide key={item.id}>
              <img
                src={item.download_url}
                alt={`Image by ${item.author}`}
                className="w-full h-[400px] object-cover rounded-lg"
                loading="lazy"
              />
            </SwiperSlide>
          ))
        ) : (
          <div className="text-center text-gray-500 py-20">
            กำลังโหลดรูปภาพ...
          </div>
        )}
      </Swiper>

      {/* Swiper ตัวที่สอง - แสดงหลายรูปแบบเลื่อน */}
      <Swiper
        slidesPerView={4} // แสดง 4 รูปต่อหน้าจอ
        spaceBetween={20}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper rounded-lg shadow-md"
      >
        {data.length > 0 ? (
          data.map((item) => (
            <SwiperSlide key={item.id}>
              <img
                src={item.download_url}
                alt={`Image by ${item.author}`}
                className="w-full h-[200px] object-cover rounded-md"
                loading="lazy"
              />
            </SwiperSlide>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            กำลังโหลดรูปภาพ...
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default Contencar;
