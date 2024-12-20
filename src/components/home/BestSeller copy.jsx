import React, { useEffect, useState } from "react";
import { listproductBy } from "../../api/Produc";
import ProductCard from "../Card/ProductCard";
import SwiperjsShowProduct from "../../utils/SwiperjsShowProduct";
import { SwiperSlide } from "swiper/react";

const BestSeller = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listproductBy("sold", "desc", 12)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(data);

  return (
    <SwiperjsShowProduct>
      {data?.map((item, index) => (
        <SwiperSlide>
        <ProductCard item={item} key={index} />
        </SwiperSlide>
      ))}
    </SwiperjsShowProduct>
  );
};

export default BestSeller;
