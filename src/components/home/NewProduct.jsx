import React, { useEffect, useState } from "react";
import { listproductBy } from "../../api/Produc";
import ProductCard from "../Card/ProductCard";

const NewProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listproductBy("updatedAt", "desc", 6)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(data);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {data?.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))}
    </div>
  );
};

export default NewProduct;
