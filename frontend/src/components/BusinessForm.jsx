import React, { useState } from 'react';

const BusinessForm = ({ formSubmit, businessTypes }) => { //formSubmit and businessTypes are props that are 
                                                      // passed into this component by parent compoenent
                                                    // BusinessList, more details in that component.
  const [name, setName] = useState(''); // Default name in form will be ""
  const [businessType, setBusinessType] = useState('RETAIL'); // Default type in form will be RETAIL.

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submission started')
    console.log(businessType)
    formSubmit(name, businessType); // Defined in parent component BusinessList.
  };

  return (
    <form onSubmit={handleSubmit} className="m-3 max-w-64 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
      {/* In the form element, onSubmit={handleSubmit} is an event handler that specifies what should 
      happen when the form is submitted. It is entirely different than above onSubmit prop function. */}
      <div className="mb-2">
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
          Business Name:
        </label>
        <input
          type="text"
          id="businessName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter business name"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
          Business Type:
        </label>
        <select
          id="businessType"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {businessTypes?.filter(type => type !== 'choice').map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-full flex justify-center py-1 px-0 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Business
        </button>
      </div>
    </form>
  );
};

export default BusinessForm;