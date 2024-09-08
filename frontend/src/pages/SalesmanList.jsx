import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SALESMEN } from '../gqloperations/queries.jsx';
import { DEL_SALESMAN_MUTATION, NEW_SALESMAN_MUTATION } from '../gqloperations/mutations.jsx';
import client from "../apolloClient.js";
import { useEffect } from 'react';

const AddSalesman = () => {

  const [salesmen, setSalesmen] = useState([]);

  const { data, loading, error } = useQuery(GET_SALESMEN, {
    client,
  });

  const [deleteSalesmanMutation] = useMutation(DEL_SALESMAN_MUTATION, { client });

  useEffect(() => {
    if (data && data.salesmen && !loading && !error) {
      if (data.salesmen != null) {
        setSalesmen(data.salesmen);
      }
    }
  }, [data]);

  const deleteSalesman = (Id) => {
    deleteSalesmanMutation({
      variables: { id: parseInt(Id) },
      onCompleted: (data) => {
        console.log('Item deleted:', data);
        const updatedSalesmen = salesmen.filter((salesman) => salesman.user.id !== Id);
        setSalesmen(updatedSalesmen);
      },
      onError: (error) => {
        console.error('Error deleting item:', error);
      },
    });
  };

  return (
    <div>
      {/* Render list of added Salesman */}
      <div className="mt-4 flex justify-center">
        <table className='w-full'>
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {salesmen && salesmen.length > 0 && (
              salesmen.map((salesman) => (
                <tr key={salesman.user.id} className="text-center py-2 border-b border-gray-200 hover:bg-gray-100">
                  <td>
                    <p className="text-lg font-bold">{salesman.user.username}</p>
                  </td>
                  <td>
                    <p className="text-lg font-bold">{salesman.password}</p>
                  </td>
                  <td>
                    <button
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                      onClick={() => deleteSalesman(salesman.user.id)}>Delete
                    </button>
                  </td>
                </tr>
              )))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddSalesman;