import React, { useEffect, useRef } from 'react';
import { AUTH_TOKEN } from '../constants';
import BusinessList from '../components/BusinessList';
import { Link} from 'react-router-dom';
import EasyBooksLogo from '../components/Logo';


const HomePage = () => {
    const authToken = localStorage.getItem(AUTH_TOKEN);
  
    return (
      <div className="bg-blue-50 py-20 flex flex-col justify-center sm:py-12">
        <div className={`relative py-3 sm:max-w-xl sm:mx-auto ${authToken ? 'min-w-full' : ''}`}>
          {!authToken && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          )}
          <div className="relative mx-10 px-20 py-10 bg-slate-200 shadow-lg sm:rounded-3xl sm:p-20">
            {authToken ? (
              <>
                <h1 className="text-4xl font-extrabold text-center mb-8">Welcome to Your Business Dashboard</h1>
                <BusinessList />
              </>
            ) : (
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-700 mb-4">Welcome to Easy Accounting!</h1>
                <p className="text-gray-500 mb-8">Please log in to view your business list.</p>
                <Link to="/login" className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    );
  };

export default HomePage;