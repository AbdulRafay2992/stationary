import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import NewOrder from './NewOrder';

const Salesman = ({ onLogout }) => {
  const [activeMenu, setActiveMenu] = useState('new-order');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <Router>
      <div className="flex justify-between items-center h-16 bg-gray-800 text-white px-4">
        <h1>Sales</h1>
        <div className="p-4">
          <NavLink
            to="/new-order"
            className={`cursor-pointer mb-2 p-2 ${activeMenu === 'new-order' ? 'bg-gray-400' : ''}`}
            onClick={() => handleMenuClick('new-order')}
          >
            New Order
          </NavLink>
          {/* <NavLink
            to="/new-item"
            className={`cursor-pointer mb-2 p-2 ${activeMenu === 'new-item' ? 'bg-gray-400' : ''}`}
            onClick={() => handleMenuClick('new-item')}
          >
            New Item
          </NavLink>
          <NavLink
            to="/salesman"
            className={`cursor-pointer mb-2 p-2 ${activeMenu === 'salesman' ? 'bg-gray-400' : ''}`}
            onClick={() => handleMenuClick('salesman')}
          >
            Salesman
          </NavLink>
          <NavLink
            to="/new-salesman"
            className={`cursor-pointer mb-2 p-2 ${activeMenu === 'new-salesman' ? 'bg-gray-400' : ''}`}
            onClick={() => handleMenuClick('new-salesman')}
          >
            New Salesman
          </NavLink> */}
        </div>
        <button
          onClick={onLogout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center">
        <div className="w-full p-4">
          <Routes>
            <Route path="/" element={<NewOrder />} />
            <Route path="/new-order" element={<NewOrder />} />
            {/* <Route path="/new-item" element={<AddItem />} />
            <Route path="/salesman" element={<SalesmanList />} /> */}
            {/* <Route path="/new-salesman" element={<AddSalesman />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
    
  );
};

export default Salesman;
