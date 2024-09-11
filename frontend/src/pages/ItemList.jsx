import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ITEMS } from '../gqloperations/queries.jsx';
import { DEL_ITEM_MUTATION, UPDATE_ITEM_PRICE_MUTATION, UPDATE_ITEM_STOCK_MUTATION } from '../gqloperations/mutations.jsx';
import client from '../apolloClient.js';
import { EditIcon } from '@chakra-ui/icons';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState(null);

  const { data, refetch } = useQuery(GET_ITEMS, {
    client,
    variables: { query },
    onCompleted: (data) => {
      setItems(data.items);
      setLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
    },
  });

  const [deleteItem] = useMutation(DEL_ITEM_MUTATION, {
    client,
    onCompleted: (data) => {
      console.log('Item deleted:', data);
      if (data.delItem.done) {
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
      }
      else {
        console.error('Error deleting item:', data.delItem.error);
      }

    },
    onError: (error) => {
      console.error('Error deleting item:', error);
    },
  });

  const [updateItemPrice] = useMutation(UPDATE_ITEM_PRICE_MUTATION, {
    client,
    onCompleted: (data) => {
      console.log('Item price updated:', data);
      const updatedItems = items.map((item) => {
        if (item.id === data.updateItemPrice.item.id) {
          return { ...item, price: data.updateItemPrice.item.price };
        }
        return item;
      });
      setItems(updatedItems);
      setEditMode(null);
    },
    onError: (error) => {
      console.error('Error updating item price:', error);
    },
  });

  const [updateItemStock] = useMutation(UPDATE_ITEM_STOCK_MUTATION, {
    client,
    onCompleted: (data) => {
      console.log('Item stock updated:', data);
      const updatedItems = items.map((item) => {
        if (item.id === data.updateItemStock.item.id) {
          return { ...item, stock: data.updateItemStock.item.stock };
        }
        return item;
      });
      setItems(updatedItems);
      setEditMode(null);
    },
    onError: (error) => {
      console.error('Error updating item stock:', error);
    },
  });

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleDelete = (id) => {
    setItemId(id);
    deleteItem({ variables: { id } });
  };

  const handleEditPrice = (id, price) => {
    setItemId(id);
    setEditMode('price');
    setEditValue(price);
  };

  const handleEditStock = (id, stock) => {
    setItemId(id);
    setEditMode('stock');
    setEditValue(stock);
  };

  const handleUpdate = () => {
    if (editMode === 'price') {
      updateItemPrice({ variables: { id: itemId, price: parseInt(editValue) } });
    } else if (editMode === 'stock') {
      updateItemStock({ variables: { id: itemId, stock: parseInt(editValue) } });
    }
  };

  return (
    <div>
      <div className="mb-4 mt-4 flex justify-center">
        <input
          type="text"
          placeholder="Search products"
          value={query}
          onChange={handleSearch}
          className="w-1/2 p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
        />
      </div>
      <div>
        {items && items.length > 0 && (
          <ul>
            {items.map((item) => (
              <li
                className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md"
                key={item.id}>
                <div className="w-1/6">
                  <img
                    className="w-24 h-24 object-cover"
                    src={`http://localhost:8000/media/${item.image}`}
                    alt={item.name}
                  />
                </div>
                <div className="w-5/6 ml-2">
                  <h2 className="text-xl">{item.name}</h2>
                  <div className='flex space-x-4'>
                    <div className="flex items-center">
                      <p className="text-lg italic bold text-green-500">
                        Price: {item.price}
                      </p>
                      <p onClick={() => handleEditPrice(item.id, item.price)}>&#x270E;</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-lg italic bold text-blue-500">
                        Stock: {item.stock}
                      </p>
                      <p onClick={() => handleEditStock(item.id, item.stock)}>&#x270E;</p>
                    </div>

                  </div>

                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
      {editMode && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-md relative">
            <svg
              className="absolute top-2 right-2 w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setEditMode(null)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div className="mt-4 space-y-2">
              <input
                type="text"
                value={editValue}
                onChange={(event) => setEditValue(event.target.value)}
                className="w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;