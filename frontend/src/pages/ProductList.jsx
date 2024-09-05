import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_ITEM_MUTATION } from '../gqloperations/mutations.jsx';
import client from '../apolloClient.js';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const [addProduct, { loading, error }] = useMutation(NEW_ITEM_MUTATION, {
    client,
    variables: {
      name,
      price,
      image,
    },
    onCompleted: (data) => {
      console.log('Product added:', data);
      // Reset form inputs
      setName('');
      setPrice('');
      setImage(null);
    },
    onError: (error) => {
      console.error('Error adding product:', error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct();
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-1/2 p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-1/2 p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-1/2 p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            Add Product
          </button>
        </form>
        <div className="mb-4">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/2 p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
        />
        
        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
          Search
        </button>
      </div>
      </div>

      {/* Render list of products */}
    </div>
  );
};

export default ProductList;