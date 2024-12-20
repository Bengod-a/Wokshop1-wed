import React, { useState, useEffect } from 'react';
import { createCategory, removeCategory } from '../../api/Category';
import useEcomStore from '../../store/ecom';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState('');
  const categorys = useEcomStore((state) => state.categorys);
  const getCategoty = useEcomStore((state) => state.getCategoty);

  useEffect(() => {
    getCategoty(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning('Please fill in the category name');
    }

    try {
      const res = await createCategory(token, { name });
      toast.success(`เพิ่มหมวดหมู่ ${res.data.name} สำเร็จ!`);
      setName(''); // Clear input after submission
      getCategoty(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      toast.success(`ลบหมวดหมู่ ${res.data.name} สำเร็จ!`);
      getCategoty(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">จัดการหมวดหมู่</h1>
      <form className="flex items-center space-x-4 mb-6" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="เพิ่มชื่อหมวดหมู่"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-200"
        >
          เพิ่ม
        </button>
      </form>
      <hr className="mb-4" />

      <ul className="space-y-4">
        {categorys.map((items, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md"
          >
            <span className="text-gray-700">{items.name}</span>
            <button
              onClick={() => handleRemove(items.id)}
              className="flex items-center bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
            >
              <Trash2 className="mr-2" />
              ลบ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
