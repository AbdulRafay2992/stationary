import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ITEMS } from '../gqloperations/queries.jsx';
import { NEW_ITEM_MUTATION, DEL_ITEM_MUTATION } from '../gqloperations/mutations.jsx';
import client from '../apolloClient.js';
import { useEffect } from 'react';

const ItemList = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);

  const { loading, error, data, refetch } = useQuery(GET_ITEMS, {
    client,
    variables: { query: query },
  });

  const [deleteItemMutation] = useMutation(DEL_ITEM_MUTATION, {client});

  useEffect(() => {
    if (data && data.items && !loading && !error) {
      if (data.items != null) {
        setItems(data.items);
        // console.log(data.items);
      }
    }
  }, [data]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const deleteItem = (itemId) => {
    deleteItemMutation({
      variables: { id: parseInt(itemId) },
      onCompleted: (data) => {
        console.log('Item deleted:', data);
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
      },
      onError: (error) => {
        console.error('Error deleting item:', error);
      },
    });
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
                <div className='w-1/6'>
                  <img
                    className="w-24 h-24 object-cover"
                    src={`http://localhost:8000/media/${item.image}`}
                    alt={item.name} />
                </div>
                <div className='w-5/6 ml-4'>
                  <h2 className='text-xl'>{item.name}</h2>
                  <p className='text-lg italic bold text-green-500'>Price: {item.price}</p>
                </div>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => deleteItem(item.id)}>Delete
                </button>
              </li>
            ))
            }
          </ul>)
        }
        { loading && <p>Loading...</p>}
        { error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default ItemList;