import { ListCheck } from "lucide-react";
import React from "react";
import useEcomStore from "../../store/ecom";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/User";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";

const ListCar = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((s) => s.user);
  const token = useEcomStore((s) => s.token);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const navigate = useNavigate();

  const handleSaveCart = async () => {
    if (cart.length < 1) {
      toast.warning("ไม่มีสินค้าในตะกร้า");
      return;
    }
    await createUserCart(token, { cart })
      .then((res) => {
        toast.success("บันทึกใส่ตะกร้าเรียบร้อย");
        navigate("/checkout");
      })
      .catch((err) => {
        console.error(err);
        toast.warning(err.response?.data?.message || "เกิดข้อผิดพลาด");
      });
  };

  return (
    <div className="bg-gray-100 rounded-md p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <ListCheck size={36} />
        <p className="text-2xl font-bold">รายการสินค้า {cart.length} รายการ</p>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Section */}
        <div className="col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
            >
              <div className="flex justify-between items-center">
                {/* Product Image and Info */}
                <div className="flex gap-4 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      className="w-20 h-20 bg-gray-200 rounded-md"
                      src={item.images[0].url}
                      alt={item.title}
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-md flex justify-center items-center text-sm text-gray-500">
                      No Image
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-bold text-gray-800">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {numberFormat(item.price)} x {item.count}
                    </p>
                  </div>
                </div>
                {/* Product Price */}
                <div className="text-lg font-bold text-gray-800">
                  {numberFormat(item.price * item.count)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="bg-white p-4 rounded-md shadow-md space-y-6">
          <p className="text-2xl font-bold">ยอดรวม</p>
          <div className="flex justify-between">
            <span>รวมสุทธิ</span>
            <span className="text-2xl font-semibold">
              ฿{numberFormat(getTotalPrice())}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {user ? (
              <Link 
              to={'/checkout'}>
              <button
                disabled={cart.length < 1}
                onClick={handleSaveCart}
                className={`${
                  cart.length < 1
                  ? "bg-gray-400"
                  : "bg-red-500 hover:bg-red-700"
                } w-full rounded-md text-white py-2 shadow-md`}
                >
                สั่งซื้อ
              </button>
                </Link>
            ) : (
              <Link to="/login">
                <button className="bg-blue-500 w-full rounded-md text-white py-2 shadow-md hover:bg-blue-700">
                  Login
                </button>
              </Link>
            )}

            {cart.length ? (
              <Link to="/shop">
                <button className="bg-gray-500 w-full rounded-md text-white py-2 shadow-md hover:bg-gray-700">
                  แก้ไขรายการ
                </button>
              </Link>
            ) : (
              <Link to="/shop">
                <button className="bg-green-500 w-full rounded-md text-white py-2 shadow-md hover:bg-gray-700">
                  ไปเพิ่มสินค้า
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCar;
