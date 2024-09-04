import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import EasyBooksLogo from "./Logo";

const LandingNav = ({ authToken, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnLoginPage = location.pathname === "/login";

  const handleLogout = () => {
    onLogout();
    // navigate(`/`);
    window.location.href="/";
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-100 via-grey-50 to-orange-100 shadow-md py-4 px-6">
        <div className="flex items-center justify-between space-x-2">
          <EasyBooksLogo />
          <div className="flex items-center justify-end space-x-4">
            {authToken !== null && authToken !== "" && ( // To handle logout process
              // If there is an authToken then there will be a logout button and related function.
              <button
                className="font-semibold text-lg hover:text-gray-300 transition duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
            <div className="hidden md:flex space-x-4"> {/* For About, Contact us etc section. */}
              <Link
                to="/about"
                className="font-semibold text-lg hover:text-gray-300 transition duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="font-semibold text-lg hover:text-gray-300 transition duration-200"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default LandingNav;
