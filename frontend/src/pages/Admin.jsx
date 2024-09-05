import React, { useState } from 'react';
import SalesmanList from '../pages/SalesmanList';
import ProductList from '../pages/ProductList';

const Admin = ({ onLogout }) => {
  const [activeMenu, setActiveMenu] = useState('add-salesman');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div>
      <div className="flex justify-between items-center h-16 bg-gray-800 text-white px-4">
        <h1>Admin</h1>
        <button
          onClick={onLogout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          Logout
        </button>
      </div>

      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-200">
          <div className="p-4">
            <ul>
              <li
                className={`cursor-pointer mb-2 ${
                  activeMenu === 'add-salesman' ? 'bg-gray-400' : ''
                }`}
                onClick={() => handleMenuClick('add-salesman')}
              >
                Salesman
              </li>
              <li
                className={`cursor-pointer mb-2 ${
                  activeMenu === 'list-products' ? 'bg-gray-400' : ''
                }`}
                onClick={() => handleMenuClick('list-products')}
              >
                Products
              </li>
            </ul>
          </div>
        </div>

        <div className="w-3/4 p-4">
          {activeMenu === 'add-salesman' && <SalesmanList />}
          {activeMenu === 'list-products' && <ProductList />}
        </div>
      </div>
    </div>
  );
};

export default Admin;