import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((s) => s.logout);
  const [isOpen, setisOpen] = useState(false);

  const toggleDropdown = () => {
    setisOpen(!isOpen);
  };

  const handleLogout = () => {
    logout(); 
    toast.success("Logout สำเร็จ!") 
  };


  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-2xl font-bold ">
              BenGod
            </Link>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-full text-sm font-medium"
                  : " px-3 py-2 rounded-full text-sm font-medium hover:bg-gray-200"
              }
              to={"/"}
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-full text-sm font-medium"
                  : " px-3 py-2 rounded-full text-sm font-medium hover:bg-gray-200"
              }
              to={"/shop"}
            >
              Shop
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-full text-sm font-medium"
                  : " px-3 py-2 rounded-full text-sm font-medium hover:bg-gray-200"
              }
              to={"/cart"}
            >
              Cart
              {carts.length > 0 && (
                <span className="absolute top-0 bg-red-500 rounded-full text-white px-2">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-gray-200"
              >
                <img
                  className="w-10 h-10"
                  src="https://d3sxshmncs10te.cloudfront.net/icon/free/svg/456317.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkM3N4c2htbmNzMTB0ZS5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTczNDUwMDU5NSwicSI6bnVsbCwiaWF0IjoxNzM0MjQxMzk1fQ__.3c74d075d0624bd15284cd776f99f432b4bee425c5993d41475d30f8c774f1d2"
                />
                <ChevronDown />
              </button>

              {isOpen && (
                <div className="absolute  top-16 bg-white shadow-md flex flex-col z-50">
                  <Link
                    to={"/user/history"}
                    className="blok px-4 py-2 hover:bg-gray-200"
                  >
                    History
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="blok px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded-full text-sm font-medium"
                    : " px-3 py-2 rounded-full text-sm font-medium hover:bg-gray-200"
                }
                to={"/register"}
              >
                Register
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded-full text-sm font-medium"
                    : " px-3 py-2 rounded-full text-sm font-medium hover:bg-gray-200"
                }
                to={"/login"}
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;




