import React, { useState, useEffect } from "react";
import { ListUserCart, saveAddress } from "../../api/User";
import useEcomStore from "../../store/ecom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";


const SummaryCard = () => {
  const token = useEcomStore((s) => s.token);
  const [products, setproducts] = useState([]);
  const [cartTolal, setcartTolal] = useState(0);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    hdlGetUserCart(token);
  }, []);

  const hdlGetUserCart = (token) => {
    ListUserCart(token)
      .then((res) => {
        // console.log(res);
        setproducts(res.data.products);
        setcartTolal(res.data.cartTolal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlSaveAddress = () => {
    if (!address) {
      return toast.warning("กรุณาใหส่ที่อยู่ก่อน");
    }
    saveAddress(token, address)
      .then((res) => {
        // console.log(res);
        toast.success(res.data.message);
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlgotopayment = () =>{
    if(!addressSaved){
      return toast.warning("กรุณาใหส่ที่อยู่ก่อน");
    }
    navigate('/user/payment')
  }

  return (
    <div className="mx-auto w-full px-6">
      <div className="flex flex-wrap gap-6">
        {/* Left */}
        <div className="flex-1">
          <div className="bg-gray-100 p-6 rounded-lg border shadow-lg space-y-4">
            <h1 className="font-bold text-xl text-gray-800">
              ที่อยู่ในการจัดส่ง
            </h1>
            <textarea
              required
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-300"
              rows="4"
              placeholder="กรุณากรอกที่อยู่ในการจัดส่ง..."
            />
            <button
              onClick={hdlSaveAddress}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 hover:scale-105 transform transition-all duration-300 ease-in-out"
            >
              Save Address
            </button>
          </div>
        </div>
        {/* Right */}
        <div className="flex-1">
          <div className="p-6 bg-gray-100 rounded-lg border shadow-lg">
            <h1 className="text-xl font-bold text-gray-800">
              คำสั่งซื้อของคุณ
            </h1>

            {/* item List */}
            {products?.map((item, index) => (
              <div key={index} className="mt-4">
                <div className="flex justify-between items-end bg-white p-4 rounded-lg shadow-md border">
                  <div>
                    <p className="font-medium text-gray-700">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      จำนวน : {item.count} x {numberFormat(item.product.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-rose-500 font-bold text-lg">
                      ฿{numberFormat(item.count * item.product.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6">
              <div className="flex justify-between py-2">
                <p className="text-gray-700">ค่าจัดส่ง:</p>
                <p className="font-medium text-gray-500">฿0.00</p>
              </div>
              <div className="flex justify-between py-2">
                <p className="text-gray-700">ส่วนลด:</p>
                <p className="font-medium text-gray-500">฿0.00</p>
              </div>
            </div>

            <div className="mt-4">
              <hr className="my-2" />
              <div className="flex justify-between py-2">
                <p className="font-bold text-gray-800">รวมสุทธิ:</p>
                <p className="text-red-500 font-bold text-xl">
                  ฿{numberFormat(getTotalPrice())}
                </p>
              </div>
              <hr />
              <div className="py-4">
                <button
                  onClick={hdlgotopayment}
                  // disabled={!addressSaved}
                  className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 hover:scale-105 transform transition-all duration-300 ease-in-out "
                >
                  ดำเนินการชำระเงิน
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
