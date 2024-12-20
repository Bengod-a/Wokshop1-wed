import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom";
import { createProduct, deleteProduct } from "../../api/Produc";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/datefomat";
import { motion } from "motion/react";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const Formproduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategoty = useEcomStore((state) => state.getCategoty);
  const categorys = useEcomStore((state) => state.categorys);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategoty();
    getProduct(200);
  }, []);

  const handleOnchange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      setForm(initialState);
      getProduct();
      toast.success(`เพิ่มข้อมูล ${res.data.product.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
    }
  };

  const hadleDelete = (id) => {
    Swal.fire({
      title: "ยืนยันการลบ",
      text: "คุณแน่ใจหรือไม่ที่จะลบรายการนี้?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      reverseButtons: false,
      customClass: {
        confirmButton: "bg-green-500 text-white px-4 py-2 rounded",
        cancelButton: "bg-red-500 text-white px-4 py-2 rounded",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteProduct(token, id);
          console.log(res);
          toast.success("ลบสินค้าแล้ว");
          getProduct();
        } catch (err) {
          console.log(err);
        }
      } else if (result.isDismissed) {
        console.log("Cancelled");
      }
    });
  };

  return (
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}  >
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-700">
            เพิ่มข้อมูลสินค้า
          </h1>
          <p className="text-center text-gray-500">
            กรอกข้อมูลด้านล่างเพื่อเพิ่มสินค้าใหม่
          </p>
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
              เพิ่มสินค้า
            </button>
          </div>
        </form>
        <div className="mt-8 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            รายการสินค้า
          </h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">No.</th>
                <th className="px-4 py-2 text-left text-gray-600">
                  รูปสิ้นค้า
                </th>
                <th className="px-4 py-2 text-left text-gray-600">
                  ชื่อสินค้า
                </th>
                <th className="px-4 py-2 text-left text-gray-600">
                  รายละเอียด
                </th>
                <th className="px-4 py-2 text-right text-gray-600">ราคา</th>
                <th className="px-4 py-2 text-right text-gray-600">จำนวน</th>
                <th className="px-4 py-2 text-right text-gray-600">ขายได้</th>
                <th className="px-4 py-2 text-left text-gray-600">
                  อัปเดตวันที่
                </th>
                <th className="px-4 py-2 text-center text-gray-600">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={item.id} className="border-t ">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td>
                    {item.images.length > 0 ? (
                      <img
                        className="w-24 h-24 rounded shadow-md"
                        src={item.images[0].url}
                      />
                    ) : (
                      <div className="w-24 bg-gray-200 rounded-md flex items-center justify-center shadow-sm text-red-500">
                        No image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2 text-right">
                    {numberFormat(item.price)}
                  </td>
                  <td className="px-4 py-2 text-right">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">{item.sold}</td>
                  <td className="px-4 py-2">{dateFormat(item.updatedAt)}</td>
                  <td className="px-4 py-2 text-center space-x-2 justify-center flex items-center mt-6">
                    <Link
                      to={`/admin/product/${item.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-yellow-600
                     hover:scale-105 hover:translate-y-1 hover:duration-200"
                    >
                      <Pencil />
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-600
                    hover:scale-105 hover:translate-y-1 hover:duration-200"
                      onClick={() => hadleDelete(item.id)}
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Formproduct;
