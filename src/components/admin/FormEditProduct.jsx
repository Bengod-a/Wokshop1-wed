// import React, { useState, useEffect, } from "react";
// import useEcomStore from "../../store/ecom";
// import { createProduct,readProduct,listProduct, updateProduct } from "../../api/Produc";
// import { toast } from "react-toastify";
// import Uploadfile from "./Uploadfile";
// import { useParams, useNavigate } from "react-router-dom";

// const initialState = {
//   title: "Notebook",
//   description: "desc",
//   price: 1000,
//   quantity: 10,
//   categoryId: "",
//   images: [],
// };

// const FormEditProduct = () => {
//     const { id } = useParams()
//     const navigate = useNavigate

//   const token = useEcomStore((state) => state.token);
//   const getCategoty = useEcomStore((state) => state.getCategoty);
//   const categorys = useEcomStore((state) => state.categorys);
//   const [form, setForm] = useState(initialState);
//   // console.log(products);

//   useEffect(() => {
//     // code
//     getCategoty(token);
//     fetchProduct(token,id, form)
//   }, []);

//   const fetchProduct = async(token, id ,form)=>{
//     try{
//         const res = await readProduct(token, id, form)
//         console.log('res form backend', res);
//         setForm(res.data)
//     }catch(err){
//         console.log('Err fetch data');
//     }
//   }

//   const handleOnchange = (e) => {
//     console.log(e.target.name, e.target.value);
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await updateProduct(token, id, form);
//       console.log(res);
//       toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
//       navigate('/admin/product')
//     } catch (err) {
//         console.log(err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 bg-white shadow-md">
//       <form onSubmit={handleSubmit}>
//         <h1>เพิ่มข้อมูลสินค้า</h1>
//         <input
//           type="text"
//           className="border"
//           value={form.title}
//           onChange={handleOnchange}
//           placeholder="Title"
//           name="title"
//         />
//         <input
//           type="text"
//           className="border"
//           value={form.description}
//           onChange={handleOnchange}
//           placeholder="Description"
//           name="description"
//         />
//         <input
//           type="number"
//           className="border"
//           value={form.price}
//           onChange={handleOnchange}
//           placeholder="price"
//           name="price"
//         />
//         <input
//           type="number"
//           className="border"
//           value={form.quantity}
//           onChange={handleOnchange}
//           placeholder="quantity"
//           name="quantity"
//         />
//         <select
//           className="boder"
//           name="categoryId"
//           onChange={handleOnchange}
//           required
//           value={form.categoryId}
//         >
//           <option value="" disabled>
//             Please Select
//           </option>

//           {categorys.map((item, index) => (
//             <option key={index} value={item.id}>
//               {item.name}
//             </option>
//           ))}
//         </select>
//         <hr />

//           <Uploadfile  form={form} setForm={setForm}/>


//         <button  className="bg-green-500">เพิ่มสินค้า</button>

//         <hr />
//         <br />
        
//       </form>
//     </div>
//   );
// };

// export default FormEditProduct;

import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom";
import { readProduct, updateProduct } from "../../api/Produc";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "Notebook",
  description: "desc",
  price: 1000,
  quantity: 10,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = useEcomStore((state) => state.token);
  const getCategoty = useEcomStore((state) => state.getCategoty);
  const categorys = useEcomStore((state) => state.categorys);
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategoty();
    fetchProduct(token, id);
  }, []);

  const fetchProduct = async (token, id) => {
    try {
      const res = await readProduct(token, id);
      setForm(res.data);
    } catch (err) {
      console.log("Error fetching product data", err);
    }
  };

  const handleOnchange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`แก้ไขข้อมูล ${res.data.title} สำเร็จ!`);
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-xl">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-center text-gray-700">แก้ไขข้อมูลสินค้า</h1>
        <p className="text-center text-gray-500">กรอกข้อมูลด้านล่างเพื่อปรับปรุงสินค้า</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              ชื่อสินค้า
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleOnchange}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="ชื่อสินค้า"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              รายละเอียดสินค้า
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleOnchange}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="รายละเอียดสินค้า"
              rows={4}
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              ราคา (บาท)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={form.price}
              onChange={handleOnchange}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="ราคา"
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-600"
            >
              จำนวนสินค้า
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleOnchange}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="จำนวนสินค้า"
            />
          </div>
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-600"
            >
              หมวดหมู่สินค้า
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={form.categoryId}
              onChange={handleOnchange}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="" disabled>
                เลือกหมวดหมู่
              </option>
              {categorys.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Uploadfile form={form} setForm={setForm} />
        <div className="text-center">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            บันทึกการเปลี่ยนแปลง
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditProduct;
