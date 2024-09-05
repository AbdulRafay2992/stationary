import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_SALESMAN_MUTATION } from '../gqloperations/mutations.jsx';
import client from "../apolloClient.js";

const AddSalesman = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [addSalesman, { loading, error }] = useMutation(NEW_SALESMAN_MUTATION, {
    client,
    variables: {
      username,
      password,
    },
    onCompleted: (data) => {
      console.log('Salesman added:', data);
      // Reset form inputs
      setUsername('');
      setPassword('');
    },
    onError: (error) => {
      console.error('Error adding salesman:', error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addSalesman();
  };

  return (
    <div>
      <h2>Add Salesman</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-1/2 p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-1/2 p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          Add Salesman
        </button>
      </form>

      {/* Render list of added Salesman */}
      <div className="mt-4">
        <h3>Added Salesman</h3>
        <ul>
          {/* Map through the list of added Salesman and render each one */}
          {/* Example: <li>Salesman 1</li> */}
        </ul>
      </div>
    </div>
  );
};

export default AddSalesman;