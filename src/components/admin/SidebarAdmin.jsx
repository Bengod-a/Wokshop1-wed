import React from 'react'
import { NavLink } from 'react-router-dom'
import { ChartBarStacked, LayoutDashboard, ListOrderedIcon, LogOut, ShoppingBasket, UserRoundCog } from 'lucide-react'
import useEcomStore from '../../store/ecom';
import { toast } from 'react-toastify';

const SidebarAdmin = () => {
  const logout = useEcomStore((s) => s.logout);

  const handleLogout = () => {
    logout(); 
    toast.success("Logout สำเร็จ!") 
  };
  return (
    <div className="bg-gray-800 w-64 text-gray-100 flex flex-col h-screen">
        <div className="h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold">
            Admin Panel
        </div>

    <nav className="flex-1 px-2 py-4 space-y-2">
        {/* 1 */}
        <NavLink 
            to={'/admin'}
            end
        className={({ isActive })=>
        isActive ? "bg-gray-900 text-white px-4 py-2 flex items-center rounded-md" 
                 : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
            }>
        <LayoutDashboard  className="mr-2"/>
            Dashboard
        </NavLink>
            {/* 2 */}
        <NavLink 
            to={'manage'}
        className={({ isActive} )=>
        isActive ? "bg-gray-900 text-white px-4 py-2 flex items-center rounded-md" 
                 : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
            }>
          <UserRoundCog   className="mr-2"/>
            Manage
        </NavLink>

            {/* 3 */}
        <NavLink 
            to={'category'}
        className={({ isActive} )=>
        isActive ? "bg-gray-900 text-white px-4 py-2 flex items-center rounded-md" 
                 : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
            }>
        <ChartBarStacked  className="mr-2"/>
            Category
        </NavLink>

        {/* 4 */}
        <NavLink 
            to={'product'}
        className={({ isActive} )=>
        isActive ? "bg-gray-900 text-white px-4 py-2 flex items-center rounded-md" 
                 : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
            }>
        <ShoppingBasket  className="mr-2"/>
            Product
        </NavLink>


        <NavLink 
            to={'orders'}
        className={({ isActive} )=>
        isActive ? "bg-gray-900 text-white px-4 py-2 flex items-center rounded-md" 
                 : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
            }>
          <ListOrderedIcon  className="mr-2"/>
            Orders
        </NavLink>


    </nav>

    <footer>
    <NavLink
        onClick={handleLogout}
        to={'/'} 
        className={({ isActive} )=>
        isActive ? "bg-gray-900 text-white px-4 py-2 flex items-center rounded-md" 
                 : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
            }>
        <LogOut   className="mr-2"/>
            Logout
        </NavLink>
    </footer>

    </div>
  )
}

export default SidebarAdmin