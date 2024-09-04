import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import EasyBooksLogo from "./Logo";
import { useParams } from 'react-router-dom'

const BusinessNav = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnLoginPage = location.pathname === "/login";
  const {id} = useParams()

  const handleLogout = () => {
    onLogout();
    // navigate(`/`);
    window.location.href="/";
  };

  return (
    <>
      <nav class="flex justify-between items-center border-gray-50 border-b-2 max-h-20">
        <div class="flex items-center">
          <div className="px-48">
            <EasyBooksLogo /> 
          </div>
          <div class="flex space-x-4 ml-4"> 
            <ul class="relative group">
              <button class="font-bold text-white bg-orange-500 hover:bg-gray-700 px-2 py-1 rounded-md group-hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                Customers
              </button>
              <ul class="absolute hidden group-hover:block w-48 shadow-md rounded-md bg-white overflow-hidden z-10">
                <li><a href="#" class="block py-2 px-4 hover:bg-gray-100">Customers Home</a></li>
                <li><a href="#" class="block py-2 px-4 hover:bg-gray-100">New Customer</a></li>
                <li><a href="#" class="block py-2 px-4 hover:bg-gray-100">New Invoice</a></li>
              </ul>
            </ul>
            <ul class="relative group">
              <button class="font-bold text-white bg-orange-500 hover:bg-gray-700 px-2 py-1 rounded-md group-hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                Suppliers
              </button>
              <ul class="absolute hidden group-hover:block w-48 shadow-md rounded-md bg-white overflow-hidden z-10">
                <li><a href="#" class="block py-2 px-4 hover:bg-gray-100">Suppliers Home</a></li>
                <li><a href="#" class="block py-2 px-4 hover:bg-gray-100">New Vendor</a></li>
                <li><a href="#" class="block py-2 px-4 hover:bg-gray-100">New Bill</a></li>
              </ul>
            </ul>
          </div>
        </div>
        <div class="flex space-x-4 px-20">
          <ul class="relative group">
            <button class="font-bold text-white bg-blue-500 hover:bg-gray-700 px-2 py-1 rounded-md group-hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              Settings
            </button>
            <ul class="absolute hidden group-hover:block w-48 shadow-md rounded-md bg-white overflow-hidden z-10">
              <li>
                <Link to={`/business/${id}/chartofaccounts`}  className="block py-2 px-4 hover:bg-gray-100">
                  Chart of Accounts
                </Link>
              </li>
              <li>
                <Link to={`/admins/${id}`}  className="block py-2 px-4 hover:bg-gray-100">
                  Admins
                </Link>
              </li>
            </ul>
          </ul>
          <ul class="relative group">
            <button className="font-bold text-blue-500 hover:bg-gray-700 px-2 py-1 rounded-md hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              About Us
            </button>
            <button
                className="font-bold text-blue-500 hover:bg-gray-700 px-2 py-1 rounded-md hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                onClick={handleLogout}
              >
                Logout
              </button>
          </ul>
        </div>
      </nav>

      
      <Outlet />
    </>
  );
};

export default BusinessNav;
