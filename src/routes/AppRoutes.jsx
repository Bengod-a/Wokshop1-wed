import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import History from "../pages/user/History";
import Checkout from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register"
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Dashboard from "../pages/Admin/Dashboard"
import Product from "../pages/Admin/Product";
import Category from "../pages/Admin/Category";
import Manage from "../pages/Admin/Manage";
import LayoutUser from "../layouts/LayoutUser";
import HomeUser from "../pages/user/HomeUser";
import ProtectRouteUser from "./ProtectRouteUser";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import EditProduct from "../pages/Admin/EditProduct";
import Payment from "../pages/user/Payment";
import MangeOrder from "../pages/Admin/MangeOrder";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },
  {
    path:'/admin',
    element: <ProtectRouteAdmin  element={<LayoutAdmin />} /> ,
    children:[
      { index: true, element: <Dashboard /> },
      { path:'category', element:<Category /> },
      { path:'product', element:<Product /> },
      { path:'product/:id', element:<EditProduct /> },
      { path:'manage', element:<Manage /> },
      { path:'orders', element:<MangeOrder /> },
    ]
  },
  {
    path:'/user',
    // element: <LayoutUser />,
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children:[
      { index: true, element: <HomeUser /> },
      { path: 'payment', element: <Payment /> },
      { path: "history", element: <History /> },
    ]
  }


]);

export const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
