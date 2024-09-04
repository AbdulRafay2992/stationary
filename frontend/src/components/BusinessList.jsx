import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_BUSINESS, UPDATE_BUSINESS, DELETE_BUSINESS } from '../gqloperations/mutations';
import BusinessItem from './BusinessItem';
import BusinessForm from './BusinessForm';
import { GET_BUSINESSES, GET_BUSINESS_TYPES } from '../gqloperations/queries';

const BusinessList = () => {
  // Get the user ID from the token stored in local storage
  // const userId = getUserIdFromToken(localStorage.getItem(AUTH_TOKEN));

  // Queries and mutations
  const { loading: typesLoading, error: typesError, data: typesData } = useQuery(GET_BUSINESS_TYPES);
  const [createBusiness] = useMutation(CREATE_BUSINESS);
  const [updateBusiness] = useMutation(UPDATE_BUSINESS);
  const [deleteBusiness] = useMutation(DELETE_BUSINESS);

  const { loading: businessesLoading, error: businessesError, data: businessesData, refetch: refetchBusinesses } = useQuery(GET_BUSINESSES);

  // Handlers
  const handleCreate = async (name, businessType) => {
    // In JavaScript, certain operations (like making network requests, reading files, or interacting 
    // with databases) are asynchronous. This means they take time to complete, but instead of blocking 
    // the execution of the entire program while waiting, JavaScript allows other code to run in 
    // the meantime. This is important for keeping applications responsive, especially in environments 
    // like web browsers.
    // When you declare a function with the async keyword, you are telling JavaScript that this function 
    // will contain asynchronous operations. This has a few important effects:
      // 1. Promise Return: An async function automatically returns a Promise. Even if you don't explicitly 
        // return a promise, JavaScript wraps the return value in a promise.
      // 2. Await: You can use the await keyword in an async function to wait for a Promise to resolve 
        // instead of allowing the function to continue executing.
    createBusiness({
      variables: { name, businessType}
    }).then(response => {
      refetchBusinesses()
    }).catch(error => {
      console.log("Error: " + error.message);
    });
  };

  const handleUpdate = async (id, name, businessType) => {
    updateBusiness({
      variables: { id, name, businessType }
    }).then(response => {
      if (response.data.updateBusiness.success) {
        refetchBusinesses()
      }
    }).catch(error => {
      console.log("Error: " + error.message);
    });
  };

  const handleDelete = async (id) => {
    deleteBusiness({
      variables: { id }
    }).then(response => {
      if (response.data.deleteBusiness.success) {
        refetchBusinesses()
      }
    }).catch(error => {
      console.log("Error: " + error.message);
    });
  };

  if (businessesLoading || typesLoading) return <p>Loading...</p>;
  if (businessesError || typesError) return <p>Error :</p>;

  return (
    <>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Business Type
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {businessesData && businessesData.businesses && businessesData.businesses.length > 0 ? (
            businessesData.businesses.map((business) => (
              <BusinessItem
                key={business.id}
                business={business}
                businessTypes={typesData?.businessTypes}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">No businesses available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <BusinessForm formSubmit={handleCreate} businessTypes={typesData?.businessTypes} />
      {/* Here we take name and type from BusinessForm and pass it to formSubmit handler which 
      passes it to handleCreate */}
    </>
  );
};

export default BusinessList;